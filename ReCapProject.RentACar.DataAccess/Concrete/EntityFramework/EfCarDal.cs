using System.Collections.Generic;
using System.Linq;
using ReCapProject.Core.DataAccess.EntityFramework;
using ReCapProject.RentACar.DataAccess.Abstract;
using ReCapProject.RentACar.Entities.Concrete;
using ReCapProject.RentACar.Entities.DTOs;

namespace ReCapProject.RentACar.DataAccess.Concrete.EntityFramework
{
    public class EfCarDal : EfEntityRepositoryBase<Car, RentACarContext>, ICarDal
    {
        public List<CarDetailDto> GetCarDetails()
        {
            using (var context = new RentACarContext())
            {
                var result = from c in context.Cars
                    join b in context.Brands on c.BrandId equals b.Id
                    join co in context.Colors on c.ColorId equals co.Id
                    select new CarDetailDto
                    {
                        BrandName = b.Name,
                        CarId = c.Id,
                        ColorName = co.Name,
                        DailyPrice = c.DailyPrice,
                        Description = c.Description,
                        ModelYear = c.ModelYear
                    };
                return result.ToList();
            }
        }
    }
}
