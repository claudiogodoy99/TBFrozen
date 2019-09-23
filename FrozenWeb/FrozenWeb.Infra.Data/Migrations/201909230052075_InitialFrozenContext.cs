namespace FrozenWeb.Infra.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialFrozenContext : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.EMPRESA",
                c => new
                    {
                        CNPJ = c.String(nullable: false, maxLength: 14, unicode: false),
                        DESCRICAO = c.String(nullable: false, maxLength: 100, unicode: false),
                    })
                .PrimaryKey(t => t.CNPJ);
            
            CreateTable(
                "dbo.MOTORISTA",
                c => new
                    {
                        CNH = c.String(nullable: false, maxLength: 11, unicode: false),
                        NOME = c.String(nullable: false, maxLength: 100, unicode: false),
                        CNPJEMPRESA = c.String(nullable: false, maxLength: 14, unicode: false),
                    })
                .PrimaryKey(t => t.CNH)
                .ForeignKey("dbo.EMPRESA", t => t.CNPJEMPRESA)
                .Index(t => t.CNPJEMPRESA);
            
            CreateTable(
                "dbo.USUARIO",
                c => new
                    {
                        USUARIOID = c.Int(nullable: false, identity: true),
                        LOGIN = c.String(nullable: false, maxLength: 50, unicode: false),
                        senha = c.String(),
                        NOME = c.String(nullable: false, maxLength: 100, unicode: false),
                        FUNCAOID = c.Int(nullable: false),
                        EMPRESACNPJ = c.String(nullable: false, maxLength: 14, unicode: false),
                    })
                .PrimaryKey(t => t.USUARIOID)
                .ForeignKey("dbo.EMPRESA", t => t.EMPRESACNPJ)
                .ForeignKey("dbo.FUNCAO", t => t.FUNCAOID)
                .Index(t => t.FUNCAOID)
                .Index(t => t.EMPRESACNPJ);
            
            CreateTable(
                "dbo.FUNCAO",
                c => new
                    {
                        IDFUNCAO = c.Int(nullable: false, identity: true),
                        DESCRICAO = c.String(nullable: false, maxLength: 100, unicode: false),
                    })
                .PrimaryKey(t => t.IDFUNCAO);
            
            CreateTable(
                "dbo.RECURSO",
                c => new
                    {
                        IDRECURSO = c.Int(nullable: false, identity: true),
                        DESCRICAO = c.String(nullable: false, maxLength: 100, unicode: false),
                    })
                .PrimaryKey(t => t.IDRECURSO);
            
            CreateTable(
                "dbo.PERMISSOES",
                c => new
                    {
                        IDFUNCAO = c.Int(nullable: false),
                        IDRECURSO = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.IDFUNCAO, t.IDRECURSO })
                .ForeignKey("dbo.FUNCAO", t => t.IDFUNCAO)
                .ForeignKey("dbo.RECURSO", t => t.IDRECURSO)
                .Index(t => t.IDFUNCAO)
                .Index(t => t.IDRECURSO);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.USUARIO", "FUNCAOID", "dbo.FUNCAO");
            DropForeignKey("dbo.PERMISSOES", "IDRECURSO", "dbo.RECURSO");
            DropForeignKey("dbo.PERMISSOES", "IDFUNCAO", "dbo.FUNCAO");
            DropForeignKey("dbo.USUARIO", "EMPRESACNPJ", "dbo.EMPRESA");
            DropForeignKey("dbo.MOTORISTA", "CNPJEMPRESA", "dbo.EMPRESA");
            DropIndex("dbo.PERMISSOES", new[] { "IDRECURSO" });
            DropIndex("dbo.PERMISSOES", new[] { "IDFUNCAO" });
            DropIndex("dbo.USUARIO", new[] { "EMPRESACNPJ" });
            DropIndex("dbo.USUARIO", new[] { "FUNCAOID" });
            DropIndex("dbo.MOTORISTA", new[] { "CNPJEMPRESA" });
            DropTable("dbo.PERMISSOES");
            DropTable("dbo.RECURSO");
            DropTable("dbo.FUNCAO");
            DropTable("dbo.USUARIO");
            DropTable("dbo.MOTORISTA");
            DropTable("dbo.EMPRESA");
        }
    }
}
