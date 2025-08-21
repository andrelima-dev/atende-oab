// frontend-admin/src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const token = localStorage.getItem('authToken');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  return (
    <div className="app-layout">
      {/* A barra lateral continua igual */}
      {token && (
        <aside className="sidebar">
          <img src="/oab-ma-logo.png" alt="OAB Maranhão Logo" className="sidebar-logo" />
          <nav className="sidebar-nav">
            <a href="/dashboard" className="nav-link active">Dashboard</a>
          </nav>
        </aside>
      )}

      {/* O conteúdo principal agora tem um cabeçalho e a área de conteúdo */}
      <div className="content-wrapper">
        {token && (
          <header className="main-header">
            {/* Espaço para futuras funcionalidades como busca ou perfil */}
            <div className="header-actions">
              <button onClick={handleLogout} className="logout-button">Sair</button>
            </div>
          </header>
        )}
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
            <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App;