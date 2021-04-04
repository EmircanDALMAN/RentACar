using System;
using System.Collections.Generic;
using System.Linq;
using Business.Abstract;
using Business.BusinessAspects.Autofac;
using Business.Constants;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Performance;
using Core.Aspects.Autofac.Transaction;
using Core.Aspects.Autofac.Validation;
using Core.Utilities.Business;
using Core.Utilities.FileHelper;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using Microsoft.AspNetCore.Http;

namespace Business.Concrete
{
    public class CarImageManager : ICarImageService
    {
        private readonly ICarImageDal _carImageDal;
        public CarImageManager(ICarImageDal carImageDal)
        {
            _carImageDal = carImageDal;
        }
        [CacheAspect()]
        public IDataResult<List<CarImage>> GetAll()
        {
            return new SuccessDataResult<List<CarImage>>(_carImageDal.GetAll());
        }
        [CacheAspect()]
        [PerformanceAspect(5)]
        public IDataResult<CarImage> Get(int id)
        {
            var carImage = _carImageDal.Get(ci => ci.Id == id);
            if (carImage == null) return new ErrorDataResult<CarImage>(Messages.CarImageNotFound);
            return new SuccessDataResult<CarImage>(carImage);
        }
        [CacheAspect()]
        public IDataResult<List<CarImage>> GetByCarId(int carId)
        {
            var result = _carImageDal.GetAll(ci => ci.Id == carId);
            if (result.Any()) return new SuccessDataResult<List<CarImage>>(result);
            return new SuccessDataResult<List<CarImage>>(new List<CarImage>
            {
                new CarImage{ ImagePath = "default.jpg", Date = DateTime.Now }
            });
        }
        [TransactionScopeAspect]
        [CacheRemoveAspect("ICarImageService.Get")]
        [ValidationAspect(typeof(CarImageValidator))]
        public IResult Add(IFormFile file, CarImage carImage)
        {
            var result = BusinessRules.Run(CheckCarImagesCount(carImage.CarId));
            if (result != null) return result;
            carImage.ImagePath = FileHelper.SaveImageFile("Images", file);
            carImage.Date = DateTime.Now;
            _carImageDal.Add(carImage);
            var deletedImageCar = _carImageDal.Get(
                ci => ci.CarId == carImage.CarId
                      && ci.ImagePath.Contains("/Images/default.jpg"));
            if (deletedImageCar != null)
            {
                _carImageDal.Delete(deletedImageCar);
            }
            return new SuccessResult(Messages.CarImageAdded);
        }
        [TransactionScopeAspect]
        [CacheRemoveAspect("ICarImageService.Get")]
        [ValidationAspect(typeof(CarImageValidator))]
        public IResult Update(IFormFile file, CarImage carImage)
        {
            var entity = _carImageDal.Get(ci => ci.Id == carImage.Id);
            if (entity == null) return new ErrorResult(Messages.CarImageNotFound);
            FileHelper.DeleteImageFile(entity.ImagePath);
            entity.ImagePath = FileHelper.SaveImageFile("Images", file);
            entity.Date = DateTime.Now;
            _carImageDal.Update(entity);
            return new SuccessResult(Messages.CarImageUpdated);
        }
        [TransactionScopeAspect]
        [CacheRemoveAspect("ICarImageService.Get")]
        public IResult Delete(CarImage carImage)
        {
            var entity = _carImageDal.Get(ci => ci.Id == carImage.Id);
            if (entity == null) return new ErrorResult(Messages.CarImageNotFound);
            FileHelper.DeleteImageFile(entity.ImagePath);
            _carImageDal.Delete(carImage);
            return new SuccessResult(Messages.CarImageDeleted);
        }
        private IResult CheckCarImagesCount(int carId)
        {
            var result = _carImageDal.GetAll(ci => ci.CarId == carId).Count < 5;
            if (!result) return new ErrorResult(Messages.CarImageCountExceeded);
            return new SuccessResult();
        }
    }
}