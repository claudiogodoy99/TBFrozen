﻿using FrozenWeb.Domain.Enities;
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

            Property(x => x.empresaCnpj)
                .HasColumnName("EMPRESACNPJ")
                .HasColumnType("VARCHAR")
                .HasMaxLength(14)
                .IsRequired();

            Property(x => x.email)
                .HasColumnName("EMAIL")
                .HasColumnType("VARCHAR")
                .HasMaxLength(200)
                .IsRequired();

            Property(x => x.telefone)
               .HasColumnName("TELEFONE")
               .HasColumnType("VARCHAR")
               .HasMaxLength(14)
               .IsRequired();

            Property(x => x.endereco)
               .HasColumnName("ENDERECO")
               .HasColumnType("VARCHAR")
               .HasMaxLength(200)
               .IsRequired();


            HasRequired(x => x.empresa)
                .WithMany(x => x.usuarios)
                .HasForeignKey(x => x.empresaCnpj);

        }
    }
}
