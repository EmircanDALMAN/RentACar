using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using RentACar.Core.DataAccess.NHibernate;
using RentACar.Core.Entities.Concrete;
using RentACar.DataAccess.Abstract;

namespace RentACar.DataAccess.Concrete.NHibernate.Concrete
{
    public class NhUserDal : NhEntityRepositoryBase<User>,IUserDal
    {
        private readonly NHibernateHelper _nHibernateHelper;
        public NhUserDal(NHibernateHelper nHibernateHelper) : base(nHibernateHelper)
        {
            _nHibernateHelper = nHibernateHelper;
        }

        public List<OperationClaim> GetClaims(User user)
        {
            using var session = _nHibernateHelper.OpenSession();
            var result = from operationClaim in session.Query<OperationClaim>()
                join userOperationClaim in session.Query<UserOperationClaim>()
                    on operationClaim.Id equals userOperationClaim.OperationClaimId
                where userOperationClaim.UserId == user.Id
                select new OperationClaim { Id = operationClaim.Id, Name = operationClaim.Name };
            return result.ToList();
        }
    }
}
