using System;
using System.Collections.Generic;
using System.Linq;
using Core.DataAccess.EntityFramework;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfCustomerDal : EfEntityRepositoryBase<Customer, RentACarDbContext>, ICustomerDal
    {
        public List<CustomerDetailDto> GetCustomerDetails()
        {
            using (var context = new RentACarDbContext())
            {
                var result = (from c in context.Customers
                              join u in context.Users on c.UserId equals u.Id
                              select new CustomerDetailDto
                              {
                                  Email = u.Email,
                                  UserId = u.Id,
                                  FirstName = u.FirstName,
                                  Id = c.Id,
                                  LastName = u.LastName,
                                  CompanyName = c.CompanyName
                              }).ToList();
                return result;
            }
        }
    }
}
