

using System;

namespace FrozenWeb.Application.ViewModel
{
    public class VeiculoViewModel : ViewModelBase
    {

        public VeiculoViewModel()
        {
            empresa = new EmpresaViewModel();
            garagem = new GaragemViewModel();
        }

        public int? id { get; set; }
        public string placa { get; set; }
        public string tipo { get; set; }
        public string imagem { get; set; }
        public string marca { get; set; }
        public string modelo { get; set; }
        public int ano { get; set; }
        public string condicao { get; set; }
        public int? km { get; set; }
        public string tipoCombustivel { get; set; }
        public int lugares { get; set; }
        public string seguro { get; set; }
        public string tipoCambio { get; set; }
        public string consumo { get; set; }
        public string emViagem { get; set; }
        public string emManutencao { get; set; }
        public double preco { get; set; }


        public DateTime? ultimaPreventiva { get; set; }
        public DateTime? ultimaCorretiva { get; set; }
        public DateTime? ultimoAbastecimento { get; set; }

        public int garagemId { get; set; }
        public string empresaCnpj { get; set; }

        public string preventivaStatus
        {
            get;
        }
        public string corretivaStatus
        {
            get;
        }

        public virtual GaragemViewModel garagem { get; set; }
        public virtual EmpresaViewModel empresa { get; set; }
    }
}
