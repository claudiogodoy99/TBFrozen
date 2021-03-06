﻿using System.Collections.Generic;

namespace FrozenWeb.Application.ViewModel
{
    public class EmpresaViewModel : ViewModelBase
    {
        public EmpresaViewModel()
        {
            motoristas = new HashSet<MotoristaViewModel>();
            usuarios = new HashSet<UsuarioViewModel>();
            viagens = new HashSet<ViagemViewModel>();
        }

        public string cnpj { get; set; }
        public string descricao { get; set; }

        public virtual ICollection<MotoristaViewModel> motoristas { get; set; }
        public virtual ICollection<UsuarioViewModel> usuarios { get; set; }
        public virtual ICollection<ViagemViewModel> viagens { get; set; }
    }
}
