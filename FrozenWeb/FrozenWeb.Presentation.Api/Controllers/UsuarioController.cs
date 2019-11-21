using FrozenWeb.Application.Interfaces;
using FrozenWeb.Application.Responses;
using FrozenWeb.Application.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Results;

namespace FrozenWeb.Presentation.Api.Controllers
{
    public class UsuarioController : ApiController
    {
        private readonly IUsuarioAppService _usuarioAppService;
        public UsuarioController(IUsuarioAppService service)
        {
            _usuarioAppService = service;
        }


        [HttpPost]
        public IHttpActionResult Cadastrar(UsuarioViewModel usuario)
        {
            try
            {
                _usuarioAppService.Add(usuario);
                return Ok();
            }
            catch(Exception e)
            {
                return InternalServerError();
            }
        }




        [HttpPut]
        public IHttpActionResult Atualizar(UsuarioViewModel usuario)
        {
            try
            {
                _usuarioAppService.Update(usuario, usuario.id);
                return Ok();
            }
            catch
            {
                return InternalServerError();
            }
        }

        [HttpDelete]
        [Route("api/Usuario/Deletar/{id}")]
        public IHttpActionResult Deletar([FromUri]int id)
        {
            try
            {
                _usuarioAppService.Delete(id);
                return Ok();
            }
            catch(Exception e)
            {
                return InternalServerError();
            }
        }

        [HttpGet]
        [Route("api/Usuario/ListarTodosDaEmpresa/{cnpj}")]
        public JsonResult<List<UsuarioViewModel>> ListarTodosDaEmpresa([FromUri]string cnpj)
        {
            try
            {
                return Json(_usuarioAppService.FiltrarUsuariosPorCNPJ(cnpj));
            }
            catch(Exception e)
            {
                return Json(new List<UsuarioViewModel>());
            }
        }



    }
}
