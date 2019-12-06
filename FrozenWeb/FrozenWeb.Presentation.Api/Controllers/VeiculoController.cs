using FrozenWeb.Application.Interfaces;
using FrozenWeb.Application.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FrozenWeb.Presentation.Api.Controllers
{
    public class VeiculoController : ApiController
    {
        private readonly IVeiculoAppServico _veiculo;
        public VeiculoController(IVeiculoAppServico servico)
        {
            _veiculo = servico;
        }

        [HttpPost]
        public IHttpActionResult Cadastrar(VeiculoViewModel veiculo)
        {
            try
            {
                _veiculo.Add(veiculo);
                return Ok();
            }
            catch(Exception e)
            {
                return InternalServerError(e);
            }
        }

        [HttpPut]
        public IHttpActionResult Atualizar(VeiculoViewModel veiculo)
        {
            try
            {
                _veiculo.Update(veiculo, veiculo.id);
                return Ok();
            }
            catch(Exception e)
            {
                return InternalServerError(e);
            }
        }

        [HttpPut]
        [Route("api/Veiculo/FinalizarViagem/{id}")]
        public IHttpActionResult FinalizarViagem([FromBody] int id)
        {
            try
            {
                _veiculo.VeiculoViagemFinalizada(id);
                return Ok();
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        [HttpPut]
        [Route("api/Veiculo/IniciarViagem/{id}")]
        public IHttpActionResult IniciarViagem([FromBody] int id)
        {
            try
            {
                _veiculo.VeiculoEmViagem(id);
                return Ok();
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        [HttpDelete]
        [Route("api/Veiculo/Deletar/{id}")]
        public IHttpActionResult Deletar([FromUri]int id)
        {
            try
            {
                _veiculo.Delete(id);
                return Ok();
            }
            catch(Exception e)
            {
                return InternalServerError(e);
            }
        }

        [HttpGet]
        [Route("api/Veiculo/ListarTodosDaEmpresa/{cnpj}")]
        public IHttpActionResult ListarTodas(string cnpj)
        {
            try
            {
                return Json(_veiculo.ListarTodosDaEmpresa(cnpj));
            }
            catch(Exception e)
            {
                return InternalServerError(e);
            }
        }

        [HttpGet]
        [Route("api/Veiculo/ListarTodosDaGaragem/{garagemid}")]
        public IHttpActionResult ListarTodosDaGaragem(int garagemid)
        {
            try
            {
                return Json(_veiculo.ListarTodosDaGaragem(garagemid));
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        [HttpGet]
        [Route("api/Veiculo/ListarTodosDisponiveis/{cnpj}")]
        public IHttpActionResult ListarTodosDisponveis(string cnpj)
        {
            try
            {
                return Json(_veiculo.ListarTodosDisponiveis(cnpj));
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        [HttpGet]
        [Route("api/Veiculo/ListarTodosManutencao/{cnpj}")]
        public IHttpActionResult ListarTodosManutencao(string cnpj)
        {
            try
            {
                return Json(_veiculo.ListarTodosEmManutencao(cnpj));
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        [HttpGet]
        [Route("api/Veiculo/ListarTodosEmViagem/{cnpj}")]
        public IHttpActionResult ListarTodosEmViagem(string cnpj)
        {
            try
            {
                return Json(_veiculo.ListarTodosEmViagem(cnpj));
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        [HttpGet]
        [Route("api/Veiculo/ListarTodosIndisponiveis/{cnpj}")]
        public IHttpActionResult ListarTodosIndisponiveis(string cnpj)
        {
            try
            {
                return Json(_veiculo.ListarTodosDaEmpresa(cnpj));
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        [HttpGet]
        [Route("api/Veiculo/BuscarPorId/{id}")]
        public IHttpActionResult BuscarPorId(int id)
        {
            try
            {
                return Json(_veiculo.BuscarPorId(id));
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        [HttpGet]
        [Route("api/Veiculo/BuscarPorPlaca/{placa}")]
        public IHttpActionResult BuscarPorPlaca(string placa)
        {
            try
            {
                return Json(_veiculo.BuscarPorPlaca(placa));
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

    }
}
