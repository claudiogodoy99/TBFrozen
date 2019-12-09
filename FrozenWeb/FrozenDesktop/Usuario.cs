using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace FrozenDesktop
{
    public partial class Usuario : Form
    {
        public Usuario()
        {
            InitializeComponent();
        }

        private void Usuario_Load(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            List<object> list = new List<object>();
            list.Add(new { nome = "123", empresa = "123456",email="123@hotmail.com",senha="*****", telefone = "983606866",endereco="rua teste numero teste"  });
            this.dataGridView1.DataSource = list;
        }
    }
}
