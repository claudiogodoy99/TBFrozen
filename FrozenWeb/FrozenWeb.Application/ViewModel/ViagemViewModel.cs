

using System;

namespace FrozenWeb.Application.ViewModel
{
    public class ViagemViewModel : ViewModelBase
    {
        public int? id { get; set; }
        public DateTime dataDaSaida { get; set; }
        public int garagemId { get; set; }
        public string cnpjId { get; set; }
        public int veiculoId { get; set; }
        public string cnhMotorista { get; set; }
        public DateTime previsaoDeVolta { get; set; }
        public DateTime? voltaReal { get; set; }
        public string relatorioDeViagemFinalizada { get; set; }
        public string enderecoDestino{ get; set; }

        public virtual EmpresaViewModel empresa { get; set; }
        public virtual VeiculoViewModel veiculo { get; set; }
        public virtual MotoristaViewModel motorista { get; set; }
        public virtual GaragemViewModel garagemEntrada { get; set; }

        public bool ViagemEstaEmAndamento
        {
            get => ViagemEstaEmAndamento;
        }

        public bool ViagemAtrasada
        {
            get => ViagemAtrasada;
        }

        public bool ViagemQuaseConcluida
        {
            get => ViagemQuaseConcluida;
        }

        public bool ViagemConcluida
        {
            get => ViagemConcluida;
        }
    }
}
