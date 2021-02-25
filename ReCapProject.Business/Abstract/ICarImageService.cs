using System;
using System.Collections.Generic;
using System.Text;
using Core.Utilities.Results.Abstract;
using ReCapProject.Entities.Concrete;

namespace ReCapProject.Business.Abstract
{
    public interface ICarImageService
    {
        IResult Add(CarImage carImage);
        IResult Update(CarImage carImage);
        IResult Delete(CarImage carImage);
        IDataResult<List<CarImage>> GetAll();
        IDataResult<CarImage> GetById(int carImageId);
        IDataResult<List<CarImage>> GetPhotosByCarId(int carId);
    }
}
