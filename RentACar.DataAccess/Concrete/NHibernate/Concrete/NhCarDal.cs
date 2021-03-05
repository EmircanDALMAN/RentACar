using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using RentACar.Core.DataAccess.NHibernate;
using RentACar.DataAccess.Abstract;
using RentACar.Entities.Concrete;
using RentACar.Entities.Dtos;

namespace RentACar.DataAccess.Concrete.NHibernate.Concrete
{
    public class NhCarDal : NhEntityRepositoryBase<Car>,ICarDal
    {
        private readonly NHibernateHelper _nHibernateHelper;
        public NhCarDal(NHibernateHelper nHibernateHelper) : base(nHibernateHelper)
        {
            _nHibernateHelper = nHibernateHelper;
        }

        public void AddRange(List<Car> cars)
        {
            using var session = _nHibernateHelper.OpenSession();
            session.Save(typeof(List<Car>));
        }

        public List<GetCarDetailDto> GetCarDetails(Expression<Func<Car, bool>> filter = null)
        {
            using var session = _nHibernateHelper.OpenSession();
            var result = from car in filter is null 
                    ? session.Query<Car>() 
                    : session.Query<Car>().Where(filter)
                join brn in session.Query<Brand>() on car.BrandId equals brn.Id
                join clr in session.Query<Color>() on car.ColorId equals clr.Id
                select new GetCarDetailDto()
                {
                    DailyPrice = car.DailyPrice,
                    ModelYear = car.ModelYear,
                    CarName = car.Description,
                    ColorName = clr.Name,
                    BrandName = brn.Name
                };
            return result.ToList();
        }

        public List<GetCarImagesDto> GetCarImageDetails(Expression<Func<Car, bool>> filter = null)
        {
            using var session = _nHibernateHelper.OpenSession();
            var result = from car in filter is null 
                    ? session.Query<Car>()
                    : session.Query<Car>().Where(filter)
                join brn in session.Query<Brand>() on car.BrandId equals brn.Id
                join clr in session.Query<Color>() on car.ColorId equals clr.Id
                join crm in session.Query<CarImage>() on car.Id equals crm.CarId
                select new GetCarImagesDto()
                {
                    DailyPrice = car.DailyPrice,
                    ModelYear = car.ModelYear,
                    Description = car.Description,
                    ColorName = clr.Name,
                    BrandName = brn.Name,
                    ImagePath = crm.ImagePath,
                    CreatedDate = crm.CreatedDate,
                };
            return result.ToList();
        }
    }
}
