'use client';

import { useState } from 'react';
import api from '../services/api';

interface Props {
  itemId: number;
  onComentarioEnviado: () => void;
}

export default function ComentarioForm({ itemId, onComentarioEnviado }: Props) {
  const [texto, setTexto] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post('/api/comentario/cadastrar', {
        texto,
        itemId,
      });
      setTexto('');
      onComentarioEnviado();
    } catch (err: any) {
      setError('Erro ao enviar o comentário.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Digite seu comentário..."
        style={{ width: '100%', height: '80px', marginBottom: 10 }}
        required
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Enviar</button>
    </form>
  );
}
