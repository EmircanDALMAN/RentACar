using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using ReCapProject.Core.DataAccess.EntityFramework;
using ReCapProject.RentACar.DataAccess.Abstract;
using ReCapProject.RentACar.Entities.Concrete;
using ReCapProject.RentACar.Entities.DTOs;

namespace ReCapProject.RentACar.DataAccess.Concrete.EntityFramework
{
    public class EfRentalDal : EfEntityRepositoryBase<Rental, RentACarContext>, IRentalDal
    {
        public List<RentalDetailsDto> GetRentalDetails(Expression<Func<Rental, bool>> filter = null)
        {
            using var context = new RentACarContext();
            var result = from re in filter is null ? context.Rentals : context.Rentals.Where(filter)
                join ca in context.Cars
                    on re.CarId equals ca.Id
                join cus in context.Customers
                    on re.CustomerId equals cus.Id
                join us in context.Users
                    on cus.UserId equals us.Id
                select new RentalDetailsDto()
                {
                    Id = re.Id,
                    CarName = ca.Name,
                    CustomerName = cus.CompanyName,
                    CarId = ca.Id,
                    RentDate = re.RentDate,
                    ReturnDate = re.ReturnDate,
                    UserName = us.FirstName + " " + us.LastName
                };

            return result.ToList();
        }
    }
}
