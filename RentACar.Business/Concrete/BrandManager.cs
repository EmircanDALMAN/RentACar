using System.Collections.Generic;
using RentACar.Business.Abstract;
using RentACar.Business.Constants;
using RentACar.Core.Utilities.Result;
using RentACar.DataAccess.Abstract;
using RentACar.Entities.Concrete;

namespace RentACar.Business.Concrete
{
    /// <summary>
    /// Business Brand class
    /// </summary>
    public class BrandManager:IBrandService
    {
        private readonly IBrandDal _brandDal;

        public BrandManager(IBrandDal brandDal)
        {
            //Create instance with constructor injection
            this._brandDal = brandDal;
        }

        public IResult Add(Brand brand)
        {
            _brandDal.Add(brand);
            return new SuccessResult(Messages.Add_Message(nameof(Brand)));
        }

        public IResult Update(Brand brand)
        {
            _brandDal.Update(brand);
            return new SuccessResult(Messages.Update_Message(nameof(Brand)));
        }

        public IResult Delete(int id)
        {
            _brandDal.Delete(GetById(id).Data);
            return new SuccessResult( Messages.Delete_Message(nameof(Brand)));

        }

        public IDataResult<Brand> GetById(int id)
        {
            var result = _brandDal.Get(id);
            return new SuccessDataResult<Brand>(result);

        }

        public IDataResult<List<Brand>> GetAll()
        {
            var result = _brandDal.GetAll();
            return new SuccessDataResult<List<Brand>>(result);
        }

        public IDataResult<List<Brand>> GetByName(string name)
        {
            var result = _brandDal.GetAll(brand => brand.Name.Contains(name));
            return new SuccessDataResult<List<Brand>>(result);

        }

        public IResult AddRange(List<Brand> brands)
        {
            _brandDal.AddRange(brands);
            return new SuccessDataResult<List<Brand>>(Messages.Multiple_Add_Message(nameof(Brand)));
        }
    }
}
