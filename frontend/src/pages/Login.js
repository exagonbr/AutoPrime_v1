import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError('Por favor, insira usuário e senha.');
      return;
    }

    setLoading(true);
    try {
      const result = await login(username, password);
      if (result.success) {
<<<<<<< HEAD
        if (result.role === 'master') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
=======
        navigate('/');
>>>>>>> b4c6797 (Authentication)
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Erro ao tentar fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <video className="login-video" autoPlay muted loop playsInline>
        <source src="/assets/video/hero-bg-video.mp4" type="video/mp4" />
      </video>
      <div className="login-overlay"></div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login Profissional</h2>
        {error && <div className="error-message">{error}</div>}
        <label htmlFor="username">Usuário</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

export default Login;
