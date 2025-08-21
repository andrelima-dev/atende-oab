// frontend-admin/src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom' // <-- Importei o roteador

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Envolvemos o App com o BrowserRouter para ligar as rotas */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)