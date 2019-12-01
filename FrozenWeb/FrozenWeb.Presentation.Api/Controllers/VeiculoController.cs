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

    }
}
