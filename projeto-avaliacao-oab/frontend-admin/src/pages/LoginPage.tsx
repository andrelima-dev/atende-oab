import { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); 

    try {
      
      const response = await axios.post('http://localhost:3334/login', {
        password,
      });
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        window.location.href = '/dashboard.html';
      } else {
        setError('Resposta inválida do servidor.');
      }

    } catch (err) {
      console.error('Falha no login:', err);
      setError('Senha incorreta. Tente novamente.');
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
            />
          </div>
          
          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
