using api_avaliacao.Data.Interfaces;
using api_avaliacao.Models;
using Microsoft.EntityFrameworkCore;

namespace api_avaliacao.Data
{
    public class ComentarioRepository : IComentarioRepository
    {
        private readonly AppDataContext _context;

        public ComentarioRepository(AppDataContext context)
        {
            _context = context;
        }

        public void Cadastrar(Comentario comentario)
        {
            _context.Comentarios.Add(comentario);
            _context.SaveChanges();
        }

        public List<Comentario> ListarPorItemId(int itemId)
        {
            return _context.Comentarios
                .Include(c => c.Usuario)
                .Where(c => c.ItemId == itemId)
                .ToList();
        }

        public Comentario? BuscarPorId(int id)
        {
            return _context.Comentarios.Include(c => c.Usuario).FirstOrDefault(c => c.ComentarioId == id);
        }

        public void Deletar(int id)
        {
            var comentario = _context.Comentarios.Find(id);
            if (comentario != null)
            {
                _context.Comentarios.Remove(comentario);
                _context.SaveChanges();
            }
        }
    }
}