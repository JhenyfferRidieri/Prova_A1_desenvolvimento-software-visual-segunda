using api_avaliacao.Data.Interfaces;
using api_avaliacao.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace api_avaliacao.Controllers
{
    [ApiController]
    [Route("api/comentario")]
    [Authorize]
    public class ComentarioController : ControllerBase
    {
        private readonly IComentarioRepository _comentarioRepository;
        private readonly IUsuarioRepository _usuarioRepository;

        public ComentarioController(IComentarioRepository comentarioRepository, IUsuarioRepository usuarioRepository)
        {
            _comentarioRepository = comentarioRepository;
            _usuarioRepository = usuarioRepository;
        }

        [HttpGet("listar/{itemId}")]
        public IActionResult ListarPorItem(int itemId)
        {
            var comentarios = _comentarioRepository.ListarPorItemId(itemId);
            return Ok(comentarios);
        }

        [HttpPost("cadastrar")]
        public IActionResult Cadastrar([FromBody] Comentario comentario)
        {
            string emailUsuario = User.Identity?.Name!;
            var usuario = _usuarioRepository.BuscarUsuarioPorEmail(emailUsuario);
            if (usuario == null)
                return Unauthorized();

            comentario.UsuarioId = usuario.UsuarioId;
            comentario.CriadoEm = DateTime.Now;

            _comentarioRepository.Cadastrar(comentario);
            return Created("", comentario);
        }

        [HttpDelete("deletar/{id}")]
        public IActionResult Deletar(int id)
        {
            var comentario = _comentarioRepository.BuscarPorId(id);
            if (comentario == null)
                return NotFound();

            string emailUsuario = User.Identity?.Name!;
            if (comentario.Usuario?.Email != emailUsuario)
                return Forbid();

            _comentarioRepository.Deletar(id);
            return NoContent();
        }
    }
}