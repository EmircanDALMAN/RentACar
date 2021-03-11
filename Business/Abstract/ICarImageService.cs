using System.Collections.Generic;
using Core.Utilities.Results;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;

namespace Business.Abstract
{
    public interface ICarImageService
    {
        IDataResult<List<Image>> GetAll();
        IDataResult<Image> Get(int id);
        IDataResult<List<Image>> GetByCarId(int carId);
        IResult Add(IFormFile file, Image carImage);
        IResult Update(IFormFile file, Image carImage);
        IResult Delete(Image carImage);

    }
}