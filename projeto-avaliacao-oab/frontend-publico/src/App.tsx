import React from 'react';
import AvaliacaoSetores from './components/AvaliacaoSetores';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <div className="app-container">
          <div className="header-content">
            <div className="logo-container">
              <div className="logo">
                <img 
                  src="/oab-logo.png" 
                  alt="Logo OAB/MA" 
                  className="logo-image"
                  onError={(e) => {
                    // Fallback se a imagem não carregar
                    e.currentTarget.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.innerHTML = `
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="#0d3c84" />
                        <circle cx="50" cy="50" r="35" fill="#e6af17" />
                        <text x="50" y="55" textAnchor="middle" fill="#0d3c84" fontSize="30" fontWeight="bold">OAB</text>
                      </svg>
                    `;
                    e.currentTarget.parentNode?.appendChild(fallback);
                  }}
                />
              </div>
              <div className="logo-text">
                <h1>Sistema de Avaliação</h1>
                <p>OAB/MA - Seccional Maranhão</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="app-main">
        <div className="app-container">
          <AvaliacaoSetores />
        </div>
      </main>
      
      <footer className="app-footer">
        <div className="app-container">
          <p>© 2025 - Ordem dos Advogados do Brasil -  Gerência de Tecnologia da Informação</p>
          <div className="footer-links">
            <a href="https://www.oabma.org.br" target="_blank" rel="noopener noreferrer">Site Oficial</a>
            <a href="https://pje.oabma.org.br/" target="_blank" rel="noopener noreferrer">Pje OAB</a> 
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;