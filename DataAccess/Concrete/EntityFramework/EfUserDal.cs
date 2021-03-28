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
    }
}
