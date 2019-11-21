using FrozenWeb.Application.ViewModel;
using System.Collections.Generic;

namespace FrozenWeb.Application.Interfaces
{
    public interface  IMotoristaAppService : IAppServiceBase<MotoristaViewModel>
    {
        List<MotoristaViewModel> FiltrarMotoristaPorCNPJ(string cnpj);
    }
}
