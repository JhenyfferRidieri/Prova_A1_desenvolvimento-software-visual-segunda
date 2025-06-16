import api from '../services/api';
import { Comentario } from '../types/interfaces';

interface Props {
  comentarios: Comentario[];
  onAtualizar: () => void;
}

export default function ComentarioList({ comentarios, onAtualizar }: Props) {
  const handleExcluir = async (id: number) => {
    try {
      await api.delete(`/api/comentario/deletar/${id}`);
      onAtualizar();
    } catch (error) {
      alert('Erro ao excluir comentário.');
    }
  };

  if (comentarios.length === 0) return <p>Nenhum comentário ainda.</p>;

  return (
    <ul>
      {comentarios.map((comentario) => (
        <li key={comentario.comentarioId} style={{ marginBottom: 10 }}>
          <p><strong>{comentario.usuario.email}</strong> - {new Date(comentario.criadoEm).toLocaleString()}</p>
          <p>{comentario.texto}</p>
          <button onClick={() => handleExcluir(comentario.comentarioId)}>
            Excluir
          </button>
        </li>
      ))}
    </ul>
  );
}