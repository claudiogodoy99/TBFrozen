

using FrozenWeb.Domain.Enities;
using FrozenWeb.Domain.Interfaces.Repository;
using FrozenWeb.Domain.Interfaces.Services;

namespace FrozenWeb.Domain.Services
{
    public class UsuarioService : ServiceBase<Usuario>, IUsuarioService
    {
        private readonly IUsuarioRepositoy _usuarioRepositoy;

        public UsuarioService(IUsuarioRepositoy  repository) : base(repository)
        {
            _usuarioRepositoy = repository;
        }
    }
}
