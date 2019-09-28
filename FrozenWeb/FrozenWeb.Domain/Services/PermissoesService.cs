

using FrozenWeb.Domain.Enities;
using FrozenWeb.Domain.Interfaces.Repository;
using FrozenWeb.Domain.Interfaces.Services;

namespace FrozenWeb.Domain.Services
{
    public class PermissoesService : ServiceBase<Pemissoes>, IPermissoesService
    {
        private readonly IPermissoesRepository _permissoesRepository;
        public PermissoesService(IPermissoesRepository repository) : base(repository)
        {
            _permissoesRepository = repository;
        }
    }
}
