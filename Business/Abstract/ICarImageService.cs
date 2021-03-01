using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;
using Core.Utilities.Results;

namespace Business.Abstract
{
    public interface ICarImageService
    {
        IDataResult<List<CarImage>> GetAllByCarId(int carId);

        IResult Add(CarImage carImage);

        IResult Update(CarImage carImage);

        IResult Delete(CarImage carImage);
    }
}