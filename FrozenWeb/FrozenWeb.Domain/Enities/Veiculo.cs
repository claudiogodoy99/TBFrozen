
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace FrozenWeb.Domain.Enities
{
    public class Veiculo
    {
        public int? id;
        public string Placa;
        public string Tipo;
        public string imagem;
        public string marca;
        public string modelo;
        public int ano;
        public string condicao;
        public string km;
        public string tipoCombustivel;
        public int lugares;
        public bool emViagem;
        public bool emManutencao;
       
        public DateTime? ultimaPreventiva;
        public DateTime? ultimaCorretiva;

        public int garagemId;
        public int pneuId;

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
