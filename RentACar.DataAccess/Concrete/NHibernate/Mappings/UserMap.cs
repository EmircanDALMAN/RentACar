using System;
using System.Collections.Generic;
using System.Text;
using FluentNHibernate.Mapping;
using RentACar.Core.Entities.Concrete;

namespace RentACar.DataAccess.Concrete.NHibernate.Mappings
{
    public class UserMap  : ClassMap<User>
    {
        public UserMap()
        {
            Table("Users");
            LazyLoad();
            Id(x => x.Id).Column("Id");
            Map(x => x.Email).Column("Email");
            Map(x => x.FirstName).Column("FirstName");
            Map(x => x.LastName).Column("LastName");
            Map(x => x.PasswordHash).Column("PasswordHash");
            Map(x => x.PasswordSalt).Column("PasswordSalt");
            Map(x => x.Status).Column("Status");
        }
    }
}
