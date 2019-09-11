using System.Threading.Tasks;
using FrozenWeb.Domain.Interfaces.Repository;
using FrozenWeb.Domain.Interfaces.Services;

namespace FrozenWeb.Domain.Services
{
    public class UnitOfWorkService : IUnityOfWorkService
    {
        private readonly IUnityOfWork _uow;

        public UnitOfWorkService(IUnityOfWork uow)
        {
            _uow = uow;
        }

        public object BeginTransaction()
            => _uow.BeginTransaction();

        public void Commit(object dbContextTransaction)
            => _uow.Commit(dbContextTransaction);

        public void Dispose()
            => _uow.Dispose();

        public void RollBack(object dbContextTransaction)
            => _uow.RollBack(dbContextTransaction);

        public void SaveChanges()
            => _uow.SaveChanges();

        public Task SaveChangesAsync()
            => _uow.SaveChangesAsync();
    }
}
