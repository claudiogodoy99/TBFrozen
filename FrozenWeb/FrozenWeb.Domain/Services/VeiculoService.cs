

using FrozenWeb.Domain.Enities;
using FrozenWeb.Domain.Interfaces.Repository;
using FrozenWeb.Domain.Interfaces.Services;
using System.Collections.Generic;
using System.Linq;

namespace FrozenWeb.Domain.Services
{
    public class VeiculoService : ServiceBase<Veiculo>, IVeiculoService
    {
        private readonly IVeiculoRepository _veiculoRepository;
        public VeiculoService(IVeiculoRepository repository) : base(repository)
        {
            _veiculoRepository = repository;
        }

        public IEnumerable<Veiculo> ListarTodosEmManutencao(string cnpj)
        {
            return new Veiculo().ListarVeiculosEmManutencao(_veiculoRepository.List().Where(x => x.empresaCnpj == cnpj).ToList());
        }

        public IEnumerable<Veiculo> ListarTodosDisponiveis(string cnpj)
        {
            return new Veiculo().ListarVeiculosDisponiveis(_veiculoRepository.List().Where(x => x.empresaCnpj == cnpj).ToList());
        }

        public IEnumerable<Veiculo> ListarTodosEmViagem(string cnpj)
        {
            return new Veiculo().ListarVeiculosEmViagem(_veiculoRepository.List().Where(x => x.empresaCnpj == cnpj).ToList());
        }

        public IEnumerable<Veiculo> ListarTodosIndisponiveis(string cnpj)
        {
            return new Veiculo().ListarVeiculosIndisponiveis(_veiculoRepository.List().Where(x => x.empresaCnpj == cnpj).ToList());
        }
    }
}
