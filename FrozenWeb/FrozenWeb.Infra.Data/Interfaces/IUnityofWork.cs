using System;
using System.Data.Entity;
using System.Threading.Tasks;

namespace FrozenWeb.Infra.Data.Interfaces
{
    public interface IUnityofWork : IDisposable
    {
        void SaveChanges();
        Task SaveChangesAsync();

        DbContextTransaction BeginTransaction();
        void RollBack(DbContextTransaction dbContextTransaction);
        void Commit(DbContextTransaction dbContextTransaction);
    }
}
