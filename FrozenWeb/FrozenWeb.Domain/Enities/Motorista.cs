
namespace FrozenWeb.Domain.Enities
{
    public class Motorista : EntityBase
    {
        public string cnh { get; set; }
        public string nome { get; set; }
        public string empresaCnpj { get; set; }

        public virtual Empresa empresa { get; set; }
    }
}
