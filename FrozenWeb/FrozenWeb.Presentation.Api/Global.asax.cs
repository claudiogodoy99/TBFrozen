using FrozenWeb.Application.AutoMapper;
using FrozenWeb.Infra.CrossCutting.IoC;
using FrozenWeb.Presentation.Api.App_Start;
using SimpleInjector;
using SimpleInjector.Integration.WebApi;
using SimpleInjector.Lifestyles;
using System.Web.Http;


namespace FrozenWeb.Presentation.Api
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            MapperConfig.Initialize();
            SimpleInjectorWebApiInitializer.Initialize();
        }
    }
}
