
using FrozenWeb.Domain.Enities;
using FrozenWeb.Domain.Interfaces.Repository;
using FrozenWeb.Infra.Data.Context;

namespace FrozenWeb.Infra.Data.Repository
{
    public class UsuarioRepository : RepostitoryBase<Usuario>, IUsuarioRepositoy
    {
        public UsuarioRepository(FrozenContext context) : base(context)
        {
        }
    }
}
