using System;
using System.Collections.Generic;
using System.Text;
using ReCapProject.Core.DataAccess;
using ReCapProject.RentACar.Entities.Concrete;

namespace ReCapProject.RentACar.DataAccess.Abstract
{
    public interface IUserDal : IEntityRepository<User>
    {

    }
}
