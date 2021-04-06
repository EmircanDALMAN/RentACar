using Business.Abstract;
using Business.Constants;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Validation;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq.Expressions;
using Business.BusinessAspects.Autofac;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Performance;
using Core.Aspects.Autofac.Transaction;
using Core.CrossCuttingConcerns.Validation;

namespace Business.Concrete
{
    public class CarManager : ICarService
    {
        private readonly ICarDal _carDal;
        private readonly ICarImageDal _carImageDal;
        private IRentalService _rentalService;
        public CarManager(ICarDal carDal, ICarImageDal carImageDal, IRentalService rentalService)
        {
            _carDal = carDal;
            _carImageDal = carImageDal;
            _rentalService = rentalService;
        }

        [TransactionScopeAspect]
        [ValidationAspect(typeof(CarValidator))]
        [SecuredOperation("admin")]
        [CacheRemoveAspect("ICarService.Get")]
        public IResult Add(Car car)
        {
            _carDal.Add(car);
            var cars = _carDal.GetAll();
            var carId = cars[cars.Count - 1].Id;
            var image = new CarImage
            {
                CarId = carId,
                Date = DateTime.Now,
                ImagePath = "/Images/default.jpg"
            };
            _carImageDal.Add(image);
            return new SuccessResult(Messages.CarAdded);

        }
        [SecuredOperation("Car.Delete")]
        public IResult Delete(Car car)
        {
            _carDal.Delete(car);
            return new SuccessResult(Messages.CarDeleted);
        }
        public IDataResult<List<Car>> GetAll()
        {
            return new SuccessDataResult<List<Car>>(_carDal.GetAll(), Messages.CarListed);
        }
        public IDataResult<List<CarDetailDto>> GetCarDetailsByBrandAndColor(int brandId, int colorId)
        {
            return new SuccessDataResult<List<CarDetailDto>>
                (_carDal.GetCarDetailsByBrandAndColor(brandId, colorId));
        }
        public IDataResult<List<CarDetailDto>> GetMostRentedCar()
        {
            return new SuccessDataResult<List<CarDetailDto>>(_carDal.GetMostRentedCar());
        }
        public IDataResult<CarDetailDto> GetLastAddedCar()
        {
            return new SuccessDataResult<CarDetailDto>(_carDal.GetLastAddedCar());
        }
        public IDataResult<CarDetailDto> GetBringNewestCar()
        {
            return new SuccessDataResult<CarDetailDto>(_carDal.GetBringNewestCar());
        }
        public IDataResult<List<CarDetailDto>> GetNowRentedCars()
        {
            return new SuccessDataResult<List<CarDetailDto>>(_carDal.GetNowRentedCars());
        }
        [PerformanceAspect(5)]
        public IDataResult<Car> GetById(int carId)
        {
            return new SuccessDataResult<Car>(_carDal.Get(c => c.Id == carId));
        }
        public IDataResult<List<CarDetailDto>> GetCarDetails(Expression<Func<Car, bool>> filter = null)
        {
            return new SuccessDataResult<List<CarDetailDto>>(_carDal.GetCarDetails());
        }
        public IDataResult<List<CarDetailDto>> GetCarDetailsById(int carId)
        {
            return new SuccessDataResult<List<CarDetailDto>>(_carDal.GetCarDetailById(carId));
        }
        public IDataResult<List<CarDetailDto>> GetCarsDetailByBrandId(int brandId)
        {
            return new SuccessDataResult<List<CarDetailDto>>(_carDal.GetCarDetails(p => p.BrandId == brandId));
        }
        public IDataResult<List<CarDetailDto>> GetCarsDetailByColorId(int colorId)
        {
            return new SuccessDataResult<List<CarDetailDto>>(_carDal.GetCarDetails(p => p.ColorId == colorId));
        }
        [CacheRemoveAspect("ICarService.Get")]
        public IResult Update(Car car)
        {
            _carDal.Update(car);
            return new SuccessResult(Messages.CarPriceInvalid);
        }
    }
}