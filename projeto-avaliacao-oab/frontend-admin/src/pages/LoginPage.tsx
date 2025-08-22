// frontend-admin/src/pages/LoginPage.tsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/api/login', { password });
      if (response.data.success) {
        localStorage.setItem('authToken', response.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Senha incorreta. Tente novamente.');
    }
  };

  return (
    <StyledContainer>
      <StyledLoginForm onSubmit={handleLogin}>
        <img src="/oab-ma-logo.png" alt="OAB Logo" className="logo" />
        <h2>Acesso ao Dashboard</h2>
        <p>Esta área é restrita.</p>
        
        <StyledInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          autoFocus
        />
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <StyledButton type="submit">
          <div className="user-profile-inner">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g data-name="Layer 2" id="Layer_2">
                <path d="m15.626 11.769a6 6 0 1 0 -7.252 0 9.008 9.008 0 0 0 -5.374 8.231 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 9.008 9.008 0 0 0 -5.374-8.231zm-7.626-4.769a4 4 0 1 1 4 4 4 4 0 0 1 -4-4zm10 14h-12a1 1 0 0 1 -1-1 7 7 0 0 1 14 0 1 1 0 0 1 -1 1z" />
              </g>
            </svg>
            <p style={{ margin: 0 }}>Entrar</p>
          </div>
        </StyledButton>
      </StyledLoginForm>
    </StyledContainer>
  );
};

// --- ESTILOS ---

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box; /* <-- MUDANÇA AQUI */
`;

const StyledLoginForm = styled.form`
  max-width: 450px;
  width: 100%;
  padding: 40px;
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  text-align: center;
  color: #e0e0e0;

  .logo { max-width: 120px; margin-bottom: 20px; }
  p { color: #8b949e; }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  margin: 25px 0;
  border: 1px solid #30363d;
  background-color: #0d1117;
  color: #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  &:focus { outline: none; border-color: #2f81f7; box-shadow: 0 0 0 3px rgba(47, 129, 247, 0.2); }
`;

const ErrorMessage = styled.p`
  color: #f85149;
  margin-top: -15px;
  margin-bottom: 20px;
`;

const StyledButton = styled.button`
  width: 131px; height: 51px; border-radius: 15px; cursor: pointer;
  transition: 0.3s ease;
  background: linear-gradient(to bottom right, #2e8eff 0%, rgba(46, 142, 255, 0) 30%);
  background-color: rgba(46, 142, 255, 0.2);
  display: flex; align-items: center; justify-content: center;
  border: none; padding: 0; margin: 0 auto;

  &:hover, &:focus { background-color: rgba(46, 142, 255, 0.7); box-shadow: 0 0 10px rgba(46, 142, 255, 0.5); outline: none; }

  .user-profile-inner {
    width: 127px; height: 47px; border-radius: 13px; background-color: #1a1a1a;
    display: flex; align-items: center; justify-content: center;
    gap: 15px; color: #fff; font-weight: 600;
  }
  .user-profile-inner svg { width: 27px; height: 27px; fill: #fff; }
`;

export default LoginPage;