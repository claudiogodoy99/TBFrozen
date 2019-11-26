
using System.Collections.Generic;

namespace FrozenWeb.Domain.Enities
{
    public class Garagem : EntityBase
    {
        public Garagem()
        {
            veiculos = new HashSet<Veiculo>();
            empresa = new Empresa();
        }

        public int? id;
        public string nome;
        public string empresaCnpj;

        public virtual ICollection<Veiculo> veiculos { get; set; }
        public virtual Empresa empresa { get; set; }
    }
}
