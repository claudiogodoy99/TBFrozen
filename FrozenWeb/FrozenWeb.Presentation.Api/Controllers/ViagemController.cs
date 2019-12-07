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
    public class ViagemController : ApiController
    {
        private readonly IViagemAppService _viagem;
        public ViagemController(IViagemAppService viagemAppSerivce)
        {
            _viagem = viagemAppSerivce;
        }


        [HttpPost]
        public IHttpActionResult Cadastrar(ViagemViewModel viagem)
        {
            try
            {
                _viagem.Add(viagem);
                return Ok();
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        [HttpPut]
        public IHttpActionResult Atualizar(ViagemViewModel viagem)
        {
            try
            {
                _viagem.Update(viagem, viagem.id);
                return Ok();
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }


        [HttpDelete]
        [Route("api/Viagem/Deletar/{id}")]
        public IHttpActionResult Deletar([FromUri]int id)
        {
            try
            {
                _viagem.Delete(id);
                return Ok();
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        [HttpGet]
        [Route("api/Viagem/BuscarPorId/{id}")]
        public IHttpActionResult BuscarPorId(int id)
        {
            try
            {
                return Json(_viagem.BuscarViagemPorId(id));
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        [HttpGet]
        [Route("api/Viagem/ListarTodosDaEmpresa/{cnpj}")]
        public IHttpActionResult ListarTodasDaEmpresa(string cnpj)
        {
            try
            {
                return Json(_viagem.ListarTodasDaEmpresa(cnpj));
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        [HttpGet]
        [Route("api/Viagem/ListarTodasEmAndamento/{cnpj}")]
        public IHttpActionResult ListarTodasEmAndamento(string cnpj)
        {
            try
            {
                return Json(_viagem.ListarViagensEmAndamento(cnpj));
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        [HttpGet]
        [Route("api/Viagem/ListarTodasFinalizadas/{cnpj}")]
        public IHttpActionResult ListarTodasFinalizadas(string cnpj)
        {
            try
            {
                return Json(_viagem.ListarViagensFinalizadas(cnpj));
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }


        [HttpGet]
        [Route("api/Viagem/ListarTodasAtrasadas/{cnpj}")]
        public IHttpActionResult ListarTodasAtrasadas(string cnpj)
        {
            try
            {
                return Json(_viagem.ListarTodasAsViagensAtrasadas(cnpj));
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }


        [HttpGet]
        [Route("api/Viagem/ListarViagensQuaseFinalizadas/{cnpj}")]
        public IHttpActionResult ListarViafgensQuaseFinalizadas(string cnpj)
        {
            try
            {
                return Json(_viagem.ListarViagensQuaseFinalizada(cnpj));
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }


        [HttpGet]
        [Route("api/Viagem/ListarPrevistasPara/{cnpj}/{data}")]
        public IHttpActionResult ListarTodasFinalizadas(string cnpj,DateTime data)
        {
            try
            {
                return Json(_viagem.ListarViagensPrevistaPara(data,cnpj));
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        [HttpGet]
        [Route("api/Viagem/ListarPrevistarAte/{cnpj}/{data}")]
        public IHttpActionResult ListarPrevistasAte(string cnpj, DateTime data)
        {
            try
            {
                return Json(_viagem.ListarViagensPrevistarAte(data, cnpj));
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }


        [HttpGet]
        [Route("api/Viagem/ListarFinalizadaEm/{cnpj}/{data}")]
        public IHttpActionResult LitarFinalizadasEm(string cnpj, DateTime data)
        {
            try
            {
                return Json(_viagem.ListarViagensFinalizadasEm(data, cnpj));
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        [HttpGet]
        [Route("api/Viagem/ListarFinalzidasAte/{cnpj}/{data}")]
        public IHttpActionResult ListarFinalzidasAte(string cnpj, DateTime data)
        {
            try
            {
                return Json(_viagem.ListarViagensFinalizadasAte(data, cnpj));
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }


        [HttpGet]
        [Route("api/Viagem/ListarFinalzidasEntre/{de}/{ate}/{cnpj}")]
        public IHttpActionResult ListarFinalzidasAte( DateTime de,DateTime ate, string cnpj)
        {
            try
            {
                return Json(_viagem.ListarViagensFinalizadasEntre(de,ate, cnpj));
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        [HttpGet]
        [Route("api/Viagem/ListarPrevisatasEntre/{de}/{ate}/{cnpj}")]
        public IHttpActionResult ListarPrevistasEntre(DateTime de, DateTime ate, string cnpj)
        {
            try
            {
                return Json(_viagem.ListarViagensPrevistasEntre(de, ate, cnpj));
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }




    }
}
