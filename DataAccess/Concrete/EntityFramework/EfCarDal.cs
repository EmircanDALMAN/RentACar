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
                var result = (from c in filter == null
                        ? context.Cars : context.Cars.Where(filter)
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

        public List<CarDetailDto> GetMostRentedCar()
        {
            using (var context = new RentACarDbContext())
            {
                var mostRentedCarId =
                    context.Rentals.GroupBy(carRental => carRental.CarId,
                            (carId, carRentalsWithThisCarId) => new
                            {
                                CarId = carId,
                                RentalCount = carRentalsWithThisCarId.Count(),
                            })

                        .OrderByDescending(groupByResult => groupByResult.RentalCount)
                        .FirstOrDefault();
                return context.Rentals.Any()
                    ? GetCarDetails(c => c.Id == mostRentedCarId.CarId)
                    : null;
            }
        }

        public List<CarDetailDto> GetNowRentedCars()
        {
            using (var context = new RentACarDbContext())
            {
                var result = (from r in context.Rentals
                              where r.ReturnDate > DateTime.UtcNow
                              join c in context.Cars on r.CarId equals c.Id
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
                return result
                    .GroupBy(c => c.Id)
                    .Select(c => c.FirstOrDefault())
                    .ToList();
            }
        }

        public CarDetailDto GetLastAddedCar()
        {
            using (var context = new RentACarDbContext())
            {
                var lastCar = context.Cars
                    .OrderByDescending(c => c.Id)
                        .FirstOrDefault();

                var result = (from c in context.Cars
                              where c.Id == lastCar.Id
                              join b in context.Brands
                                  on c.BrandId equals b.BrandId
                              join co in context.Colors
                                  on c.ColorId equals co.ColorId
                              join im in context.CarImages
                                  on c.Id equals im.CarId
                              select new CarDetailDto
                              {
                                  BrandName = b.BrandName,
                                  ColorName = co.ColorName,
                                  DailyPrice = c.DailyPrice,
                                  Date = im.Date,
                                  Description = c.Description,
                                  FindeksScore = c.FindeksScore,
                                  Id = c.Id,
                                  ImageId = im.Id,
                                  ImagePath = im.ImagePath,
                                  ModelYear = c.ModelYear
                              }).FirstOrDefault();
                return result;
            }
        }

        public CarDetailDto GetBringNewestCar()
        {
            using (var context = new RentACarDbContext())
            {
                var newCar = (from c in context.Cars
                              orderby c.ModelYear descending
                              select c).FirstOrDefault();

                var result = (from c in context.Cars
                    .Where(c => c.Id == newCar.Id)
                              join b in context.Brands
                                  on c.BrandId equals b.BrandId
                              join co in context.Colors
                                  on c.ColorId equals co.ColorId
                              join im in context.CarImages
                                  on c.Id equals im.CarId
                              select new CarDetailDto
                              {
                                  BrandName = b.BrandName,
                                  ColorName = co.ColorName,
                                  DailyPrice = c.DailyPrice,
                                  Date = im.Date,
                                  Description = c.Description,
                                  FindeksScore = c.FindeksScore,
                                  Id = c.Id,
                                  ImageId = im.Id,
                                  ImagePath = im.ImagePath,
                                  ModelYear = c.ModelYear
                              }).FirstOrDefault();
                return result;
            }
        }
    }
}