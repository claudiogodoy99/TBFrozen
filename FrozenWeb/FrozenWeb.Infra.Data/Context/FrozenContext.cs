using FrozenWeb.Infra.Data.Interfaces;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Reflection;
using System;
using FrozenWeb.Domain.Enities;

namespace FrozenWeb.Infra.Data.Context
{
    public class FrozenContext : DbContext
    {
        #region Contrutores
        static FrozenContext()
        {
            Database.SetInitializer<FrozenContext>(null);
        }
      

        public FrozenContext() : base("DefaultConnection")
        {
            Configuration.AutoDetectChangesEnabled = true;
            Configuration.LazyLoadingEnabled = false;
            Configuration.ProxyCreationEnabled = false;
            Configuration.UseDatabaseNullSemantics = false;
            Configuration.ValidateOnSaveEnabled = false;
        }
        #endregion

        #region MetodosProtegidos
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            #region Conventions 
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            modelBuilder.Conventions.Remove<ManyToManyCascadeDeleteConvention>();
            #endregion

            #region Configurations
            List<Type> listMapping = (from x in Assembly.GetExecutingAssembly().GetTypes()
                                       where x.IsClass && typeof(IMapping).IsAssignableFrom(x)
                                       select x).ToList();

            foreach (var map in listMapping)
            {
                dynamic instanceMap = Activator.CreateInstance(map);
                modelBuilder.Configurations.Add(instanceMap);
            }
            #endregion
        }
        #endregion

        #region DbSets
        public DbSet<Empresa> _empresaContext;
        public DbSet<Funcao> _funcaoContext;
        public DbSet<Recurso> _recursoContext;
        public DbSet<Usuario> _usuarioContext;
        public DbSet<Motorista> _motoristaContext;
        public DbSet<Pemissoes> _permissoesContext;
        #endregion
    }
}
