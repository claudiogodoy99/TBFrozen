namespace FrozenWeb.Application.ViewModel
{
    public class MotoristaViewModel : ViewModelBase
    {
        public string cnh { get; set; }
        public string nome { get; set; }
        public string empresaCnpj { get; set; }

        public virtual EmpresaViewModel empresa { get; set; }
    }
}