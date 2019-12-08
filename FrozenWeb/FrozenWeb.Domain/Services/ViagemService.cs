

using FrozenWeb.Domain.Enities;
using FrozenWeb.Domain.Interfaces.Repository;
using FrozenWeb.Domain.Interfaces.Services;

namespace FrozenWeb.Domain.Services
{
    public class ViagemService : ServiceBase<Viagem>, IViagemService
    {
        private readonly IViagemRepository _viagemRepository;
        public ViagemService(IViagemRepository repository) : base(repository)
        {
            _viagemRepository = repository;
        }
    }
}
