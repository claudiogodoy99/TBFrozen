using FrozenWeb.Application.ViewModel;
using System.Collections.Generic;

namespace FrozenWeb.Application.Interfaces
{
    public interface IGaragemAppService : IAppServiceBase<GaragemViewModel>
    {
        List<GaragemViewModel> ListarTodasPorCnpj(string cnpj);
    }
}
