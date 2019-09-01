using FrozenWeb.Domain.Enities;
using FrozenWeb.Domain.Interfaces.Repository;

namespace FrozenWeb.Domain.Interfaces.Services
{
    public interface IServiceBase<TEntity> : IRepositoryBase<TEntity> where TEntity : EntityBase
    {
    }
}
