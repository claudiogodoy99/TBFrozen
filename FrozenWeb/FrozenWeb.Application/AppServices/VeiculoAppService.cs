

using FrozenWeb.Application.Interfaces;
using FrozenWeb.Application.ViewModel;
using FrozenWeb.Domain.Enities;
using FrozenWeb.Domain.Interfaces.Services;

namespace FrozenWeb.Application.AppServices
{
    public class VeiculoAppService : AppServiceBase<VeiculoViewModel, Veiculo>, IVeiculoAppServico
    {
        private readonly IVeiculoService _veiculoService;

        public VeiculoAppService(IVeiculoService service, IUnityOfWorkService uow) : base(uow,service)
        {
            _veiculoService = service;
        }
    }
}
