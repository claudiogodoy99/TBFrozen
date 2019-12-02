using FrozenWeb.Domain.Enities;
using System.Collections.Generic;

namespace FrozenWeb.Domain.Interfaces.Services
{
    public interface IVeiculoService : IServiceBase<Veiculo>
    {
        IEnumerable<Veiculo> ListarTodosEmManutencao(string cnpj);
        IEnumerable<Veiculo> ListarTodosDisponiveis(string cnpj);
        IEnumerable<Veiculo> ListarTodosEmViagem(string cnpj);
        IEnumerable<Veiculo> ListarTodosIndisponiveis(string cnpj);

    }
}
