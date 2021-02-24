using ReCapProject.DataAccess.Abstract;
using ReCapProject.Entities.Concrete;
using Core.DataAccess.EntityFramework;
using System;
using System.Collections.Generic;
using System.Text;
using ReCapProject.DataAccess.Concrete.Contexts;

namespace ReCapProject.DataAccess.Concrete.EntityFramework
{
    public class EfColorDal:EfEntityRepositoryBase<Color,RecapProjectDbContext>,IColorDal
    {
    }
}
