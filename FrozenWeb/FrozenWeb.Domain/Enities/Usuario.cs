
namespace FrozenWeb.Domain.Enities
{
    public class Usuario : EntityBase
    {
        public  int id{ get; set; }
        public string login{ get; set; }
        public string senha { get; set; }
        public string nome{ get; set; }
        public string empresaCnpj { get; set; }

        public virtual Empresa empresa { get; set; }

    }
}
