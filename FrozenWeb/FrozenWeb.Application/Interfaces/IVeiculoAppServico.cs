

using FrozenWeb.Application.ViewModel;
using System.Collections.Generic;

namespace FrozenWeb.Application.Interfaces
{
    public interface IVeiculoAppServico : IAppServiceBase<VeiculoViewModel>
    {
        IEnumerable<VeiculoViewModel> ListarTodosEmManutencao(string cnpj);
        IEnumerable<VeiculoViewModel> ListarTodosDisponiveis(string cnpj);
        IEnumerable<VeiculoViewModel> ListarTodosEmViagem(string cnpj);
        IEnumerable<VeiculoViewModel> ListarTodosIndisponiveis(string cnpj);

        IEnumerable<VeiculoViewModel> ListarTodosDaGaragem(int id);
        IEnumerable<VeiculoViewModel> ListarTodosDaEmpresa(string cnpj);

        VeiculoViewModel BuscarPorId(int id);
        VeiculoViewModel BuscarPorPlaca(string placa);

        void VeiculoEmViagem(int id);
        void VeiculoViagemFinalizada(int id);
    }
}
