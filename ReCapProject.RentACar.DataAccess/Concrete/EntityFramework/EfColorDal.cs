using System.Collections.Generic;
using System.Linq;
using ReCapProject.Core.DataAccess.EntityFramework;
using ReCapProject.RentACar.DataAccess.Abstract;
using ReCapProject.RentACar.Entities.Concrete;
using ReCapProject.RentACar.Entities.DTOs;

namespace ReCapProject.RentACar.DataAccess.Concrete.EntityFramework
{
    public class EfColorDal : EfEntityRepositoryBase<Color,RentACarContext>,IColorDal
    {
        
    }
}
