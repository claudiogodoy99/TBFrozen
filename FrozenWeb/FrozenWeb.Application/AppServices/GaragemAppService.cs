

using System.Collections.Generic;
using System.Linq;
using FrozenWeb.Application.Interfaces;
using FrozenWeb.Application.ViewModel;
using FrozenWeb.Domain.Enities;
using FrozenWeb.Domain.Interfaces.Services;

namespace FrozenWeb.Application.AppServices
{
    public class GaragemAppService : AppServiceBase<GaragemViewModel, Garagem> , IGaragemAppService
    {
        private readonly IGaragemService _garagemService;
        private readonly IUnityOfWorkService _uow;

        public GaragemAppService(IUnityOfWorkService uow,IGaragemService service) : base(uow,service)
        {
            _uow = uow;
            _garagemService = service;
        }

        public List<GaragemViewModel> ListarTodasPorCnpj(string cnpj)
        {
            return List().Where(x => x.empresaCnpj == cnpj).ToList();
        }

        public GaragemViewModel BuscarPorId(int id)
        {
            return  List().Where( x=> x.idGaragem == id).FirstOrDefault();
        }
    }
}
