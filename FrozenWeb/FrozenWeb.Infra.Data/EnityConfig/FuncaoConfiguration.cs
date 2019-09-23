using FrozenWeb.Domain.Enities;
using FrozenWeb.Infra.Data.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace FrozenWeb.Infra.Data.EnityConfig
{
    public class FuncaoConfiguration : EntityTypeConfiguration<Funcao>, IMapping
    {
        public FuncaoConfiguration()
        {
            ToTable("FUNCAO");

            HasKey(x => x.id)
                .Property(x => x.id)
                .HasColumnName("IDFUNCAO")
                .HasColumnType("INT")
                .IsRequired()
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            Property(x => x.descricao)
                .HasColumnName("DESCRICAO")
                .HasColumnType("VARCHAR")
                .HasMaxLength(100)
                .IsRequired();

            HasMany(x => x.recursos)
                .WithMany(x => x.funcoes)
                .Map(x =>
                {
                    x.ToTable("PERMISSOES");
                    x.MapLeftKey("IDFUNCAO");
                    x.MapRightKey("IDRECURSO");
                });



        }
    }
}
