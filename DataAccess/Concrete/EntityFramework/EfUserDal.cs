using System;
using System.Collections.Generic;
using System.Linq;
using Core.DataAccess.EntityFramework;
using Core.Entities.Concrete;
using DataAccess.Abstract;
using Entities.DTOs;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfUserDal : EfEntityRepositoryBase<User, RentACarDbContext>, IUserDal
    {
        public List<OperationClaim> GetClaims(int id)
        {
            using (var context = new RentACarDbContext())
            {
                var result = from operationClaim in context.OperationsClaims
                             join userOperationClaim in context.UserOperationsClaims
                                 on operationClaim.Id equals userOperationClaim.OperationClaimId
                             where userOperationClaim.UserId == id
                             select new OperationClaim
                             {
                                 Id = operationClaim.Id,
                                 Name = operationClaim.Name
                             };
                return result.ToList();

            }
        }

        public User GetMostRentedUser()
        {
            using (var context = new RentACarDbContext())
            {
                var mostRentedUserId =
                    context.Rentals.GroupBy(carRental => carRental.UserId,
                            (userId, carRentalsWithThisUserId) => new
                            {
                                UserId = userId,
                                RentalCount = carRentalsWithThisUserId.Count(),
                            })

                        .OrderByDescending(groupByResult => groupByResult.RentalCount)
                        .FirstOrDefault();
                return context.Rentals.Any() 
                    ? Get(u => u.Id == mostRentedUserId.UserId) 
                    : null;
            }
        }

        public User GetLastRegisterUser()
        {
            using (var context = new RentACarDbContext())
            {
                var user = (from u in context.Users
                            orderby u.Id descending
                            select u).FirstOrDefault();
                return user;
            }
        }
    }
}
