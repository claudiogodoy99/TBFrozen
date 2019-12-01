
using FrozenWeb.Domain.Enities;
using FrozenWeb.Infra.Data.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace FrozenWeb.Infra.Data.EnityConfig
{
    public class VeiculoConfiguration : EntityTypeConfiguration<Veiculo>, IMapping
    {
        public VeiculoConfiguration()
        {
            ToTable("VEICULO");

            HasKey(x => x.id)
                .Property(x => x.id)
                .HasColumnType("INT")
                .HasColumnName("VEICULOID")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            Property(x => x.placa)
                .HasColumnType("VARCHAR")
                .HasColumnName("PLACA")
                .HasMaxLength(8)
                .IsRequired();

            Property(x => x.tipo)
                .HasColumnName("TIPO")
                .HasColumnType("VARCHAR")
                .HasMaxLength(10)
                .IsRequired();

            Property(x => x.tipoCambio)
                .HasColumnType("VARCHAR")
                .HasColumnName("CAMBIO")
                .HasMaxLength(1)
                .IsRequired();

            Property(x => x.tipoCombustivel)
                .HasColumnType("VARCHAR")
                .HasColumnName("COMBUSTIVEL")
                .HasMaxLength(1)
                .IsRequired();

            Property(x => x.ultimaCorretiva)
                .HasColumnType("DATETIME")
                .HasColumnName("ULTIMACORRETIVA")
                .IsOptional();

            Property(x => x.ultimaPreventiva)
                .HasColumnType("DATETIME")
                .HasColumnName("ULTIMAPREVENTIVA")
                .IsOptional();

            Property(x => x.ultimoAbastecimento)
                .HasColumnType("DATETIME")
                .HasColumnName("ULTIMOABASTECIMENTO")
                .IsOptional();

            Property(x => x.ano)
                .HasColumnName("ANOMODELO")
                .HasColumnType("INT")
                .IsOptional();

            Property(x => x.condicao)
                .HasColumnName("CONDICAO")
                .HasColumnType("VARCHAR")
                .HasMaxLength(1)
                .IsOptional();

            Property(x => x.emManutencao)
                .HasColumnName("EMMANUTENCAO")
                .HasColumnType("VARCHAR")
                .HasMaxLength(1)
                .IsOptional();

            Property(x => x.emViagem)
                .HasColumnType("VARCHAR")
                .HasColumnName("EMVIAGEM")
                .HasMaxLength(1)
                .IsOptional();

            Property(x => x.imagem)
                .HasColumnName("IMAGEM")
                .HasColumnType("VARCHAR")
                .HasMaxLength(1000)
                .IsOptional();

            Property(x => x.km)
                .HasColumnName("KM")
                .HasColumnType("INT")
                .IsOptional();

            Property(x => x.lugares)
                .HasColumnName("LUGARES")
                .HasColumnType("INT")
                .IsRequired();

            Property(x => x.marca)
                .HasColumnName("MARCA")
                .HasColumnType("VARCHAR")
                .HasMaxLength(100)
                .IsRequired();

            Property(x => x.modelo)
                .HasColumnName("MODELO")
                .HasColumnType("VARCHAR")
                .HasMaxLength(100)
                .IsRequired();

            Property(x => x.seguro)
                .HasColumnName("SEGURO")
                .HasColumnType("VARCHAR")
                .HasMaxLength(100)
                .IsRequired();

            Property(x => x.preco)
                .HasColumnName("PRECO")
                .HasColumnType("DECIMAL")
                .IsRequired();

            HasRequired(x => x.empresa)
              .WithMany(x => x.veiculos)
              .HasForeignKey(x => x.empresaCnpj);

            HasRequired(x => x.garagem)
                .WithMany(x => x.veiculos)
                .HasForeignKey(x => x.garagemId);


        }
    }
}
