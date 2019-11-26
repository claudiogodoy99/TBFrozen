
using FrozenWeb.Domain.Enities;
using FrozenWeb.Infra.Data.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace FrozenWeb.Infra.Data.EnityConfig
{
    public class GaragemConfiguration : EntityTypeConfiguration<Garagem> , IMapping
    {
        public GaragemConfiguration()
        {
            ToTable("Garagem");

            HasKey(x => x.id)
                .Property(x => x.id)
                .HasColumnName("IDGARAGEM")
                .HasColumnType("int")
                .IsRequired()
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            Property(x => x.nome)
                .HasMaxLength(70)
                .HasColumnType("VARCHAR")
                .HasColumnName("NOMEGARAGEM");

            Property(x => x.empresaCnpj)
               .HasColumnName("CNPJEMPRESA")
               .HasColumnType("VARCHAR")
               .HasMaxLength(14)
               .IsRequired();


            HasRequired(x => x.empresa)
                .WithMany(x => x.garagens)
                .HasForeignKey(x => x.empresaCnpj);

        }
    }
}
