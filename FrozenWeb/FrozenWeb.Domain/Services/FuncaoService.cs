

using FrozenWeb.Domain.Enities;
using FrozenWeb.Domain.Interfaces.Repository;
using FrozenWeb.Domain.Interfaces.Services;

namespace FrozenWeb.Domain.Services
{
    public class FuncaoService : ServiceBase<Funcao>, IFuncaoService
    {
        private readonly IFuncaoRepository _funcaoRepository;
        public FuncaoService( IFuncaoRepository repository) : base(repository)
        {
            _funcaoRepository = repository;
        }
    }
}
