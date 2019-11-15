

using FrozenWeb.Domain.Enities;
using FrozenWeb.Domain.Interfaces.Repository;
using FrozenWeb.Infra.Data.Context;

namespace FrozenWeb.Infra.Data.Repository
{
    public class MotoristaRepository : RepostitoryBase<Motorista>, IMotoristaRepository
    {
        public MotoristaRepository(FrozenContext context) : base(context)
        {
        }
    }
}
