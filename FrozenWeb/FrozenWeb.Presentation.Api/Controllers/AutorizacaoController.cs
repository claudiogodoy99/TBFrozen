using FrozenWeb.Application.Interfaces;
using FrozenWeb.Application.Responses;
using FrozenWeb.Application.ViewModel;
using System;
using System.Web.Http;
using System.Web.Http.Results;

namespace FrozenWeb.Presentation.Api.Controllers
{
    public class AutorizacaoController : ApiController
    {
        private readonly IUsuarioAppService _usuarioAppService;

        public AutorizacaoController(IUsuarioAppService service)
        {
            _usuarioAppService = service;
        }

        [HttpPost]
        public JsonResult<LoginResponse> Login([FromBody]LoginViewModel login)
        {
            try
            {
                var usuarioEcontrado = _usuarioAppService.Logar(login);
                if (usuarioEcontrado == null)
                    return Json(new LoginResponse { Status = "erro", Message = "usuario não identificado", usuario = null });
                else
                    return Json(new LoginResponse { Status = "ok", usuario = usuarioEcontrado, Message = ":)" });
            }
            catch(Exception e)
            {
                return Json(new LoginResponse { Status = "erro", Message = "erro interno", usuario = null });
            }
        }

    }
}
