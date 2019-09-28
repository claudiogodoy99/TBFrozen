

using FrozenWeb.Domain.Enities;
using FrozenWeb.Infra.Data.Context;

namespace FrozenWeb.Infra.Data.Repository
{
    public class PermissoresRepository : RepostitoryBase<Pemissoes>
    {
        public PermissoresRepository(FrozenContext context) : base(context)
        {
        }
    }
}
