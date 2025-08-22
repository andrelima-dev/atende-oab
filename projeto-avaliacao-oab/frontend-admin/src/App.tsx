import LoginPage from './pages/LoginPage';
import './App.css';
import './pages/LoginPage.css'; // ADICIONE ESTA LINHA PARA IMPORTAR O CSS

function App() {
  // O App agora só mostra a página de login,
  // que por sua vez cuida do redirecionamento.
  return (
    <div className="App">
      <LoginPage />
    </div>
  );
}

export default App;
