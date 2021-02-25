using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Core.Aspects.AutoFac.Validation;
using Core.Utilities.Business;
using Core.Utilities.Results.Abstract;
using Core.Utilities.Results.Concrete;
using ReCapProject.Business.Abstract;
using ReCapProject.Business.Constants;
using ReCapProject.Business.ValidationRules.FluentValidation;
using ReCapProject.DataAccess.Abstract;
using ReCapProject.Entities.Concrete;

namespace ReCapProject.Business.Concrete
{
    public class CarImageManager : ICarImageService
    {
        private ICarImageDal _carImageDal;
        private ICarService _carService;

        public CarImageManager(ICarImageDal carImageDal, ICarService carService)
        {
            _carImageDal = carImageDal;
            _carService = carService;
        }

        public IResult Add(CarImage entity)
        {
            var result = BusinessRules.Run(CheckCarImageCount(entity.CarId), CheckIfFileExtension(entity.ImagePath));
            if (result != null)
            {
                return result;
            }

            var fileExtension = Path.GetExtension(entity.ImagePath).ToLower();
            string createPath = ImagePath(entity.CarId, fileExtension);
            File.Copy(entity.ImagePath, createPath);
            entity.ImagePath = createPath;
            entity.Date = DateTime.Now;
            _carImageDal.Add(entity);

            return new SuccessResult(Messages.CarImageAdded);
        }

        public IResult Delete(CarImage entity)
        {
            var imageData = _carImageDal.Get(p => p.Id == entity.Id);
            File.Delete(imageData.ImagePath);
            _carImageDal.Delete(imageData);
            return new SuccessResult(Messages.CarImageDeleted);
        }

        public IDataResult<CarImage> GetById(int carImageId)
        {
            return new SuccessDataResult<CarImage>(_carImageDal.Get(p => p.Id == carImageId));
        }

        public IDataResult<List<CarImage>> GetAll()
        {
            return new SuccessDataResult<List<CarImage>>(_carImageDal.GetAll());
        }

        public IResult Update(CarImage entity)
        {
            var result = BusinessRules.Run(CheckCarImageCount(entity.CarId), CheckIfFileExtension(entity.ImagePath));
            if (result != null)
            {
                return result;
            }

            var fileExtension = Path.GetExtension(entity.ImagePath).ToLower();
            string createPath = ImagePath(entity.CarId, fileExtension);
            File.Copy(entity.ImagePath, createPath);
            File.Delete(entity.ImagePath);
            entity.ImagePath = createPath;
            _carImageDal.Update(entity);
            return new SuccessResult(Messages.CarImageUpdated);
        }

        public IDataResult<List<CarImage>> GetPhotosByCarId(int carId)
        {
            var result = BusinessRules.Run(CheckIfCarId(carId));
            if (result != null)
            {
                return (IDataResult<List<CarImage>>)result;
            }

            var getAllbyCarIdResult = _carImageDal.GetAll(p => p.CarId == carId);
            if (getAllbyCarIdResult.Count == 0)
            {
                return new SuccessDataResult<List<CarImage>>(new List<CarImage> { new CarImage { ImagePath = FilePath.ImageDefaultPath } });
            }

            return new SuccessDataResult<List<CarImage>>(getAllbyCarIdResult);
        }

        private string ImagePath(int carId, string fileExtension)
        {
            string GuidKey = Guid.NewGuid().ToString();
            return FilePath.ImageFolderPath + GuidKey + fileExtension;
        }
        private IResult CheckCarImageCount(int carId)
        {
            if (_carImageDal.GetAll(p => p.CarId == carId).Count > 4)
            {
                return new ErrorResult(Messages.CountOfCarImagesCorrect);
            }
            return new SuccessResult();
        }

        private IResult CheckIfCarId(int carId)
        {
            if (!_carService.GetById(carId).Success)
            {
                return new ErrorDataResult<List<CarImage>>(Messages.GetErrorCarMessage);
            }
            return new SuccessDataResult<List<CarImage>>();
        }

        private IResult CheckIfFileExtension(string path)
        {
            const string acceptableExtensions = ".png|.jpeg|.jpg";
            if (string.CompareOrdinal(Path.GetExtension(path).ToLower(), acceptableExtensions) == 0)
            {
                return new ErrorResult(Messages.WrongImageFileExtension);
            }
            return new SuccessResult();
        }
    }
}