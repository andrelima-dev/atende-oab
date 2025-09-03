import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App.tsx';
import './index.css'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- PASSO 2: "ABRAÇAR" O APP */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);