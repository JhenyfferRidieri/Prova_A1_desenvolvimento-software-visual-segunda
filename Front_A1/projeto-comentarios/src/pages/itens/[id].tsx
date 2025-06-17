'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '../../services/api';
import { Item, Comentario } from '../../types/interfaces';
import ComentarioList from '../../Components/ComentarioList';
import ComentarioForm from '../../Components/ComentarioForm';
import NavigationButtons from '../../Components/NavigationButtons';

export default function ItemDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [item, setItem] = useState<Item | null>(null);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [error, setError] = useState('');
  const itemId = params?.id;

  if (!itemId) {
    return <p>Item inválido.</p>;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        // detalhes do item
        const itemResponse = await api.get(`/api/item/${itemId}`);
        setItem(itemResponse.data);

        // comentários do item
        const comentariosResponse = await api.get(`/api/comentario/listar/${itemId}`);
        setComentarios(comentariosResponse.data);
      } catch (err: any) {
        if (err.response?.status === 401) {
          router.push('/login');
        } else {
          setError('Erro ao carregar os dados do item.');
        }
      }
    }

    fetchData();
  }, [itemId, router]);

  const handleComentarioEnviado = () => {
    // comentários após envio
    api.get(`/api/comentario/listar/${itemId}`)
      .then(res => setComentarios(res.data));
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!item) return <p>Carregando...</p>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
      <NavigationButtons />

      <h2>{item.nome}</h2>
      <p>Categoria: {item.categoria?.nome}</p>

      <h3>Comentários</h3>
      <ComentarioList comentarios={comentarios} onAtualizar={handleComentarioEnviado} />

      <h3>Adicionar Comentário</h3>
      <ComentarioForm itemId={Number(itemId)} onComentarioEnviado={handleComentarioEnviado} />
    </div>
  );
}