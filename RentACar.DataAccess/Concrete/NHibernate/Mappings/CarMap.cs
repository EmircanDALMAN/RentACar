using System;
using System.Collections.Generic;
using System.Text;
using FluentNHibernate.Mapping;
using RentACar.Entities.Concrete;

namespace RentACar.DataAccess.Concrete.NHibernate.Mappings
{
    public class CarMap  : ClassMap<Car>
    {
        public CarMap()
        {
            Table("Cars");
            LazyLoad();
            Id(x => x.Id).Column("Id");
            Map(x => x.BrandId).Column("BrandId");
            Map(x => x.ColorId).Column("ColorId");
            Map(x => x.DailyPrice).Column("DailyPrice");
            Map(x => x.Description).Column("Description");
            Map(x => x.ModelYear).Column("ModelYear");
        }
    }
}
