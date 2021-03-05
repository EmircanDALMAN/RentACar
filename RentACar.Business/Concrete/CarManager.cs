using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Hosting;
using RentACar.Business.Abstract;
using RentACar.Business.BusinessAspects;
using RentACar.Business.Constants;
using RentACar.Business.Validation.FluentValidation;
using RentACar.Core.Aspects.Autofac;
using RentACar.Core.Aspects.Autofac.Logging;
using RentACar.Core.Aspects.Autofac.Validation;
using RentACar.Core.CrossCuttingConcerns.Logging.Log4Net.Loggers;
using RentACar.Core.CrossCuttingConcerns.Validation;
using RentACar.Core.Utilities.Result;
using RentACar.DataAccess.Abstract;
using RentACar.Entities.Concrete;
using RentACar.Entities.Dtos;

namespace RentACar.Business.Concrete
{
    public class CarManager:ICarService
    {
        private static ICarDal _cardal;
        private static ICarImagesDal _carImagesDal;
        private IFileProcess _fileProcess;

        public CarManager(ICarDal _cardal, ICarImagesDal _carImagesDal, IFileProcess fileProcess)
        {
            CarManager._cardal = _cardal;
            CarManager._carImagesDal = _carImagesDal;
            _fileProcess = fileProcess;
        }

        [ValidationAspect(typeof(CarValidator))]
        public IResult Add(Car car)
        {
            ValidationTool.Validate(new CarValidator(), car);
            _cardal.Add(car);
            if(!CheckCarImageExist(car.Id))
                _carImagesDal.Add(new CarImage
                {
                    CarId = car.Id,
                    CreatedDate = DateTime.UtcNow,
                    ImagePath = "thumbnail.png"
                });
            return new SuccessResult(Messages.Add_Message(nameof(Car)));
        }

        public IResult AddRange(List<Car> cars)
        {
            _cardal.AddRange(cars);
            return new SuccessResult(Messages.Multiple_Add_Message(nameof(Car)));
        }

        public IResult Update(Car car)
        {
            _cardal.Update(car);
            return new SuccessResult(Messages.Update_Message(nameof(Car)));
        }
        /// <summary>
        /// All Car data will be removed when the car delete
        /// </summary>
        /// <param name="id">Car Id</param>
        /// <returns></returns>
        public IResult Delete(int id)
        {
            var deletedCar = GetById(id).Data;
            _cardal.Delete(deletedCar);
            var deletedCarImages = _carImagesDal.GetAll(pre => pre.CarId == deletedCar.Id);
            foreach (var deletedCarImage in deletedCarImages)
            {
                _carImagesDal.Delete(deletedCarImage);
                if (!deletedCarImage.ImagePath.Equals("thumbnail.png"))
                {
                    _fileProcess.Delete(deletedCarImage.ImagePath);
                }
            }
            return new SuccessResult(Messages.Delete_Message(nameof(Car)));
        }

        public IDataResult<Car> GetById(int id)
        {
            var result = _cardal.Get(id);
            return new SuccessDataResult<Car>(result);
        }
        [LogAspect(typeof(DatabaseLogger))]
        public IDataResult<List<Car>> GetAll()
        {
            var result = _cardal.GetAll();
            return new SuccessDataResult<List<Car>>(result);
        }

        public IDataResult<List<Car>> GetByModelYear(int modelYear)
        {
            var result = _cardal.GetAll(car => car.ModelYear == DateTime.UtcNow.Year);
            return new SuccessDataResult<List<Car>>(result);
        }

        public IDataResult<List<Car>> GetByDailyPrice(int price)
        {
            var result = _cardal.GetAll(car => car.DailyPrice == price);
            return new SuccessDataResult<List<Car>>(result);
        }

        public IDataResult<List<Car>> GetByDescription(string description)
        {
            var result= _cardal.GetAll(car => car.Description.Contains(description));
            return new SuccessDataResult<List<Car>>(result);
        }
        public IDataResult<List<GetCarImagesDto>> GetAllImagesById(int id)
        {
            var result = _cardal.GetCarImageDetails(car => car.Id == id);
            return new SuccessDataResult<List<GetCarImagesDto>>(result);
        }

        #region Business Rules for Car Manager
        public static bool CheckCarImageExist(int id)
        {
            return _carImagesDal.IsExist(id);
        }

        #endregion
    }
}
