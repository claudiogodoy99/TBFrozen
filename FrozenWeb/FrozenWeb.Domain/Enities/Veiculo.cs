
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace FrozenWeb.Domain.Enities
{
    public class Veiculo : EntityBase
    {
        public int? id { get; set; }
        public string placa { get; set; }
        public string tipo { get; set; }
        public string imagem { get; set; }
        public string marca { get; set; }
        public string modelo { get; set; }
        public int ano { get; set; }
        public string condicao { get; set; }
        public string km { get; set; }
        public string tipoCombustivel { get; set; }
        public int lugares { get; set; }
        public bool emViagem { get; set; }
        public bool emManutencao { get; set; }
       
        public DateTime? ultimaPreventiva { get; set; }
        public DateTime? ultimaCorretiva { get; set; }

        public int garagemId { get; set; }
        public int pneuId { get; set; }

        public string preventivaStatus
        {
            get
            {
                return VerificaStatusDaManutencaoPreventica();
            }
        }
        public string corretivaStatus
        {
            get
            {
                return VerificaStatusDaManutencaoCorretiva();
            }
        }

        public virtual Garagem garagem { get; set; }
        public virtual Empresa empresa { get; set; }
        public virtual Pneu pneu { get; set; }


        private string VerificaStatusDaManutencaoPreventica()
        {
            if (ultimaPreventiva is null)
                return "Não Teve";

            if (ultimaPreventiva.Value.Date < DateTime.Now.Date.AddYears(1))
                return "Vencida";
            else
                return "Em Dia";
        }

        public string VerificaStatusDaManutencaoCorretiva()
        {
            if (ultimaCorretiva is null)
                return "Não Teve";
            else
                return "Ouve Ocorrência";
        }

        public IEnumerable<Veiculo> ListarVeiculosDisponiveis(List<Veiculo> veiculos)
        {
            return veiculos.Where(x => !x.emManutencao && !x.emViagem);
        }

        public IEnumerable<Veiculo> ListarVeiculosIndisponiveis(List<Veiculo> veiculos)
        {
            return veiculos.Where(x => x.emManutencao || x.emViagem);
        }

        public IEnumerable<Veiculo> ListarVeiculosEmManutencao(List<Veiculo> veiculos)
        {
            return veiculos.Where(x => x.emManutencao);
        }

        public IEnumerable<Veiculo> ListarVeiculosEmViagem(List<Veiculo> veiculos)
        {
            return veiculos.Where(x => x.emViagem);
        }
     }
}
