using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using NHibernate.Tool.hbm2ddl;
using RentACar.Core.DataAccess.NHibernate;

namespace RentACar.DataAccess.Concrete.NHibernate.Helpers
{
    public class SqlServerHelper : NHibernateHelper
    {
        protected override ISessionFactory InitializeFactory()
        {
            const string connectionString = "server=(localdb)\\mssqllocaldb;Database=RentACarDb;IntegratedSecurity=true";
            return Fluently.Configure().Database(MsSqlConfiguration.MsSql2012.ConnectionString(connectionString))
                .Mappings(t => t.FluentMappings.AddFromAssembly(Assembly.GetExecutingAssembly()))
                .BuildSessionFactory();
        }
    }
}