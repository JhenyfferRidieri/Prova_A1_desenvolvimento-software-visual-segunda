'use client';
import { useRouter } from 'next/navigation';

export default function NavigationButtons() {
  const router = useRouter();

  return (
    <div style={{ marginBottom: 20 }}>
      <button
        onClick={() => router.push('/')}
        style={{ marginRight: 10, padding: 8 }}
      >
        Ir para Lista de Itens
      </button>

      <button
        onClick={() => router.push('/login')}
        style={{ marginRight: 10, padding: 8 }}
      >
        Ir para Login
      </button>

      <button
        onClick={() => router.push('/itens/1')}
        style={{ padding: 8 }}
      >
        Ir para Detalhes do Item (Exemplo ID 1)
      </button>
    </div>
  );
}