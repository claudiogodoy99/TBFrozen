using FrozenWeb.Application.ViewModel;
using FrozenWeb.Infra.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace FrozenWeb.Application.Interfaces
{
    public interface IAppServiceBase<TViewModel> : IUnityofWork where TViewModel : ViewModelBase
    {
        void Add(TViewModel entity);

        Task AddAsync(TViewModel entity);

        bool Any(Expression<Func<TViewModel, bool>> where);

        Task<bool> AnyAsync(Expression<Func<TViewModel, bool>> where);

        int Count(Expression<Func<TViewModel, bool>> where);

        Task<int> CountAsync(Expression<Func<TViewModel, bool>> where);

        void Delete(params object[] key);

        IEnumerable<TEntityResult> Distinct<TEntityResult>(Expression<Func<TViewModel, TEntityResult>> select);

        IEnumerable<TEntityResult> Distinct<TEntityResult>(Expression<Func<TViewModel, bool>> where, Expression<Func<TViewModel, TEntityResult>> select);

        Task<IEnumerable<TViewModelResult>> DistinctAsync<TViewModelResult>(Expression<Func<TViewModel, bool>> where, Expression<Func<TViewModel, TViewModelResult>> select);

        Task<IEnumerable<TViewModelResult>> DistinctAsync<TViewModelResult>(Expression<Func<TViewModel, TViewModelResult>> select);

        TViewModel FirstOrDefault(params Expression<Func<TViewModel, object>>[] include);

        TViewModel FirstOrDefault(Expression<Func<TViewModel, bool>> where, params Expression<Func<TViewModel, object>>[] include);

        Task<TViewModel> FirstOrDefaultAsync(params Expression<Func<TViewModel, object>>[] include);

        Task<TViewModel> FirstOrDefaultAsync(Expression<Func<TViewModel, bool>> where, params Expression<Func<TViewModel, object>>[] include);

        IEnumerable<TViewModel> List(params Expression<Func<TViewModel, object>>[] include);

        IEnumerable<TViewModel> List(Expression<Func<TViewModel, bool>> where, params Expression<Func<TViewModel, object>>[] include);

        Task<IEnumerable<TViewModel>> ListAsync(Expression<Func<TViewModel, bool>> where, params Expression<Func<TViewModel, object>>[] include);

        Task<IEnumerable<TViewModel>> ListAsync(params Expression<Func<TViewModel, object>>[] include);

        TViewModel Select(string id);

        Task<TViewModel> SelectAsync(string id);

        TViewModel Select(int id);

        Task<TViewModel> SelectAsync(int id);

        void Update(TViewModel entity, params object[] keys);

        Task UpdateAsync(TViewModel entity, params object[] keys);

    }
}
