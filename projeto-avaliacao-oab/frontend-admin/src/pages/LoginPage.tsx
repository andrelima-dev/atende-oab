import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom'; // 1. IMPORTADO O NAVIGATE
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate(); // 2. INICIADO O NAVIGATE
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/api/admin/login', {
        password,
      });

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        navigate('/dashboard'); // 3. ALTERADO PARA USAR O NAVIGATE
      } else {
        setError('Resposta inválida do servidor.');
      }

    } catch (err) {
      const error = err as AxiosError;
      console.error('Falha no login:', error);

      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          setError('Senha incorreta. Tente novamente.');
        } else if (error.response.status === 404) {
          setError('Erro: Servidor não encontrado (404).');
        } else {
          setError('Ocorreu um erro no servidor. Tente mais tarde.');
        }
      } else if (error.request) {
        setError('Não foi possível conectar ao servidor. Verifique sua conexão.');
      } else {
        setError('Ocorreu um erro inesperado.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-box">
        <img src="/oab-logo.png" alt="Logo" className="login-logo" />
        <h2>Acesso ao Dashboard</h2>
        <p className="subtitle">Esta área é restrita.</p>
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              required
              disabled={isLoading}
            />
          </div>
          
          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;