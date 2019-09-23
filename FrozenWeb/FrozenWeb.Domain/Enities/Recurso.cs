using System.Collections.Generic;

namespace FrozenWeb.Domain.Enities
{
    public class Recurso : EntityBase
    {
        public Recurso()
        {
            funcoes = new  HashSet<Funcao>();
        }

        public int id { get; set; }
        public string descricao { get; set; }


        public virtual ICollection<Funcao> funcoes{get;set;}
    }
}
