
using System.Collections.Generic;

namespace FrozenWeb.Domain.Enities
{
    public class Garagem : EntityBase
    {
        public Garagem()
        {
            //veiculos = new HashSet<Veiculo>();
        }

        public int? idGaragem { get; set; }
        public string nome { get; set; }
        public string endereco { get; set; }
        public string empresaCnpj { get; set; }

        //public virtual ICollection<Veiculo> veiculos { get; set; }
        public virtual Empresa empresa { get; set; }
    }
}
