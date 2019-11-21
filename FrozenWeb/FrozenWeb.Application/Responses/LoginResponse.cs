using FrozenWeb.Application.ViewModel;

namespace FrozenWeb.Application.Responses
{
    public class LoginResponse
    {
        public string Status { get; set; }
        public string Message { get; set; }
        public UsuarioViewModel usuario { get; set; }

    }
}
