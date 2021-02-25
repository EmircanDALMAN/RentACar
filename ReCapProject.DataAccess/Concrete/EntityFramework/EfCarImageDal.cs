using Core.DataAccess.EntityFramework;
using ReCapProject.DataAccess.Abstract;
using ReCapProject.DataAccess.Concrete.Contexts;
using ReCapProject.Entities.Concrete;

namespace ReCapProject.DataAccess.Concrete.EntityFramework
{
    public class EfCarImageDal : EfEntityRepositoryBase<CarImage, RecapProjectDbContext>, ICarImageDal
    {
    }
}
