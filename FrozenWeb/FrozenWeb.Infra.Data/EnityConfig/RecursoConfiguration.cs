
using FrozenWeb.Domain.Enities;
using FrozenWeb.Infra.Data.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace FrozenWeb.Infra.Data.EnityConfig
{
    public class RecursoConfiguration : EntityTypeConfiguration<Recurso> , IMapping
    {
        public RecursoConfiguration()
        {
            ToTable("RECURSO");

            HasKey(x => x.id)
                .Property(x => x.id)
                .HasColumnType("INT")
                .HasColumnName("IDRECURSO")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity)
                .IsRequired();


            Property(x => x.descricao)
                .HasColumnName("DESCRICAO")
                .HasColumnType("VARCHAR")
                .HasMaxLength(100)
                .IsRequired();
        }
    }
}
