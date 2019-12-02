

using System.Collections.Generic;
using System.Linq;
using FrozenWeb.Application.Interfaces;
using FrozenWeb.Application.ViewModel;
using FrozenWeb.Domain.Enities;
using FrozenWeb.Domain.Interfaces.Services;
using AutoMapper;

namespace FrozenWeb.Application.AppServices
{
    public class VeiculoAppService : AppServiceBase<VeiculoViewModel, Veiculo>, IVeiculoAppServico
    {
        private readonly IVeiculoService _veiculoService;

        public VeiculoAppService(IVeiculoService service, IUnityOfWorkService uow) : base(uow,service)
        {
            _veiculoService = service;
        }

        public VeiculoViewModel BuscarPorId(int id)
        {
            return List().Where(x => x.id == id).FirstOrDefault();
        }

        public VeiculoViewModel BuscarPorPlaca(string placa)
        {
            return List().Where(x => x.placa == placa).FirstOrDefault();
        }

        public IEnumerable<VeiculoViewModel> ListarTodosDaEmpresa(string cnpj)
        {
            return List().Where(x => x.empresaCnpj == cnpj);
        }

        public IEnumerable<VeiculoViewModel> ListarTodosDaGaragem(int id)
        {
            return List().Where(x => x.garagemId == id);
        }

        public IEnumerable<VeiculoViewModel> ListarTodosDisponiveis(string cnpj)
        {
            return  Mapper.Map<IEnumerable<Veiculo>,IEnumerable<VeiculoViewModel>>(_veiculoService.ListarTodosIndisponiveis(cnpj));
        }

        public IEnumerable<VeiculoViewModel> ListarTodosEmManutencao(string cnpj)
        {
            return Mapper.Map<IEnumerable<Veiculo>, IEnumerable<VeiculoViewModel>>(_veiculoService.ListarTodosEmManutencao(cnpj));
        }

        public IEnumerable<VeiculoViewModel> ListarTodosEmViagem(string cnpj)
        {
            return Mapper.Map<IEnumerable<Veiculo>, IEnumerable<VeiculoViewModel>>(_veiculoService.ListarTodosEmViagem(cnpj));
        }

        public IEnumerable<VeiculoViewModel> ListarTodosIndisponiveis(string cnpj)
        {
            return Mapper.Map<IEnumerable<Veiculo>, IEnumerable<VeiculoViewModel>>(_veiculoService.ListarTodosIndisponiveis(cnpj));
        }

        public void VeiculoEmViagem(int id)
        {
            var veiculo = List().Where(x => x.id == id).FirstOrDefault();
            veiculo.emViagem = "S";

            Update(veiculo, veiculo.id);

        }

        public void VeiculoViagemFinalizada(int id)
        {
            var veiculo = List().Where(x => x.id == id).FirstOrDefault();
            veiculo.emViagem = "N";

            Update(veiculo, veiculo.id);
        }
    }
}
