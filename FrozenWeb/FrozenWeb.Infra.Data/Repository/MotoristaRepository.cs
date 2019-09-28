

using FrozenWeb.Domain.Enities;
using FrozenWeb.Infra.Data.Context;

namespace FrozenWeb.Infra.Data.Repository
{
    public class MotoristaRepository : RepostitoryBase<Motorista>
    {
        public MotoristaRepository(FrozenContext context) : base(context)
        {
        }
    }
}
