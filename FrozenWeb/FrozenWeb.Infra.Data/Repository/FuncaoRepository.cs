using FrozenWeb.Domain.Enities;
using FrozenWeb.Domain.Interfaces.Repository;
using FrozenWeb.Infra.Data.Context;

namespace FrozenWeb.Infra.Data.Repository
{
    public class FuncaoRepository : RepostitoryBase<Funcao> , IFuncaoRepository
    {
        public FuncaoRepository(FrozenContext context) : base(context)
        {
        }
    }
}
