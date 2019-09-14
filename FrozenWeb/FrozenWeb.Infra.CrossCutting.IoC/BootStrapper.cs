using FrozenWeb.Application.AppServices;
using FrozenWeb.Application.Interfaces;
using FrozenWeb.Application.ViewModel;
using FrozenWeb.Domain.Enities;
using FrozenWeb.Domain.Interfaces.Repository;
using FrozenWeb.Domain.Interfaces.Services;
using FrozenWeb.Domain.Services;
using FrozenWeb.Infra.Data.Context;
using FrozenWeb.Infra.Data.Repository;
using FrozenWeb.Infra.Data.UoW;
using SimpleInjector;
using SimpleInjector.Lifestyles;

namespace FrozenWeb.Infra.CrossCutting.IoC
{
    public class BootStrapper
    {
        public static void Initialize(Container container, Lifestyle lifestyle)
        {
            RegisterGeneralLevel(container, lifestyle);
            RegisterAppLevel(container, lifestyle);
            RegisterServiceLevel(container, lifestyle);
            RegisterRepositoryLevel(container, lifestyle);
            
        }

        private static void RegisterAppLevel(Container container, Lifestyle lifestyle)
        {
            container.Register<IUnityOfWorkAppService, UnityOfWorkAppService>(lifestyle);
            container.Register(typeof(IAppServiceBase<ViewModelBase>), typeof(AppServiceBase<ViewModelBase, EntityBase>), lifestyle);
            
        }

        private static void RegisterServiceLevel(Container container, Lifestyle lifestyle)
        {
            container.Register(typeof(IServiceBase<>), typeof(ServiceBase<>), lifestyle);
            container.Register(typeof(IUnityOfWorkService), typeof(UnitOfWorkService), lifestyle);

        }

        private static void RegisterRepositoryLevel(Container container, Lifestyle lifestyle)
        {
            container.Register(typeof(IRepositoryBase<>), typeof(RepostitoryBase<>), lifestyle);
            container.Register(typeof(IUnityOfWork), typeof(UnityofWork), lifestyle);
            
        }

        private static void RegisterGeneralLevel(Container container, Lifestyle lifestyle)
        {
            container.Register<FrozenContext>(lifestyle);
        }
    }
}
