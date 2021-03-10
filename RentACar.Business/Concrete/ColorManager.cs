using System.Collections.Generic;
using RentACar.Business.Abstract;
using RentACar.Business.Constants;
using RentACar.Core.Utilities.Result;
using RentACar.DataAccess.Abstract;
using RentACar.Entities.Concrete;

namespace RentACar.Business.Concrete
{
    /// <summary>
    /// Business Color Class
    /// </summary>
    public class ColorManager:IColorService
    {
        private IColorDal _colorDal;

        public ColorManager(IColorDal colorDal)
        {
            //Create instance with constructor injection
            this._colorDal = colorDal;
        }

        public IResult Add(Color color)
        {
            _colorDal.Add(color);
            return new SuccessResult(Messages.Add_Message(typeof(Color).Name));
        }

        public IResult Update(Color color)
        {
            _colorDal.Update(color);
            return new SuccessResult( Messages.Update_Message(typeof(Color).Name));
        }

        public IResult Delete(int id)
        {
            _colorDal.Delete(GetById(id).Data);
            return new SuccessResult( Messages.Delete_Message(typeof(Color).Name));

        }

        public IDataResult<Color> GetById(int id)
        {
            var result = _colorDal.Get(id);
            return new SuccessDataResult<Color>(result);

        }

        public IDataResult<List<Color>> GetAll()
        {
            var result= _colorDal.GetAll();
            return new SuccessDataResult<List<Color>>(result);
        }

        public IDataResult<List<Color>> GetByName(string name)
        {
            var result = _colorDal.GetAll(clr => clr.Name.Contains(name));
            return new SuccessDataResult<List<Color>>(result);

        }

        public IResult AddRange(List<Color> colors)
        {
            _colorDal.AddRange(colors);
            return new SuccessResult( Messages.Add_Message(typeof(Color).Name));

        }
    }
}
