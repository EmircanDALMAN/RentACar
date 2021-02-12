using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using ReCapProject.Core.DataAccess;
using ReCapProject.RentACar.Entities.Concrete;
using ReCapProject.RentACar.Entities.DTOs;

namespace ReCapProject.RentACar.DataAccess.Abstract
{
    public interface IRentalDal :IEntityRepository<Rental>
    {
        List<RentalDetailsDto> GetRentalDetails(Expression<Func<Rental, bool>> filter = null);
    }
}
