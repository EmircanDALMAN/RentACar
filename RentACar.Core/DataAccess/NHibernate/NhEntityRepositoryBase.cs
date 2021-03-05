using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using RentACar.Core.Entities;

namespace RentACar.Core.DataAccess.NHibernate
{
    public class NhEntityRepositoryBase<T> : IEntityRepository<T> where T : class, IEntity, new()
    {
        private readonly NHibernateHelper _nHibernateHelper;

        public NhEntityRepositoryBase(NHibernateHelper nHibernateHelper)
        {
            _nHibernateHelper = nHibernateHelper;
        }

        public T Get(int id)
        {
            using var session = _nHibernateHelper.OpenSession();
            return session.Query<T>().SingleOrDefault(t => t.Id == id);
        }

        public void Add(T entity)
        {
            using var session = _nHibernateHelper.OpenSession();
            session.Save(entity);
            session.Flush();
        }

        public void Update(T entity)
        {
            using var session = _nHibernateHelper.OpenSession();
            session.Update(entity);
            session.Flush();
        }

        public void Delete(T entity)
        {
            using var session = _nHibernateHelper.OpenSession();
            session.Delete(entity);
            session.Flush();
        }

        public List<T> GetAll(Expression<Func<T, bool>> filter = null)
        {
            using var session = _nHibernateHelper.OpenSession();
            return filter == null
                ? session.Query<T>().ToList()
                : session.Query<T>().Where(filter).ToList();
        }
    }
}
