// src/App.tsx (Versão atualizada e mais limpa)

import { Routes, Route } from 'react-router-dom';
import FormularioPublico from './pages/FormularioPublico';
import AdminDashboard from './admin/Dashboard'; // <-- IMPORTANDO DO NOVO ARQUIVO

function App() {
  return (
    <Routes>
      <Route path="/" element={<FormularioPublico />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;