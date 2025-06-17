'use client';

import { useEffect, useState } from 'react';
import api from '../services/api';
import { Item } from '../types/interfaces';
import ItemCard from '../Components/ItemCard';
import NavigationButtons from '../Components/NavigationButtons';
import { useRouter } from 'next/navigation';
import { getToken } from '../utils/auth';

export default function HomePage() {
  const [itens, setItens] = useState<Item[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push('/login');
      return;
    }

    async function fetchItens() {
      try {
        const response = await api.get('/api/item/listar');
        setItens(response.data);
      } catch (err: any) {
        if (err.response?.status === 401) {
          router.push('/login');
        } else {
          setError('Erro ao carregar os itens.');
        }
      }
    }

    fetchItens();
  }, [router]);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
      <NavigationButtons />

      <h2>Lista de Itens</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {itens.length === 0 && !error && <p>Nenhum item encontrado.</p>}

      {itens.map((item) => (
        <ItemCard key={item.itemId} item={item} />
      ))}
    </div>
  );
}