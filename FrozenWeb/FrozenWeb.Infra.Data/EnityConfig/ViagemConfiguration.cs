

using FrozenWeb.Domain.Enities;
using FrozenWeb.Infra.Data.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace FrozenWeb.Infra.Data.EnityConfig
{
    public class ViagemConfiguration : EntityTypeConfiguration<Viagem> , IMapping
    {
        public ViagemConfiguration()
        {
            ToTable("VIAGEM");

            HasKey(x => x.id)
                .Property(x => x.id)
                .HasColumnName("VIAGEMID")
                .HasColumnType("INT")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity)
                .IsRequired();

            Property(x => x.dataDaSaida)
                .HasColumnName("DATA_SAIDA")
                .HasColumnType("DATETIME")
                .IsRequired();

            Property(x => x.PrevisaoDeVolta)
                .HasColumnName("PREVISAO_VOLTA")
                .HasColumnType("DATETIME")
                .IsRequired();

            Property(x => x.VoltaReal)
                .HasColumnName("VOLTA_REAL")
                .HasColumnType("DATETIME")
                .IsOptional();

            Property(x => x.RelatorioDeViagemFinalizada)
                .HasColumnName("RELATORIO")
                .HasColumnType("VARCHAR")
                .IsOptional();

            HasRequired(x => x.empresa)
                .WithMany(x => x.viagens)
                .HasForeignKey(x => x.cnpjId);

            HasRequired(x => x.veiculo)
                .WithMany(x => x.viagens)
                .HasForeignKey(x => x.veiculoId);

            HasRequired(x => x.motorista)
                .WithMany(x => x.viagens)
                .HasForeignKey(x => x.cnhMotorista);



        }
    }
}
