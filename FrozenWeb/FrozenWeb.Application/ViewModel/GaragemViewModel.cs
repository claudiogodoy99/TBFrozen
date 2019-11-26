

using System.Collections.Generic;

namespace FrozenWeb.Application.ViewModel
{
    public class GaragemViewModel :ViewModelBase
    {
        public GaragemViewModel()
        {
            veiculos = new HashSet<VeiculoViewModel>();
            empresa = new EmpresaViewModel();
        }

        public int? id;
        public string nome;
        public string empresaCnpj;

        public virtual ICollection<VeiculoViewModel> veiculos { get; set; }
        public virtual EmpresaViewModel empresa { get; set; }
    }
}
