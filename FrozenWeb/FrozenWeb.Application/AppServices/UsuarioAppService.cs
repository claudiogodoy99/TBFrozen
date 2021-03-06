﻿
using FrozenWeb.Application.Interfaces;
using FrozenWeb.Application.ViewModel;
using FrozenWeb.Domain.Enities;
using FrozenWeb.Domain.Interfaces.Services;
using System.Collections.Generic;
using System.Linq;

namespace FrozenWeb.Application.AppServices
{
    public class UsuarioAppService : AppServiceBase<UsuarioViewModel, Usuario>, IUsuarioAppService
    {
        private readonly IUsuarioService _usuarioService;
        public UsuarioAppService(IUnityOfWorkService uow, IUsuarioService service) : base(uow,service)
        {
            _usuarioService = service;
        }

        public UsuarioViewModel Logar(LoginViewModel login)
        {
            return List().Where(x => x.email == login.emailLogin && x.senha == login.senhaLogin).FirstOrDefault();
        }

        public List<UsuarioViewModel> FiltrarUsuariosPorCNPJ(string cnpj)
        {
           return List().Where(x =>x.empresaCnpj == cnpj).ToList();
        }

       
    }
}
