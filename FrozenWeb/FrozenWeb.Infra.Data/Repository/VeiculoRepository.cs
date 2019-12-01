

using FrozenWeb.Domain.Enities;
using FrozenWeb.Domain.Interfaces.Repository;
using FrozenWeb.Infra.Data.Context;

namespace FrozenWeb.Infra.Data.Repository
{
    public class VeiculoRepository : RepostitoryBase<Veiculo>, IVeiculoRepository
    {
        public VeiculoRepository(FrozenContext context) : base(context)
        {

        }
    }
}
