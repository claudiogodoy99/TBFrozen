
using System;

namespace FrozenWeb.Domain.Enities
{
    public class Viagem : EntityBase
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
        public string enderecoDestino { get; set; }

        public virtual Empresa empresa { get; set; }
        public virtual Veiculo veiculo { get; set; }
        public virtual Motorista motorista { get; set; }
        public virtual Garagem garagemEntrada { get; set; }

        public bool ViagemEstaEmAndamento
        {
            get => !voltaReal.HasValue;
        }

        public bool ViagemAtrasada
        {
            get => previsaoDeVolta.Date > DateTime.Now && ViagemEstaEmAndamento;
        }

        public bool ViagemQuaseConcluida {
            get => previsaoDeVolta.Date >= previsaoDeVolta.Date.AddHours(-2) && !ViagemAtrasada && ViagemEstaEmAndamento;
        }

        public bool ViagemConcluida {
            get => !voltaReal.HasValue;
        }
            
    }
}
