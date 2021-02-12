using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using ReCapProject.Core.Utilities.Results.Abstract;
using ReCapProject.RentACar.Entities.Concrete;

namespace ReCapProject.RentACar.Business.Abstract
{
    public interface IColorService
    {
        IDataResult<List<Color>> GetAll(Expression<Func<Color, bool>> filter = null);
        IResult Add(Color color);
        IResult Delete(Color color);
        IResult Update(Color color);
    }
}
