
using FrozenWeb.Domain.Enities;
using FrozenWeb.Domain.Interfaces.Repository;
using FrozenWeb.Infra.Data.Context;

namespace FrozenWeb.Infra.Data.Repository
{
    public class GaragemRepository : RepostitoryBase<Garagem> , IGaragemRepository
    {
        public GaragemRepository(FrozenContext context) : base(context)
        {
        }
    }
}
