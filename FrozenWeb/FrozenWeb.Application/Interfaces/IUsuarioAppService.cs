using FrozenWeb.Application.ViewModel;
using System.Collections.Generic;

namespace FrozenWeb.Application.Interfaces
{
    public interface IUsuarioAppService : IAppServiceBase<UsuarioViewModel>
    {
        UsuarioViewModel Logar(LoginViewModel login);
        List<UsuarioViewModel> FiltrarUsuariosPorCNPJ(string cnpj);
    }
}
