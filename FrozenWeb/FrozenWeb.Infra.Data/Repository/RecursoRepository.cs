

using FrozenWeb.Domain.Enities;
using FrozenWeb.Domain.Interfaces.Repository;
using FrozenWeb.Infra.Data.Context;

namespace FrozenWeb.Infra.Data.Repository
{
    public class RecursoRepository : RepostitoryBase<Recurso>, IRecursoRepository
    {
        public RecursoRepository(FrozenContext context) : base(context)
        {
        }
    }
}
