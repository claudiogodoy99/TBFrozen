
using System.Collections.Generic;

namespace FrozenWeb.Domain.Enities
{
    public class Motorista : EntityBase
    {  
        public Motorista()
        {
            viagens = new HashSet<Viagem>();
        }

        public string cnh { get; set; }
        public string nome { get; set; }
        public string empresaCnpj { get; set; }

        public virtual Empresa empresa { get; set; }
        public virtual ICollection<Viagem> viagens { get; set; }
    }
}
