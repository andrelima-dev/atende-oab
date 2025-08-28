// frontend-publico/src/App.tsx
import AvaliacaoPage from './pages/AvaliacaoPage';
import './App.css';

function App() {

  const rolarParaTopo = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="app-geral">
      <header className="cabecalho-app">
        <div className="cabecalho-container">
          <div className="area-logo">
            <img src="/logo-oabma.png" alt="OAB Maranhão Logo" className="logo-cabecalho" />
            <div className="texto-logo">
              <h1>Sistema de Avaliação</h1>
              <p>OAB/MA - Seccional Maranhão</p>
            </div>
          </div>
        </div>
      </header>
      
      <main className="conteudo-principal">
        <AvaliacaoPage />
      </main>

      <footer className="rodape-app">
        <div className="rodape-container">
          <div className="rodape-superior">
            <div className="rodape-secao secao-logo-social">
              <img src="/logo-oabma.png" alt="OAB Maranhão Forte" className="logo-rodape" />
              <div className="icones-sociais">
                <a href="https://www.instagram.com/oabma/" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="https://x.com/oab_ma" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                <a href="https://www.youtube.com/@oabma" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                <a href="https://www.facebook.com/OABMA/?locale=pt_BR" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              </div>
            </div>
            <div className="rodape-secao links-rodape">
              <a href="https://pje.oabma.org.br/"><i className="fas fa-gavel"></i> pje OAB</a>
              <a href="https://pje.oabma.org.br/inss-digital"><i className="fas fa-file-alt"></i> Inss Digital</a>
              <a href="https://pje.oabma.org.br/zone-criminal"><i className="fas fa-balance-scale"></i> Zona Criminal</a>
              <a href="https://pje.oabma.org.br/portal-advocacia"><i className="fas fa-user-shield"></i> Portal Advocacia</a>
              <a href="https://pje.oabma.org.br/status-services"><i className="fas fa-concierge-bell"></i> Status Serviços</a>
            </div>
          </div>
          <div className="rodape-inferior">
            <p>© 2025 - Gerência de Tecnologia da Informação</p>
            <button onClick={rolarParaTopo} className="botao-voltar-topo" aria-label="Voltar ao topo">
              <i className="fas fa-arrow-up"></i>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
