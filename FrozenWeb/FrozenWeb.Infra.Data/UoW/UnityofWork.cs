using System;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Linq;
using System.Threading.Tasks;
using FrozenWeb.Infra.Data.Context;
using FrozenWeb.Infra.Data.Interfaces;

namespace FrozenWeb.Infra.Data.UoW
{
    public class UnityofWork : IUnityofWork
    {

        private readonly FrozenContext _context;
        private bool _dispose;

        public UnityofWork(FrozenContext context)
        {
            _context = context;
        }

        #region Metodos_Publicos

        public DbContextTransaction BeginTransaction() => _context.Database.BeginTransaction();

        public void Commit(DbContextTransaction transaction) => transaction.Commit();

        public void RollBack(DbContextTransaction transaction) => transaction.Rollback();

        public void SaveChanges() => _context.SaveChanges();

        public async Task SaveChangesAsync() => await _context.SaveChangesAsync();

        public void Dispose()
        {
            Dispose(true);
        }


        #endregion


        #region Metodos_Protegidos


        protected virtual void ThrowSaveChangesError(DbEntityValidationException e)
        {
            var errorMessages = e.EntityValidationErrors
                .SelectMany(ve => ve.ValidationErrors)
                .Select(msg => msg.ErrorMessage);

            var allErrorMessages = string.Join(";", errorMessages);
            var exceptionMsg = $"Erro do ao salvar mudanças-> {e.Message}; \n Todos os erros => {allErrorMessages} ";

            throw new DbEntityValidationException(exceptionMsg, e.EntityValidationErrors);

            //Adicionar #Log# Posteriormente
        }



        protected void Dispose(bool disposing)
        {
            if (!_dispose)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            _dispose = true;

        }


        #endregion

    }
}
