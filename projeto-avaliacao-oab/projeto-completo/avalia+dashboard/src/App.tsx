import { Routes, Route } from 'react-router-dom';
import FormularioPublico from './pages/FormularioPublico';
import Dashboard from './dashboard/App'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<FormularioPublico />} />
      
      
      <Route path="/admin/*" element={<Dashboard />} />
      
    </Routes>
  );
}

export default App;