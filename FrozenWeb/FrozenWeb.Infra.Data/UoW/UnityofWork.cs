using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Linq;
using System.Threading.Tasks;
using FrozenWeb.Domain.Interfaces.Repository;
using FrozenWeb.Infra.Data.Context;

namespace FrozenWeb.Infra.Data.UoW
{
    public class UnityofWork : IUnityOfWork
    {

        private readonly FrozenContext _context;
        private bool _dispose;

        public UnityofWork(FrozenContext context)
        {
            _context = context;
        }

        #region Metodos_Publicos

        public object BeginTransaction() => _context.Database.BeginTransaction();

        public void Commit(object transaction)
        {
            var tran = (DbContextTransaction)transaction;
            tran.Commit();
        }

        public void RollBack(object transaction)
        {
            var tran = (DbContextTransaction)transaction;
            tran.Rollback();
        }

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

            //Adicionar #Log# Posteriormente00
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
