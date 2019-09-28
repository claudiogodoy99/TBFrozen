using FrozenWeb.Domain.Enities;
using FrozenWeb.Domain.Interfaces.Repository;
using FrozenWeb.Infra.Data.Context;

namespace FrozenWeb.Infra.Data.Repository
{
    public class EmpresaRepository : RepostitoryBase<Empresa>, IEmpresaRepository
    {
        public EmpresaRepository(FrozenContext context) : base(context)
        {
        }
    }
}
