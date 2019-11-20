
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using FrozenWeb.Application.Interfaces;
using FrozenWeb.Application.ViewModel;
using FrozenWeb.Domain.Enities;
using FrozenWeb.Domain.Interfaces.Services;
using AutoMapper;

namespace FrozenWeb.Application.AppServices
{
    public class AppServiceBase<TViewModel, TEntity> : UnityOfWorkAppService, IAppServiceBase<TViewModel> where TViewModel : ViewModelBase where TEntity : EntityBase
    {
        #region Dependencias
        private readonly IServiceBase<TEntity> _service;
        #endregion

        #region Construtor
        public AppServiceBase(IUnityOfWorkService uow, IServiceBase<TEntity> service) : base(uow)
        {
            _service = service;
        }
        #endregion


        #region Metodos Protegidos
        protected IEnumerable<TViewModel> ToViewModelList(IEnumerable<TEntity> entities)
            => Mapper.Map<IEnumerable<TEntity>, IEnumerable<TViewModel>>(entities);

        protected TViewModel ToViewModel(TEntity entity)
            => Mapper.Map<TEntity, TViewModel>(entity);

        protected TEntity ToEntity(TViewModel viewModel) 
            => Mapper.Map<TViewModel, TEntity>(viewModel);

        protected dynamic MapWhere(Expression<Func<TViewModel, bool>> where) 
            => Mapper.Map<Expression<Func<TViewModel, bool>>, Expression<Func<TEntity, bool>>>(where);


        protected dynamic MapSelect<TViewModelResult>(Expression<Func<TViewModel, TViewModelResult>> select)
            => Mapper.Map<Expression<Func<TViewModel, TViewModelResult>>, Expression < Func < TEntity, TViewModelResult>> > (select);

        protected dynamic Mapinclue(Expression<Func<TViewModel, object>>[] inclue)
            => Mapper.Map<Expression<Func<TViewModel, object>>[], Expression<Func<TEntity, object>>[]>(inclue);
        #endregion  

        #region MetodosPublicos
        public void Add(TViewModel viewModel)
        {
            _service.Add(ToEntity(viewModel));
            SaveChanges();
        }

        public async Task AddAsync(TViewModel viewModel)
        {
            await _service.AddAsync(ToEntity(viewModel));
            await SaveChangesAsync();
        }

        public bool Any(Expression<Func<TViewModel, bool>> where)
        {
            return _service.Any(MapWhere(where));
        }

        public async Task<bool> AnyAsync(Expression<Func<TViewModel, bool>> where)
        {
            return await _service.AnyAsync(MapWhere(where));
        }

        public int Count(Expression<Func<TViewModel, bool>> where)
        {
            return _service.Count(MapWhere(where));
        }

        public async Task<int> CountAsync(Expression<Func<TViewModel, bool>> where)
        {
            return await _service.CountAsync(MapWhere(where));
        }

        public void Delete(params object[] key)
        {
            _service.Delete(key);
            SaveChanges();

        }

        public IEnumerable<TViewModelResult> Distinct<TViewModelResult>(Expression<Func<TViewModel, TViewModelResult>> select)
        {
            return _service.Distinct(MapSelect(select));
        }

        public IEnumerable<TViewModelResult> Distinct<TViewModelResult>(Expression<Func<TViewModel, bool>> where, Expression<Func<TViewModel, TViewModelResult>> select)
        {
            return _service.Distinct(MapWhere(where), MapSelect(select));
        }

        public async Task<IEnumerable<TViewModelResult>> DistinctAsync<TViewModelResult>(Expression<Func<TViewModel, bool>> where, Expression<Func<TViewModel, TViewModelResult>> select)
        {
            return await _service.Distinct(MapWhere(where), MapSelect(select));
        }

        public async Task<IEnumerable<TViewModelResult>> DistinctAsync<TViewModelResult>(Expression<Func<TViewModel, TViewModelResult>> select)
        {
            return await _service.Distinct(MapSelect(select));
        }

        public TViewModel FirstOrDefault(params Expression<Func<TViewModel, object>>[] include)
        {
            return ToViewModel(_service.FirstOrDefault(Mapinclue(include)));
        }

        public TViewModel FirstOrDefault(Expression<Func<TViewModel, bool>> where, params Expression<Func<TViewModel, object>>[] include)
        {
            return ToViewModel(_service.FirstOrDefault(MapWhere(where),Mapinclue(include)));
        }

        public async Task<TViewModel> FirstOrDefaultAsync(params Expression<Func<TViewModel, object>>[] include)
        {
            return ToViewModel(await  _service.FirstOrDefault(Mapinclue(include)));
        }

        public async Task<TViewModel> FirstOrDefaultAsync(Expression<Func<TViewModel, bool>> where, params Expression<Func<TViewModel, object>>[] include)
        {
            return ToViewModel( await _service.FirstOrDefault(MapWhere(where),Mapinclue(include)));
        }

        public IEnumerable<TViewModel> List(params Expression<Func<TViewModel, object>>[] include)
        {
            return ToViewModelList(_service.List(Mapinclue(include)));
        }

        public IEnumerable<TViewModel> List(Expression<Func<TViewModel, bool>> where, params Expression<Func<TViewModel, object>>[] include)
        {
            return ToViewModelList(_service.List(MapWhere(where),Mapinclue(include)));
        }

        public async Task<IEnumerable<TViewModel>> ListAsync(Expression<Func<TViewModel, bool>> where, params Expression<Func<TViewModel, object>>[] include)
        {
            return await ToViewModelList(_service.List(MapWhere(where), Mapinclue(include)));
        }

        public async Task<IEnumerable<TViewModel>> ListAsync(params Expression<Func<TViewModel, object>>[] include)
        {
            return await ToViewModelList(_service.List(Mapinclue(include)));
        }

        public TViewModel Select(string id)
        {
            return ToViewModel(_service.Select(id));
        }

        public TViewModel Select(int id)
        {
            return ToViewModel(_service.Select(id));
        }

        public async Task<TViewModel> SelectAsync(string id)
        {
            return ToViewModel(await _service.SelectAsync(id));
        }

        public async  Task<TViewModel> SelectAsync(int id)
        {
            return  ToViewModel(await _service.SelectAsync(id));
        }

        public void Update(TViewModel viewModel, object keys)
        {
            _service.Update(ToEntity(viewModel), keys);

            SaveChanges();
        }

        public async Task UpdateAsync(TViewModel viewModel, string keys)
        {
            await _service.UpdateAsync(ToEntity(viewModel), keys);

            await SaveChangesAsync();
        }
        #endregion
    }
}
