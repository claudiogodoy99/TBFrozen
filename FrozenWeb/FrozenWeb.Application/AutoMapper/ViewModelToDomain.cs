using AutoMapper;
using FrozenWeb.Application.ViewModel;
using FrozenWeb.Domain.Enities;

namespace FrozenWeb.Application.AutoMapper
{
    class ViewModelToDomain : Profile
    {
        public ViewModelToDomain()
        {

            CreateMap< EmpresaViewModel, Empresa>();
            CreateMap<Usuario, UsuarioViewModel>();
            CreateMap<Motorista, MotoristaViewModel>();
        }
    }
}
