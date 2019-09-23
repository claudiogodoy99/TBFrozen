using FrozenWeb.Domain.Enities;
using FrozenWeb.Infra.Data.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;


namespace FrozenWeb.Infra.Data.EnityConfig
{
    public class UsuarioConfiguration : EntityTypeConfiguration<Usuario>, IMapping
    {
        public UsuarioConfiguration()
        {
            ToTable("USUARIO");


            HasKey(x => x.id)
                .Property(x => x.id)
                .HasColumnName("USUARIOID")
                .HasColumnType("INT")
                .IsRequired()
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            Property(x => x.login)
                .HasColumnName("LOGIN")
                .HasColumnType("VARCHAR")
                .HasMaxLength(50)
                .IsRequired();

            Property(x => x.senha)
                .HasColumnName("SENHA")
                .HasColumnType("VARCHAR")
                .HasMaxLength(10)
                .IsRequired();

            Property(x => x.nome)
                .HasColumnName("NOME")
                .HasColumnType("VARCHAR")
                .HasMaxLength(100)
                .IsRequired();

            Property(x => x.funcaoId)
                .HasColumnName("FUNCAOID")
                .HasColumnType("INT")
                .IsRequired();

            Property(x => x.empresaCnpj)
                .HasColumnName("EMPRESACNPJ")
                .HasColumnType("VARCHAR")
                .HasMaxLength(14)
                .IsRequired();

            HasRequired(x => x.funcao)
                .WithMany(x => x.usuarios)
                .HasForeignKey(x => x.funcaoId);

            HasRequired(x => x.empresa)
                .WithMany(x => x.usuarios)
                .HasForeignKey(x => x.empresaCnpj);

        }
    }
}
