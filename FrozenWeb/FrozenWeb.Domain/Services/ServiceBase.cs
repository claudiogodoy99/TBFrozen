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

        public IQueryable<TEntity> QueryAble => _repository.QueryAble;

        public void Add(TEntity entity)
            => _repository.Add(entity);

        public async Task AddAsync(TEntity entity)
            => await _repository.AddAsync(entity);

        public bool Any(Expression<Func<TEntity, bool>> where)
            => _repository.Any(where);

        public async Task<bool> AnyAsync(Expression<Func<TEntity, bool>> where)
            => await _repository.AnyAsync(where);

        public int Count(Expression<Func<TEntity, bool>> where)
            => _repository.Count(where);

        public async Task<int> CountAsync(Expression<Func<TEntity, bool>> where)
            => await _repository.CountAsync(where);

        public void Delete(params object[] key)
            => _repository.Delete(key);

        public void Dispose()
            => _repository.Dispose();

        public IEnumerable<TEntityResult> Distinct<TEntityResult>(Expression<Func<TEntity, TEntityResult>> select)
            => _repository.Distinct(select);

        public IEnumerable<TEntityResult> Distinct<TEntityResult>(Expression<Func<TEntity, bool>> where, Expression<Func<TEntity, TEntityResult>> select)
            => _repository.Distinct(where, select);

        public async Task<IEnumerable<TEntityResult>> DistinctAsync<TEntityResult>(Expression<Func<TEntity, bool>> where, Expression<Func<TEntity, TEntityResult>> select)
            => await _repository.DistinctAsync(where, select);

        public async Task<IEnumerable<TEntityResult>> DistinctAsync<TEntityResult>(Expression<Func<TEntity, TEntityResult>> select)
            => await _repository.DistinctAsync(select);

        public TEntity FirstOrDefault(params Expression<Func<TEntity, object>>[] include)
            => _repository.FirstOrDefault(include);

        public TEntity FirstOrDefault(Expression<Func<TEntity, bool>> where, params Expression<Func<TEntity, object>>[] include)
            => _repository.FirstOrDefault(where, include);

        public async Task<TEntity> FirstOrDefaultAsync(params Expression<Func<TEntity, object>>[] include)
            => await _repository.FirstOrDefaultAsync(include);

        public async Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> where, params Expression<Func<TEntity, object>>[] include)
            => await _repository.FirstOrDefaultAsync(where, include);

        public IEnumerable<TEntity> List(params Expression<Func<TEntity, object>>[] include)
            => _repository.List(include);

        public IEnumerable<TEntity> List(Expression<Func<TEntity, bool>> where, params Expression<Func<TEntity, object>>[] include)
            => _repository.List(where,include);

        public async Task<IEnumerable<TEntity>> ListAsync(Expression<Func<TEntity, bool>> where, params Expression<Func<TEntity, object>>[] include)
            => await _repository.ListAsync(where, include);

        public Task<IEnumerable<TEntity>> ListAsync(params Expression<Func<TEntity, object>>[] include)
            => _repository.ListAsync(include);

        public TEntity Select(string id)
            => _repository.Select(id);

        public TEntity Select(int id)
            => _repository.Select(id);

        public async Task<TEntity> SelectAsync(string id)
            => await _repository.SelectAsync(id);

        public async Task<TEntity> SelectAsync(int id)
            => await _repository.SelectAsync(id);

        public void Update(TEntity entity, string keys)
            => _repository.Update(entity, keys);

        public async Task UpdateAsync(TEntity entity, string keys)
            => await UpdateAsync(entity, keys);
    }
}
