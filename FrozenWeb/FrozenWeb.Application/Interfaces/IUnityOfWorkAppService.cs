
using System.Threading.Tasks;

namespace FrozenWeb.Application.Interfaces
{
    public interface IUnityOfWorkAppService
    {
        void SaveChanges();
        Task SaveChangesAsync();

        object BeginTransaction();
        void RollBack(object dbContextTransaction);
        void Commit(object dbContextTransaction);
    }
}
