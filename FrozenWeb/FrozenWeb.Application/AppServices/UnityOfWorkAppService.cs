using System.Threading.Tasks;
using FrozenWeb.Application.Interfaces;
using FrozenWeb.Domain.Interfaces.Services;

namespace FrozenWeb.Application.AppServices
{
    public class UnityOfWorkAppService : IUnityOfWorkAppService
    {
        private readonly IUnityOfWorkService _uow;

        public UnityOfWorkAppService(IUnityOfWorkService uow)
        {
            _uow = uow;
        }

        public object BeginTransaction()
            => _uow.BeginTransaction();

        public void Commit(object dbContextTransaction)
            => _uow.Commit(dbContextTransaction);

        public void RollBack(object dbContextTransaction)
            => _uow.RollBack(dbContextTransaction);

        public void SaveChanges()
            => _uow.SaveChanges();

        public Task SaveChangesAsync()
            => _uow.SaveChangesAsync();
    }
}
