

using FrozenWeb.Domain.Enities;
using FrozenWeb.Infra.Data.Interfaces;
using System.Data.Entity.ModelConfiguration;

namespace FrozenWeb.Infra.Data.EnityConfig
{
    public class PermissoesConfiguration : EntityTypeConfiguration<Pemissoes> , IMapping
    {
        public PermissoesConfiguration()
        {
            ToTable("PERMISSOES");

            HasKey(x => new { x.funcaoId, x.recursoId });

            Property(x => x.recursoId)
                .HasColumnName("IDRECURSO")
                .HasColumnType("INT")
                .IsRequired();

            Property(x => x.funcaoId)
               .HasColumnName("IDFUNCAO")
               .HasColumnType("INT")
               .IsRequired();
        }
    }
}
