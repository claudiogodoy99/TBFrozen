using FrozenWeb.Domain.Enities;
using FrozenWeb.Domain.Interfaces.Repository;
using FrozenWeb.Infra.Data.Context;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace FrozenWeb.Infra.Data.Repository
{
    public class RepostitoryBase<TEntity> : IRepositoryBase<TEntity> where TEntity : EntityBase
    {
        #region Propriedades
        protected FrozenContext _context;
        protected DbSet<TEntity> _dbSet;
        #endregion

        #region Contrutor
        public RepostitoryBase(FrozenContext context)
        {
            _context = context;
            _dbSet = _context.Set<TEntity>();
        }


        #endregion

        #region Metodos_Privados
        private IQueryable<TEntity> Include(IQueryable<TEntity> queryable, Expression<Func<TEntity, object>>[] properties)
        {
            properties?.ToList().ForEach(p => queryable = queryable.Include(p));
            return queryable;
        }

        private IQueryable<TEntity> QueryInclude(Expression<Func<TEntity, object>>[] include) 
            => Include(QueryAble, include);
        private IQueryable<TEntity> QueryWhereInclude(Expression<Func<TEntity, bool>> where, Expression<Func<TEntity, object>>[] include) 
            => Include(QueryAble.Where(where), include);
        private IQueryable<TEntityResult> QueryWhereSelect<TEntityResult>(Expression<Func<TEntity, bool>> where, Expression<Func<TEntity, TEntityResult>> select)
            => QueryAble.Where(where).Select(select);
        private IQueryable<TEntityResult> QuerySelect<TEntityResult>(Expression<Func<TEntity, TEntityResult>> select)
            => QueryAble.Select(select);
        #endregion


        #region metodos_Publicos

        public IQueryable<TEntity> QueryAble => _dbSet.AsNoTracking();

        public void Add(TEntity entity) 
            => _dbSet.Add(entity);

        public async Task AddAsync(TEntity entity) 
            => await Task.Run(() =>_dbSet.Add(entity));

        public bool Any(Expression<Func<TEntity, bool>> where)
            => _dbSet.Any(where);

        public Task<bool> AnyAsync(Expression<Func<TEntity, bool>> where)
            => _dbSet.AnyAsync(where);

        public int Count(Expression<Func<TEntity, bool>> where)
            => _dbSet.Count(where);

        public Task<int> CountAsync(Expression<Func<TEntity, bool>> where)
            => _dbSet.CountAsync(where);

        public void Delete(params object[] key)
        {
            var entity = _dbSet.Find(key);
            if (entity == null)
                return;
            _dbSet.Remove(entity);

        }

        public void Dispose()
        {
            _context.Dispose();
            GC.SuppressFinalize(this);
        }

        public IEnumerable<TEntityResult> Distinct<TEntityResult>(Expression<Func<TEntity, TEntityResult>> select)
            => QuerySelect(select).Distinct();

        public IEnumerable<TEntityResult> Distinct<TEntityResult>(Expression<Func<TEntity, bool>> where, Expression<Func<TEntity, TEntityResult>> select)
            => QueryWhereSelect(where, select).Distinct();

        public async Task<IEnumerable<TEntityResult>> DistinctAsync<TEntityResult>(Expression<Func<TEntity, bool>> where, Expression<Func<TEntity, TEntityResult>> select)
            => await Task.Run(() => QueryWhereSelect(where, select).Distinct());

        public async Task<IEnumerable<TEntityResult>> DistinctAsync<TEntityResult>(Expression<Func<TEntity, TEntityResult>> select)
            => await Task.Run(() => QuerySelect(select).Distinct());

        public TEntity FirstOrDefault(params Expression<Func<TEntity, object>>[] include)
            => QueryInclude(include).FirstOrDefault();

        public TEntity FirstOrDefault(Expression<Func<TEntity, bool>> where, params Expression<Func<TEntity, object>>[] include)
            => QueryWhereInclude(where, include).FirstOrDefault();

        public async Task<TEntity> FirstOrDefaultAsync(params Expression<Func<TEntity, object>>[] include)
            => await Task.Run(() => QueryInclude(include).FirstOrDefault());

        public async Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> where, params Expression<Func<TEntity, object>>[] include)
            => await Task.Run(() => QueryWhereInclude(where,include).FirstOrDefault());

        public IEnumerable<TEntity> List(params Expression<Func<TEntity, object>>[] include)
            => QueryInclude(include).ToList();

        public IEnumerable<TEntity> List(Expression<Func<TEntity, bool>> where, params Expression<Func<TEntity, object>>[] include)
            => QueryWhereInclude(where,include).ToList();

        public async Task<IEnumerable<TEntity>> ListAsync(Expression<Func<TEntity, bool>> where, params Expression<Func<TEntity, object>>[] include)
            => await QueryWhereInclude(where, include).ToListAsync().ConfigureAwait(false);

        public async Task<IEnumerable<TEntity>> ListAsync(params Expression<Func<TEntity, object>>[] include)
               => await QueryInclude(include).ToListAsync().ConfigureAwait(false);

        public TEntity Select(string id)
            => _dbSet.Find(id);

        public TEntity Select(int id)
            => _dbSet.Find(id);

        public async Task<TEntity> SelectAsync(string id)
            => await _dbSet.FindAsync(id);

        public async Task<TEntity> SelectAsync(int id)
            => await _dbSet.FindAsync(id);

        public void Update(TEntity entity, object key)
        {
            var entry = _dbSet.Find(key);

            if (entry != null)
                _context.Entry(entry).CurrentValues.SetValues(entity);
        }

        public async Task UpdateAsync(TEntity entity, string keys)
        {
            await Task.Run(() => Update(entity, keys))
                .ConfigureAwait(false);
        }


        #endregion


    }
}
