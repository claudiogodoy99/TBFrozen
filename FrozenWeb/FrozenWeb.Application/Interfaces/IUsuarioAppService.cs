using FrozenWeb.Application.ViewModel;

namespace FrozenWeb.Application.Interfaces
{
    public interface IUsuarioAppService : IAppServiceBase<UsuarioViewModel>
    {
        UsuarioViewModel Logar(LoginViewModel login);
    }
}
