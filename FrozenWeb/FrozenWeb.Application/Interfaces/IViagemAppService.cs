

using FrozenWeb.Application.ViewModel;
using System;
using System.Collections.Generic;

namespace FrozenWeb.Application.Interfaces
{
    public interface IViagemAppService : IAppServiceBase<ViagemViewModel>
    {
        List<ViagemViewModel> ListarTodasDaEmpresa(string cnpj);
        List<ViagemViewModel> ListarViagensEmAndamento(string cnpj);
        List<ViagemViewModel> ListarViagensFinalizadas(string cnpj);
        List<ViagemViewModel> ListarViagensQuaseFinalizada(string cnpj);
        List<ViagemViewModel> ListarViagensPrevistaPara(DateTime previsao, string cnpj);
        List<ViagemViewModel> ListarViagensFinalizadasEm(DateTime dataDaFinalizacao, string cnpj);
        List<ViagemViewModel> ListarViagensPrevistarAte(DateTime previsao, string cnpj);
        List<ViagemViewModel> ListarViagensFinalizadasAte(DateTime dataDaFinalizacao, string cnpj);
        List<ViagemViewModel> ListarViagensPrevistasEntre(DateTime dePrevisao, DateTime atePrevisao, string cnpj);
        List<ViagemViewModel> ListarViagensFinalizadasEntre(DateTime de, DateTime ate, string cnpj);
        List<ViagemViewModel> ListarTodasAsViagensAtrasadas(string cnpj);
        ViagemViewModel BuscarViagemPorId(int id);
    }
}
