
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
            CreateMap<Recurso, RecursoViewModel>();
            CreateMap<Pemissoes, PermissoesViewModel>();
            CreateMap<Funcao, FuncaoViewModel>();
            CreateMap<Usuario, UsuarioViewModel>();
            CreateMap<Motorista, MotoristaViewModel>();
        }
    }
}
