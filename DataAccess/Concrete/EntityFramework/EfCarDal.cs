using Core.DataAccess.EntityFramework;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfCarDal : EfEntityRepositoryBase<Car, RentACarDbContext>, ICarDal
    {
        public List<CarDetailDto> GetCarDetails(Expression<Func<Car, bool>> filter = null)
        {
            using (RentACarDbContext context = new RentACarDbContext())
            {
                var result = (from c in filter == null ? context.Cars : context.Cars.Where(filter)
                              join co in context.Colors on c.ColorId equals co.ColorId
                              join d in context.Brands on c.BrandId equals d.BrandId
                              join im in context.CarImages on c.Id equals im.CarId
                              select new CarDetailDto
                              {
                                  BrandName = d.BrandName,
                                  ColorName = co.ColorName,
                                  DailyPrice = c.DailyPrice,
                                  Description = c.Description,
                                  ModelYear = c.ModelYear,
                                  FindeksScore = c.FindeksScore,
                                  Id = c.Id,
                                  Date = im.Date,
                                  ImagePath = im.ImagePath,
                                  ImageId = im.Id
                              }).ToList();
                return result.GroupBy(c => c.Id)
                    .Select(c => c.FirstOrDefault()).ToList();
            }
        }

        public List<CarDetailDto> GetCarDetailById(int carId)
        {
            using (RentACarDbContext context = new RentACarDbContext())
            {
                var result = (from c in context.Cars
                              join co in context.Colors on c.ColorId equals co.ColorId
                              join d in context.Brands on c.BrandId equals d.BrandId
                              join im in context.CarImages on c.Id equals im.CarId
                              where c.Id == carId
                              select new CarDetailDto
                              {
                                  BrandName = d.BrandName,
                                  ColorName = co.ColorName,
                                  DailyPrice = c.DailyPrice,
                                  Description = c.Description,
                                  ModelYear = c.ModelYear,
                                  FindeksScore = c.FindeksScore,
                                  Id = c.Id,
                                  Date = im.Date,
                                  ImagePath = im.ImagePath,
                                  ImageId = im.Id
                              }).ToList();
                return result;
            }
        }
        public List<CarDetailDto> GetCarDetailsByBrandAndColor(int brandId, int colorId)
        {
            using (RentACarDbContext context = new RentACarDbContext())
            {

                var result = (from car in context.Cars.Where
                        (car => car.BrandId == brandId && car.ColorId == colorId)
                              join brand in context.Brands on car.BrandId equals brand.BrandId
                              join color in context.Colors on car.ColorId equals color.ColorId
                              join im in context.CarImages on car.Id equals im.CarId
                              select new CarDetailDto
                              {
                                  Id = car.Id,
                                  BrandName = brand.BrandName,
                                  ColorName = color.ColorName,
                                  DailyPrice = car.DailyPrice,
                                  ModelYear = car.ModelYear,
                                  Description = car.Description,
                                  FindeksScore = car.FindeksScore,
                                  Date = im.Date,
                                  ImagePath = im.ImagePath,
                                  ImageId = im.Id
                              }).ToList();
                return result.GroupBy(p => p.Id)
                    .Select(p => p.FirstOrDefault()).ToList(); ;
            }
        }

        //public CarDetailDto GetMostRentedCar()
        //{
        //    using (RentACarDbContext context = new RentACarDbContext())
        //    {
        //        var result = (from c in context.Cars 
        //            join co in context.Colors on c.ColorId equals co.ColorId
        //            join d in context.Brands on c.BrandId equals d.BrandId
        //            join im in context.CarImages on c.Id equals im.CarId
        //            select new CarDetailDto
        //            {
        //                BrandName = d.BrandName,
        //                ColorName = co.ColorName,
        //                DailyPrice = c.DailyPrice,
        //                Description = c.Description,
        //                ModelYear = c.ModelYear,
        //                FindeksScore = c.FindeksScore,
        //                Id = c.Id,
        //                Date = im.Date,
        //                ImagePath = im.ImagePath,
        //                ImageId = im.Id
        //            }).ToList();
        //    }
        //}
    }
}
