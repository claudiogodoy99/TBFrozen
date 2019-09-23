
using FrozenWeb.Domain.Enities;
using FrozenWeb.Infra.Data.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace FrozenWeb.Infra.Data.EnityConfig
{
    public class EmpresaConfiguration : EntityTypeConfiguration<Empresa> , IMapping
    {
        public EmpresaConfiguration()
        {
            ToTable("EMPRESA");

            HasKey(x => x.cnpj)
                .Property(x => x.cnpj)
                .HasColumnName("CNPJ")
                .HasColumnType("VARCHAR")
                .HasMaxLength(14)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None)
                .IsRequired();

            Property(x => x.descricao)
              .HasColumnName("DESCRICAO")
              .HasColumnType("VARCHAR")
              .HasMaxLength(100)
              .IsRequired();
        }
    }
}
