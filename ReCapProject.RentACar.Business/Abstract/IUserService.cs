using System;
using System.Collections.Generic;
using System.Text;
using ReCapProject.Core.Utilities.Results.Abstract;
using ReCapProject.RentACar.Entities.Concrete;

namespace ReCapProject.RentACar.Business.Abstract
{
    public interface IUserService
    {
        IDataResult<List<User>> GetAll();
        IResult Add(User user);
        IResult Update(User user);
        IResult Delete(User user);
    }
}
