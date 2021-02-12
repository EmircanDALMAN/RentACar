using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using ReCapProject.Core.Utilities.Results.Abstract;
using ReCapProject.RentACar.Entities.Concrete;
using ReCapProject.RentACar.Entities.DTOs;

namespace ReCapProject.RentACar.Business.Abstract
{
    public interface ICarService
    {
        IDataResult<List<Car>> GetAll(Expression<Func<Car, bool>> filter = null);
        IDataResult<List<CarDetailDto>> GetCarDetails();
        IDataResult<Car> GetById(int id);
        IResult Add(Car car);
        IResult Delete(Car car);
        IResult Update(Car car);
    }
}
