

using FrozenWeb.Domain.Enities;
using FrozenWeb.Infra.Data.Context;

namespace FrozenWeb.Infra.Data.Repository
{
    public class VeiculoRepository : RepostitoryBase<Veiculo>
    {
        public VeiculoRepository(FrozenContext context) : base(context)
        {

        }
    }
}
