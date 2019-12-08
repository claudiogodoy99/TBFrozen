using System.Collections.Generic;

namespace FrozenWeb.Application.ViewModel
{
    public class MotoristaViewModel : ViewModelBase
    {

        public MotoristaViewModel()
        {
            viagens = new HashSet<ViagemViewModel>();
        }

        public string cnh { get; set; }
        public string nome { get; set; }
        public string empresaCnpj { get; set; }

        public virtual EmpresaViewModel empresa { get; set; }
        public virtual ICollection<ViagemViewModel> viagens { get; set; }
    }
}