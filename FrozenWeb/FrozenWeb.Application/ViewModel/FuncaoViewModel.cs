using System.Collections.Generic;

namespace FrozenWeb.Application.ViewModel
{
    public class FuncaoViewModel
    {
        public FuncaoViewModel()
        {
            recursos = new HashSet<RecursoViewModel>();
            usuarios = new HashSet<UsuarioViewModel>();
        }

        public int id { get; set; }
        public string descricao { get; set; }

        public virtual ICollection<UsuarioViewModel> usuarios { get; set; }
        public virtual ICollection<RecursoViewModel> recursos { get; set; }
    }
}