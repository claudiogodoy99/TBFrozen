using FrozenWeb.Application.Interfaces;
using FrozenWeb.Application.ViewModel;
using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Results;

namespace FrozenWeb.Presentation.Api.Controllers
{
    public class MotoristaController : ApiController
    {
        private readonly IMotoristaAppService _motoristaApp;
        public MotoristaController(IMotoristaAppService service)
        {
            _motoristaApp = service;
        }


        [HttpPost]
        public IHttpActionResult Cadastrar(MotoristaViewModel motorista)
        {
            try
            {
                _motoristaApp.Add(motorista);
                return Ok();
            }
            catch(Exception e)
            {
                return InternalServerError(e);
            }
        }




        [HttpPut]
        public IHttpActionResult Atualizar(MotoristaViewModel motorista)
        {
            try
            {
                _motoristaApp.Update(motorista, motorista.cnh);
                return Ok();
            }
            catch
            {
                return InternalServerError();
            }
        }

        [HttpDelete]
        [Route("api/Motorista/Deletar/{cnh}")]
        public IHttpActionResult Deletar([FromUri]string cnh)
        {
            try
            {
                _motoristaApp.Delete(cnh);
                return Ok();
            }
            catch(Exception e)
            {
                return InternalServerError();
            }
        }

        [HttpGet]
        [Route("api/Motorista/ListarTodosDaEmpresa/{cnpj}")]
        public JsonResult<List<MotoristaViewModel>> ListarTodosDaEmpresa([FromUri]string cnpj)
        {
            try
            {
                return Json(_motoristaApp.FiltrarMotoristaPorCNPJ(cnpj));
            }
            catch(Exception e)
            {
                return Json(new List<MotoristaViewModel>());
            }
        }



    }
}
