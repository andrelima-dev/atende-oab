// frontend/src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Pega o token de autenticação guardado no "porta-luvas" do navegador.
  const token = localStorage.getItem('authToken');

  // Se o token existe, o usuário está "logado".
  // O <Outlet /> representa a página que está sendo protegida (no nosso caso, o Dashboard).
  // Então, se o usuário pode entrar, a gente mostra a página.
  if (token) {
    return <Outlet />;
  }

  // Se não existe token, o usuário não pode entrar.
  // A gente redireciona ele forçadamente para a página de login.
  return <Navigate to="/login" />;
};

export default ProtectedRoute;