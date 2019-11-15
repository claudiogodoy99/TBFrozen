namespace FrozenWeb.Application.ViewModel
{
    public class UsuarioViewModel : ViewModelBase
    {
        public int id { get; set; }
        public string login { get; set; }
        public string senha { get; set; }
        public string nome { get; set; }
        public string empresaCnpj { get; set; }
        
        public virtual EmpresaViewModel empresa { get; set; }
    }
}