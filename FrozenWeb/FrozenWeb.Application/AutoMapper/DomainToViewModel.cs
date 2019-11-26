
using AutoMapper;
using FrozenWeb.Application.ViewModel;
using FrozenWeb.Domain.Enities;

namespace FrozenWeb.Application.AutoMapper
{
    class DomainToViewModel : Profile
    {
        public DomainToViewModel()
        {
            CreateMap<Empresa, EmpresaViewModel>();
            CreateMap<Usuario, UsuarioViewModel>();
            CreateMap<Motorista, MotoristaViewModel>();
            CreateMap<Garagem, GaragemViewModel>();
        }
    }
}
