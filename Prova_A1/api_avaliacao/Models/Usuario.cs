using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api_avaliacao.Models
{
    public class Usuario
    {
        public int UsuarioId { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;
        public DateTime CriadoEm { get; set; } = DateTime.Now;
    }
}