
namespace FrozenWeb.Domain.Enities
{
    public class Usuario : EntityBase
    {
        public  int id{ get; set; }
        public string senha { get; set; }
        public string nome{ get; set; }
        public string empresaCnpj { get; set; }
        public string telefone { get; set; }
        public string email { get; set; }
        public string endereco { get; set; }

        public virtual Empresa empresa { get; set; }

    }
}
