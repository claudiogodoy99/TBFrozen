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
    public partial class Empresa : Form
    {
        public Empresa()
        {
            InitializeComponent();
        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            var list = new List<EmpresaObj>();
            list.Add(new EmpresaObj { CNPJ = "123456", DESCRICAO = "empresa teste" });

            this.dataGridView1.DataSource = list;
            
        }

        public class EmpresaObj
        {
            public string CNPJ { get; set; }
            public string DESCRICAO { get; set; }
        }
    }
}
