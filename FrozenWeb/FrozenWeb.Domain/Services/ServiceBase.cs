using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using FrozenWeb.Domain.Enities;
using FrozenWeb.Domain.Interfaces.Repository;
using FrozenWeb.Domain.Interfaces.Services;

namespace FrozenWeb.Domain.Services
{
    public class ServiceBase<TEntity> : IServiceBase<TEntity> where TEntity : EntityBase
    {
        private readonly IRepositoryBase<TEntity> _repository;

        public ServiceBase(IRepositoryBase<TEntity> repositoryBase)
        {
            _repository = repositoryBase; 
        }

        public IQueryable<TEntity> QueryAble => throw new NotImplementedException();

        public void Add(TEntity entity)
        {
            throw new NotImplementedException();
        }

        public Task AddAsync(TEntity entity)
        {
            throw new NotImplementedException();
        }

        public bool Any(Expression<Func<TEntity, bool>> where)
        {
            throw new NotImplementedException();
        }

        public Task<bool> AnyAsync(Expression<Func<TEntity, bool>> where)
        {
            throw new NotImplementedException();
        }

        public int Count(Expression<Func<TEntity, bool>> where)
        {
            throw new NotImplementedException();
        }

        public Task<int> CountAsync(Expression<Func<TEntity, bool>> where)
        {
            throw new NotImplementedException();
        }

        public void Delete(params object[] key)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<TEntityResult> Distinct<TEntityResult>(Expression<Func<TEntity, TEntityResult>> select)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<TEntityResult> Distinct<TEntityResult>(Expression<Func<TEntity, bool>> where, Expression<Func<TEntity, TEntityResult>> select)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<TEntityResult>> DistinctAsync<TEntityResult>(Expression<Func<TEntity, bool>> where, Expression<Func<TEntity, TEntityResult>> select)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<TEntityResult>> DistinctAsync<TEntityResult>(Expression<Func<TEntity, TEntityResult>> select)
        {
            throw new NotImplementedException();
        }

        public TEntity FirstOrDefault(params Expression<Func<TEntity, object>>[] include)
        {
            throw new NotImplementedException();
        }

        public TEntity FirstOrDefault(Expression<Func<TEntity, bool>> where, params Expression<Func<TEntity, object>>[] include)
        {
            throw new NotImplementedException();
        }

        public Task<TEntity> FirstOrDefaultAsync(params Expression<Func<TEntity, object>>[] include)
        {
            throw new NotImplementedException();
        }

        public Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> where, params Expression<Func<TEntity, object>>[] include)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<TEntity> List(params Expression<Func<TEntity, object>>[] include)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<TEntity> List(Expression<Func<TEntity, bool>> where, params Expression<Func<TEntity, object>>[] include)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<TEntity>> ListAsync(Expression<Func<TEntity, bool>> where, params Expression<Func<TEntity, object>>[] include)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<TEntity>> ListAsync(params Expression<Func<TEntity, object>>[] include)
        {
            throw new NotImplementedException();
        }

        public TEntity Select(string id)
        {
            throw new NotImplementedException();
        }

        public TEntity Select(int id)
        {
            throw new NotImplementedException();
        }

        public Task<TEntity> SelectAsync(string id)
        {
            throw new NotImplementedException();
        }

        public Task<TEntity> SelectAsync(int id)
        {
            throw new NotImplementedException();
        }

        public void Update(TEntity entity, params object[] keys)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(TEntity entity, params object[] keys)
        {
            throw new NotImplementedException();
        }
    }
}
