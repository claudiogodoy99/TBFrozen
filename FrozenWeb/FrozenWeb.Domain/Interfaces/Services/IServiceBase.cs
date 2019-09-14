using FrozenWeb.Domain.Enities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace FrozenWeb.Domain.Interfaces.Services
{
    public interface IServiceBase<TEntity> where TEntity : EntityBase
    {
        IQueryable<TEntity> QueryAble { get; }

        void Add(TEntity entity);

        Task AddAsync(TEntity entity);

        bool Any(Expression<Func<TEntity, bool>> where);

        Task<bool> AnyAsync(Expression<Func<TEntity, bool>> where);

        int Count(Expression<Func<TEntity, bool>> where);

        Task<int> CountAsync(Expression<Func<TEntity, bool>> where);

        void Delete(params object[] key);

        IEnumerable<TEntityResult> Distinct<TEntityResult>(Expression<Func<TEntity, TEntityResult>> select);

        IEnumerable<TEntityResult> Distinct<TEntityResult>(Expression<Func<TEntity, bool>> where, Expression<Func<TEntity, TEntityResult>> select);

        Task<IEnumerable<TEntityResult>> DistinctAsync<TEntityResult>(Expression<Func<TEntity, bool>> where, Expression<Func<TEntity, TEntityResult>> select);

        Task<IEnumerable<TEntityResult>> DistinctAsync<TEntityResult>(Expression<Func<TEntity, TEntityResult>> select);

        TEntity FirstOrDefault(params Expression<Func<TEntity, object>>[] include);

        TEntity FirstOrDefault(Expression<Func<TEntity, bool>> where, params Expression<Func<TEntity, object>>[] include);

        Task<TEntity> FirstOrDefaultAsync(params Expression<Func<TEntity, object>>[] include);

        Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> where, params Expression<Func<TEntity, object>>[] include);

        IEnumerable<TEntity> List(params Expression<Func<TEntity, object>>[] include);

        IEnumerable<TEntity> List(Expression<Func<TEntity, bool>> where, params Expression<Func<TEntity, object>>[] include);

        Task<IEnumerable<TEntity>> ListAsync(Expression<Func<TEntity, bool>> where, params Expression<Func<TEntity, object>>[] include);

        Task<IEnumerable<TEntity>> ListAsync(params Expression<Func<TEntity, object>>[] include);

        TEntity Select(string id);

        Task<TEntity> SelectAsync(string id);

        TEntity Select(int id);

        Task<TEntity> SelectAsync(int id);

        void Update(TEntity entity, string keys);

        Task UpdateAsync(TEntity entity, string keys);
    }
}
