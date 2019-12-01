

using System.Collections.Generic;

namespace FrozenWeb.Domain.Enities
{
    public class Empresa : EntityBase
    {

        public Empresa()
        {
            motoristas = new HashSet<Motorista>();
            usuarios = new HashSet<Usuario>();
            garagens = new HashSet<Garagem>();
            veiculos = new HashSet<Veiculo>();
        }

        public string cnpj { get; set; }
        public string descricao { get; set; }

        public virtual ICollection<Motorista> motoristas { get; set; }
        public virtual ICollection<Usuario> usuarios { get; set; }
        public virtual ICollection<Garagem> garagens { get; set; }
        public virtual ICollection<Veiculo> veiculos { get; set; }
    }
}
