using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Http;
using RentACar.Business.Abstract;
using RentACar.Business.Constants;
using RentACar.Core.Utilities.Business;
using RentACar.Core.Utilities.Result;
using RentACar.DataAccess.Abstract;
using RentACar.Entities.Concrete;

namespace RentACar.Business.Concrete
{
    public class CarImageManager : ICarImageService
    {
        private static ICarImagesDal _carImagesDal;
        private static ICarDal _cardal;
        private IFileProcess _fileProcess;

        public CarImageManager(ICarImagesDal carImagesDal, ICarDal cardal, IFileProcess fileProcess)
        {
            _carImagesDal = carImagesDal;
            _cardal = cardal;
            _fileProcess = fileProcess;
        }

        public IResult Add(int id, IFormFile files)
        {
            IResult result = BusinessRules.Run(CheckImagesLimit(id), CheckTheCarExists(id));
            if (result != null)
            {
                return result;
            }

            string fileName = Guid.NewGuid().ToString();
            CarImage carImg = new CarImage
            {
                CarId = id,
                CreatedDate = DateTime.UtcNow,
                ImagePath = fileName
            };
            _carImagesDal.Add(carImg);
            var fileResult = _fileProcess.Upload(fileName, files);
            return new SuccessResult(Messages.Add_Message(nameof(CarImage)));
        }

        public IResult Delete(int id)
        {
            IResult result = BusinessRules.Run(CheckTheCarImageExists(id), CheckTheCarExists(id));
            if (result != null)
                return result;
            CarImage currentCar = GetById(id).Data;
            _carImagesDal.Delete(currentCar);
            if (!currentCar.ImagePath.Equals("thumbnail.png")) 
                _fileProcess.Delete(currentCar.ImagePath);
            return new SuccessResult(Messages.Add_Message(nameof(CarImage)));
        }

        public IDataResult<CarImage> GetById(int id)
        {
            var result = _carImagesDal.Get(id);
            return new SuccessDataResult<CarImage>(result);
        }

        public IDataResult<List<CarImage>> GetAll()
        {
            var result = _carImagesDal.GetAll();
            return new SuccessDataResult<List<CarImage>>(result);
        }

        #region Business rules for car Image class

        public static IResult CheckImagesLimit(int id)
        {
            return _carImagesDal.GetAll(img => img.CarId == id).Count() < 5 ?
                new Result(true) : new ErrorResult(Messages.Car_Must_Be_Lower_Than_5_Photos);
        }
        public static IResult CheckTheCarExists(int id)
        {
            return _cardal.Get(id) != null ? (IResult)new Result(true) :
                new ErrorResult(Messages.Car_Must_Be_Exists);
        }
        public static IResult CheckTheCarImageExists(int fileId)
        {
            return _carImagesDal.Get(fileId) != null ? new Result(true) :
                new ErrorResult(Messages.Car_Image_Must_Be_Exists);
        }
        #endregion
    }
}
