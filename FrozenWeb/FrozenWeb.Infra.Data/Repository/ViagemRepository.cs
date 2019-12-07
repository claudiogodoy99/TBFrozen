using FrozenWeb.Domain.Enities;
using FrozenWeb.Domain.Interfaces.Repository;
using FrozenWeb.Infra.Data.Context;

namespace FrozenWeb.Infra.Data.Repository
{
    public class ViagemRepository : RepostitoryBase<Viagem>, IViagemRepository
    {
        public ViagemRepository(FrozenContext context) : base(context)
        {
        }
    }
}
