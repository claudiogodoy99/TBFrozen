

using FrozenWeb.Domain.Enities;
using FrozenWeb.Domain.Interfaces.Repository;
using FrozenWeb.Domain.Interfaces.Services;

namespace FrozenWeb.Domain.Services
{
    public class GaragemService : ServiceBase<Garagem>, IGaragemService
    {
        private readonly IGaragemRepository _garagemRepository;

        public GaragemService(IGaragemRepository repository) : base(repository)
        {
            _garagemRepository = repository;
        }
    }
}
