'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../services/api';
import { saveToken } from '../utils/auth';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post('/api/usuario/login', {
        email,
        senha,
      });

      const token = response.data;
      saveToken(token);
      router.push('/'); // Redireciona para a home
    } catch (err: any) {
      setError(err.response?.data?.mensagem || 'Erro ao fazer login');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 10 }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: 8 }}
            required
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{ width: '100%', padding: 8 }}
            required
          />
        </div>

        {error && (
          <p style={{ color: 'red', marginBottom: 10 }}>{error}</p>
        )}

        <button type="submit" style={{ padding: 10, width: '100%' }}>
          Entrar
        </button>
      </form>
    </div>
  );
}