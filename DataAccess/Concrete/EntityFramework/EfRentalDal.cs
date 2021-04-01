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
    public class EfRentalDal : EfEntityRepositoryBase<Rental, RentACarDbContext>, IRentalDal
    {
        public List<RentalDetailDto> GetRentalDetailsById(int id)
        {
            using (RentACarDbContext context = new RentACarDbContext())
            {
                if (context.Rentals == null) return null;
                var result = from r in context.Rentals
                    join c in context.Cars on r.CarId equals c.Id
                    join b in context.Brands on c.BrandId equals b.BrandId
                    join u in context.Users on r.UserId equals u.Id
                    where r.CarId == id
                    select new RentalDetailDto
                    {
                        CarId = id,
                        BrandName = b.BrandName,
                        UserId = u.Id,
                        Id = r.Id,
                        RentDate = r.RentDate,
                        ReturnDate = r.ReturnDate,
                        UserName = $"{u.FirstName} {u.LastName}"
                    };
                return result.ToList();

            }
        }

        public List<RentalDetailDto> GetRentalDetails()
        {
            using (RentACarDbContext context = new RentACarDbContext())
            {
                if (context.Rentals == null) return null;
                var result =
                    from r in context.Rentals
                    join c in context.Cars on r.CarId equals c.Id
                    join b in context.Brands on c.BrandId equals b.BrandId
                    join u in context.Users on r.UserId equals u.Id
                    select new RentalDetailDto
                    {
                        Id = r.Id,
                        CarId = c.Id,
                        BrandName = b.BrandName,
                        UserId = u.Id,
                        UserName = $"{u.FirstName} {u.LastName}",
                        RentDate = r.RentDate,
                        ReturnDate = r.ReturnDate
                    };

                return result.ToList();

            }
        }
    }
}
