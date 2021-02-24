using Core.DataAccess.EntityFramework;
using ReCapProject.DataAccess.Abstract;
using ReCapProject.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;
using ReCapProject.DataAccess.Concrete.Contexts;

namespace ReCapProject.DataAccess.Concrete.EntityFramework
{
    public class EfUserDal:EfEntityRepositoryBase<User, RecapProjectDbContext>,IUserDal
    {
    }
}
