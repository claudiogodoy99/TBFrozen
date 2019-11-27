using FrozenWeb.Application.Interfaces;
using FrozenWeb.Application.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;

namespace FrozenWeb.Presentation.Api.Controllers
{
    public class GaragemController : ApiController
    {
        private readonly IGaragemAppService _garagem;

        public GaragemController(IGaragemAppService appService)
        {
            _garagem = appService;
        }

        [HttpPost]
        public IHttpActionResult Cadastrar(GaragemViewModel garagem)
        {
            try
            {
                _garagem.Add(garagem);
                return Ok();
            }
            catch(Exception e)
            {
                return InternalServerError();
            }
        }

        [HttpPut]
        public IHttpActionResult Atualizar([FromBody]GaragemViewModel garagem)
        {
            try
            {
                _garagem.Update(garagem, garagem.idGaragem);
                return Ok();
            }
            catch
            {
                return InternalServerError();
            }
        }

        [HttpDelete]
        [Route("api/Garagem/Deletar/{id}")]
        public IHttpActionResult Deletar(int id)
        {
            try
            {
                _garagem.Delete(id);
                return Ok();
            }
            catch
            {
                return InternalServerError();
            }
        }

        [HttpGet]
        [Route("api/Garagem/ListarTodasDaEmpresa/{cnpj}")]
        public JsonResult<List<GaragemViewModel>> ListarTodosDaEmpresa(string cnpj)
        {
            try
            {
                return Json(_garagem.ListarTodasPorCnpj(cnpj));
            }
            catch
            {
                return Json(new List<GaragemViewModel>());
            }
        }


        [HttpGet]
        [Route("api/Garagem/Buscar/{id}")]
        public JsonResult<GaragemViewModel> BuscarPorId(int id)
        {
            try
            {
                return Json(_garagem.BuscarPorId(id));
            }
            catch
            {
                return Json(new GaragemViewModel());
            }
        }
    }
}
