﻿using Core.DataAccess;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace DataAccess.Abstract
{
    public interface ICarDal : IEntityRepository<Car>
    {
        List<CarDetailDto> GetCarDetails(Expression<Func<Car, bool>> filter = null);
        List<CarDetailDto> GetCarDetailById(int carId);
        List<CarDetailDto> GetCarDetailsByBrandAndColor(int brandId, int colorId);
        List<CarDetailDto> GetMostRentedCar();
        List<CarDetailDto> GetNowRentedCars();
        CarDetailDto GetLastAddedCar();
        CarDetailDto GetBringNewestCar();
    }
}
