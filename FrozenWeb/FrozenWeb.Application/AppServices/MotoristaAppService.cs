using FrozenWeb.Application.Interfaces;
using FrozenWeb.Application.ViewModel;
using FrozenWeb.Domain.Enities;
using FrozenWeb.Domain.Interfaces.Services;
using System.Collections.Generic;
using System.Linq;

namespace FrozenWeb.Application.AppServices
{
    public class MotoristaAppService : AppServiceBase<MotoristaViewModel,Motorista> , IMotoristaAppService
    {
        private readonly IMotoristaService _motoristaService;

        public MotoristaAppService(IUnityOfWorkService uow, IMotoristaService service) : base(uow,service)
        {
        }

        public List<MotoristaViewModel> FiltrarMotoristaPorCNPJ(string cnpj)
        {
            return List().Where(x => x.empresaCnpj == cnpj).ToList();
        }
    }
}
