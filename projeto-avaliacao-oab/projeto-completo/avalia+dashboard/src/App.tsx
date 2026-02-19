import { Routes, Route } from 'react-router-dom';
import FormularioPublico from './pages/FormularioPublico';
import Login from './pages/Login';
import Dashboard from './dashboard/App';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<FormularioPublico />} />
      <Route path="/login" element={<Login />} />
      
      {/* Rota protegida do dashboard */}
      <Route 
        path="/admin/*" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
}

export default App;