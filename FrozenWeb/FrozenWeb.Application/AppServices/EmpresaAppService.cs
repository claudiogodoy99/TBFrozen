

using FrozenWeb.Application.Interfaces;
using FrozenWeb.Application.ViewModel;
using FrozenWeb.Domain.Enities;
using FrozenWeb.Domain.Interfaces.Services;

namespace FrozenWeb.Application.AppServices
{
    public class EmpresaAppService : AppServiceBase<EmpresaViewModel,Empresa>, IEmpresaAppService
    {
        private readonly IEmpresaService _empresaService;

        public EmpresaAppService(IUnityOfWorkService uow, IEmpresaService service) : base(uow, service)
        {
            _empresaService = service;
        }
    }
}
