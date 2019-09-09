using AutoMapper;

namespace FrozenWeb.Application.AutoMapper
{
    public class MapperConfig
    {
        public static void Initialize()
        {
            Mapper.Initialize(x => {
                x.AddProfile<DomainToViewModel>();
                x.AddProfile<ViewModelToDomain>();
            });
        }

    }
}
