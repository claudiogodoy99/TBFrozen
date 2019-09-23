
using FrozenWeb.Domain.Enities;
using FrozenWeb.Infra.Data.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace FrozenWeb.Infra.Data.EnityConfig
{
    public class MotoristaRecurso : EntityTypeConfiguration<Motorista> , IMapping
    {
        public MotoristaRecurso()
        {
            ToTable("MOTORISTA");

            HasKey(x => x.cnh)
                .Property(x => x.cnh)
                .HasColumnName("CNH")
                .HasColumnType("VARCHAR")
                .HasMaxLength(11)
                .IsRequired()
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            Property(x => x.nome)
                .HasColumnName("NOME")
                .HasColumnType("VARCHAR")
                .HasMaxLength(100)
                .IsRequired();

            Property(x => x.empresaCnpj)
                .HasColumnName("CNPJEMPRESA")
                .HasColumnType("VARCHAR")
                .HasMaxLength(14)
                .IsRequired();

            HasRequired(x => x.empresa)
                .WithMany(x => x.motoristas)
                .HasForeignKey(x => x.empresaCnpj);
        }
    }
}
