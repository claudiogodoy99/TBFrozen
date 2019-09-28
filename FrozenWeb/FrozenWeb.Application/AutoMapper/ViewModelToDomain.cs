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
            CreateMap<RecursoViewModel ,Recurso>();
            CreateMap<PermissoesViewModel, Pemissoes>();
            CreateMap<Funcao, FuncaoViewModel>();
            CreateMap<Usuario, UsuarioViewModel>();
            CreateMap<Motorista, MotoristaViewModel>();
        }
    }
}
