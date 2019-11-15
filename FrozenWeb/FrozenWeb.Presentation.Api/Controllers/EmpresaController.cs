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
    }
}
