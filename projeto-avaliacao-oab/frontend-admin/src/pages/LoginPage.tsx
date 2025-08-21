// frontend/src/pages/LoginPage.tsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Importa o CSS para estilizar

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(''); // Limpa erros antigos

    try {
      // Envia a senha para o endpoint de login no backend
      const response = await axios.post('http://localhost:3001/api/login', {
        password: password,
      });

      // Se o backend retornou sucesso (senha correta)...
      if (response.data.success) {
        // ...pegamos o token...
        const token = response.data.token;
        // ...e guardamos no localStorage do navegador.
        localStorage.setItem('authToken', token);
        // E finalmente, navegamos para a página do dashboard.
        navigate('/dashboard');
      }
    } catch (err: any) {
      // Se a senha estiver errada, o backend retorna um erro.
      console.error("Erro no login:", err);
      setError('Senha incorreta. Tente novamente.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <img src="/oab-logo.png" alt="OAB Logo" className="logo" />
        <h2>Acesso ao Dashboard</h2>
        <p>Esta área é restrita. Por favor, insira a senha.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          className="password-input"
          autoFocus
        />
        
        {error && <p className="error-message">{error}</p>}
        
        <button type="submit" className="submit-btn">Entrar</button>
      </form>
    </div>
  );
};

export default LoginPage;