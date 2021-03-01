using Core.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;
using Core.Utilities.Results;

namespace Business.Abstract
{
    public interface IUserService
    {
        IDataResult<List<User>> GetAll();

        List<OperationClaim> GetClaims(User user);

        User GetByMail(string email);

        IResult Add(User user);

        IResult Update(User user);

        IResult Delete(User user);
    }
}