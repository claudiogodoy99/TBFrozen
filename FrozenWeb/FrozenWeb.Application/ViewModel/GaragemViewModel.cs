

using System.Collections.Generic;

namespace FrozenWeb.Application.ViewModel
{
    public class GaragemViewModel :ViewModelBase
    {
        public GaragemViewModel()
        {
        //    veiculos = new HashSet<VeiculoViewModel>();
            empresa = new EmpresaViewModel();
        }

        public int? idGaragem { get; set; }
        public string nome { get; set; }
        public string endereco { get; set; }
        public string empresaCnpj { get; set; }
        //public virtual ICollection<VeiculoViewModel> veiculos { get; set; }
        public virtual EmpresaViewModel empresa { get; set; }
    }
}
