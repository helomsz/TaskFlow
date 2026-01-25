import { useState } from 'react';
import api from '../api/api';
import '../styles/register.css';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/auth/register', {
        name,
        email,
        password
      });

      navigate('/login');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Erro ao criar conta'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="registerContainer">
      <form className="registerCard glass" onSubmit={handleSubmit}>
        <h1>Criar conta</h1>
        <p>Comece a organizar suas tarefas.</p>

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {error && <span className="error">{error}</span>}

        <button type="submit" disabled={loading}>
          {loading ? 'Criando...' : 'Criar conta'}
        </button>

        <span className="link">
          Já tem conta? <Link to="/login">Entrar</Link>
        </span>
      </form>
    </div>
  );
}
