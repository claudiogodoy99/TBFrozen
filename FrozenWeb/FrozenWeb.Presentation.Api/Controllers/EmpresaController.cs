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
    public class EmpresaController : ApiController
    {
        private readonly IEmpresaAppService _empresa;
        public EmpresaController(IEmpresaAppService empresa)
        {
            _empresa = empresa;
        }

        [HttpPost]
        public IHttpActionResult Cadastrar(EmpresaViewModel empresa)
        {
            try
            {
                _empresa.Add(empresa);
                return Ok();
            }
            catch
            {
                return InternalServerError();
            }
        }

        [HttpPut]
        public IHttpActionResult Atualizar(EmpresaViewModel empresa)
        {
            try
            {
                _empresa.Update(empresa, empresa.cnpj);
                return Ok();
            }
            catch
            {
                return InternalServerError();
            }
        }

        [HttpDelete]
        [Route("api/Empresa/Deletar/{cnpj}")]
        public IHttpActionResult Deletar([FromUri]string cnpj)
        {
            try
            {
                _empresa.Delete(cnpj);
                return Ok();
            }
            catch
            {
                return InternalServerError();
            }
        }

        [HttpGet]
        public JsonResult<List<EmpresaViewModel>> ListarTodas()
        {
            try
            {
                return Json(_empresa.List().ToList());
            }
            catch
            {
                return Json(new List<EmpresaViewModel>());
            }
        }
    }
}
