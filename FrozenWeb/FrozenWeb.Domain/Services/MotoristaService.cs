

using FrozenWeb.Domain.Enities;
using FrozenWeb.Domain.Interfaces.Repository;
using FrozenWeb.Domain.Interfaces.Services;

namespace FrozenWeb.Domain.Services
{
    public class MotoristaService : ServiceBase<Motorista>, IMotoristaService
    {
        private readonly IMotoristaRepository _motoristaRepository;
        public MotoristaService(IMotoristaRepository repository) : base(repository)
        {
            _motoristaRepository = repository;
        }
    }
}
