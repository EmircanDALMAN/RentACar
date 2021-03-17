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
using System.Linq.Expressions;
using Business.BusinessAspects.Autofac;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Performance;

namespace Business.Concrete
{
    public class CarManager : ICarService
    {
        private readonly ICarDal _carDal;

        public CarManager(ICarDal carDal)
        {
            _carDal = carDal;
        }

        [ValidationAspect(typeof(CarValidator))]
        [CacheRemoveAspect("ICarService.Get")]
        [SecuredOperation("Car.Add")]
        public IResult Add(Car car)
        {
            _carDal.Add(car);
            return new SuccessResult(Messages.CarAdded);

        }
        [SecuredOperation("Car.Delete")]
        public IResult Delete(Car car)
        {
            _carDal.Delete(car);
            return new SuccessResult(Messages.CarDeleted);
        }

        [CacheAspect]
        public IDataResult<List<Car>> GetAll()
        {
            return new SuccessDataResult<List<Car>>(_carDal.GetAll(), Messages.CarListed);
        }

        [CacheAspect]
        [PerformanceAspect(5)]
        public IDataResult<Car> GetById(int carId)
        {
            
            return new SuccessDataResult<Car>(_carDal.Get(c => c.Id == carId));
        }

        [CacheAspect]
        public IDataResult<List<CarDetailDto>> GetCarDetails(Expression<Func<Car,bool>> filter = null)
        {
            return new SuccessDataResult<List<CarDetailDto>>( _carDal.GetCarDetails());
        }

        public IDataResult<List<CarDetailDto>> GetCarDetailsById(int carId)
        {
            return new SuccessDataResult<List<CarDetailDto>>(_carDal.GetCarDetailById(carId));
        }

        [CacheAspect]
        public IDataResult<List<CarDetailDto>> GetCarBrandandColor(int brandId, int colorId)
        {
            return new SuccessDataResult<List<CarDetailDto>>(_carDal.GetCarDetails(p=>p.BrandId==brandId && p.ColorId==colorId));
        }

        [CacheAspect]
        public IDataResult<List<CarDetailDto>> GetCarsDetailByBrandId(int brandId)
        {
            
            return new SuccessDataResult<List<CarDetailDto>>(_carDal.GetCarDetails(p=>p.BrandId==brandId));
        }

        [CacheAspect]
        public IDataResult<List<CarDetailDto>> GetCarsDetailByColorId(int colorId)
        {
          
            return new SuccessDataResult<List<CarDetailDto>>(_carDal.GetCarDetails(p => p.ColorId == colorId));
        }

        [SecuredOperation("Car.Update")]
        public IResult Update(Car car)
        {
            if (car.DailyPrice > 0)
            {
                _carDal.Update(car);
                return new SuccessResult(Messages.CarUpdated);
            }
            _carDal.Update(car);
            return new SuccessResult(Messages.CarPriceInvalid);
        }
    }
}