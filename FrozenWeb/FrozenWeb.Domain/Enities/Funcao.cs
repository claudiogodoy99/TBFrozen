using System.Collections.Generic;

namespace FrozenWeb.Domain.Enities
{
    public class Funcao : EntityBase
    {
        public Funcao()
        {
            recursos = new HashSet<Recurso>();
            usuarios = new HashSet<Usuario>();
        }

        public int id { get; set; }
        public string descricao { get; set; }

        public virtual ICollection<Usuario> usuarios { get; set; }
        public virtual ICollection<Recurso> recursos { get; set; }
    }
}
