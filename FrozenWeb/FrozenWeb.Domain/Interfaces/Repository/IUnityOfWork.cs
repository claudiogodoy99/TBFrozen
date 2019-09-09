using System;
using System.Threading.Tasks;

namespace FrozenWeb.Domain.Interfaces.Repository
{
    public interface IUnityOfWork : IDisposable
    {
        void SaveChanges();
        Task SaveChangesAsync();

        object BeginTransaction();
        void RollBack(object dbContextTransaction);
        void Commit(object dbContextTransaction);
    }
}