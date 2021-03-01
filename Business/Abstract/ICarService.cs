using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using Core.Utilities.Results;

namespace Business.Abstract
{
    public interface ICarService
    {
        IDataResult<List<Car>> GetAll();

        IDataResult<List<Car>> GetAllByModelYear(int year);

        IDataResult<List<Car>> GetAllByColorId(int id);

        IDataResult<List<Car>> GetAllByBrandId(int id);

        IDataResult<List<CarDetailDto>> GetCarDetails();

        IResult Add(Car car);

        IResult Update(Car car);

        IResult Delete(Car car);
    }
}