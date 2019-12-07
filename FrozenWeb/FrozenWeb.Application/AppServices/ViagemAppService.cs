
using System;
using System.Collections.Generic;
using System.Linq;
using FrozenWeb.Application.Interfaces;
using FrozenWeb.Application.ViewModel;
using FrozenWeb.Domain.Enities;
using FrozenWeb.Domain.Interfaces.Services;

namespace FrozenWeb.Application.AppServices
{
    public class ViagemAppService :AppServiceBase<ViagemViewModel,Viagem> , IViagemAppService
    {
        private readonly IViagemService _viagemService;
        public ViagemAppService(IUnityOfWorkService uow,IViagemService service) : base(uow, service) 
        {
            _viagemService = service;
        }

        public List<ViagemViewModel> ListarTodasDaEmpresa(string cnpj)
        {
            return List().Where(x => x.cnpjId == cnpj).ToList() ;
        }

        public ViagemViewModel BuscarViagemPorId(int id)
        {
            return List().Where(x => x.id == id).FirstOrDefault();
        }

        public List<ViagemViewModel> ListarViagensEmAndamento(string cnpj)
        {
            return ListarTodasDaEmpresa(cnpj).Where(x => x.ViagemEstaEmAndamento).ToList();
        }

        public List<ViagemViewModel> ListarViagensFinalizadas(string cnpj)
        {
            return ListarTodasDaEmpresa(cnpj).Where(x => x.ViagemConcluida).ToList();
        }

        public List<ViagemViewModel> ListarViagensFinalizadasAte(DateTime dataDaFinalizacao, string cnpj)
        {
            return ListarTodasDaEmpresa(cnpj).Where(x => x.ViagemConcluida && x.voltaReal <= dataDaFinalizacao).ToList();
        }

        public List<ViagemViewModel> ListarViagensFinalizadasEm(DateTime dataDaFinalizacao, string cnpj)
        {
            return ListarTodasDaEmpresa(cnpj).Where(x => x.ViagemConcluida && x.voltaReal == dataDaFinalizacao).ToList();
        }

        public List<ViagemViewModel> ListarViagensFinalizadasEntre(DateTime de, DateTime ate, string cnpj)
        {
            return ListarTodasDaEmpresa(cnpj).Where(x => x.ViagemConcluida && x.voltaReal >= ate && x.voltaReal <= ate).ToList();
        }

        public List<ViagemViewModel> ListarViagensPrevistaPara(DateTime previsao, string cnpj)
        {
            return ListarTodasDaEmpresa(cnpj).Where(x => !x.ViagemConcluida && x.previsaoDeVolta == previsao).ToList();
        }

        public List<ViagemViewModel> ListarViagensPrevistarAte(DateTime previsao, string cnpj)
        {
            return ListarTodasDaEmpresa(cnpj).Where(x => !x.ViagemConcluida && x.previsaoDeVolta <= previsao).ToList();
        }

        public List<ViagemViewModel> ListarViagensPrevistasEntre(DateTime dePrevisao, DateTime atePrevisao, string cnpj)
        {
            return ListarTodasDaEmpresa(cnpj).Where(x => !x.ViagemConcluida && x.previsaoDeVolta <= dePrevisao && x.previsaoDeVolta >= atePrevisao).ToList();
        }

        public List<ViagemViewModel> ListarViagensQuaseFinalizada(string cnpj)
        {
            return ListarTodasDaEmpresa(cnpj).Where(x => x.ViagemQuaseConcluida).ToList();
        }

        public List<ViagemViewModel> ListarTodasAsViagensAtrasadas(string cnpj)
        {
            return ListarTodasDaEmpresa(cnpj).Where(x => x.ViagemAtrasada).ToList();
        }
    }
}
