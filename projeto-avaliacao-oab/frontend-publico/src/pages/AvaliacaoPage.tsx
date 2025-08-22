// frontend-publico/src/pages/AvaliacaoPage.tsx
import { useState, useEffect } from 'react';
import StarRating from '../components/StarRating';
import 'bootstrap/dist/css/bootstrap.min.css'; // Usamos o Bootstrap para o grid (row/col)
import './AvaliacaoPage.css'; // Importa nosso novo estilo

const AvaliacaoPage = () => {
  const [nome, setNome] = useState("");
  const [oab, setOab] = useState("");
  const [numeroProcesso, setNumeroProcesso] = useState('Carregando...');
  const [atendimento, setAtendimento] = useState(0);
  const [clareza, setClareza] = useState(0);
  const [agilidade, setAgilidade] = useState(0);
  const [comentario, setComentario] = useState("");
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const processo = params.get('processo');
    setNumeroProcesso(processo || "Não aplicável");
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    // ... a lógica do handleSubmit continua exatamente a mesma ...
    event.preventDefault();
    setMensagem({ tipo: '', texto: '' });
    if (!nome || !oab) { /* ... */ return; }
    if (atendimento === 0 || clareza === 0 || agilidade === 0) { /* ... */ return; }
    const avaliacao = { nome, oab, processo: numeroProcesso, notas: { suporte_tecnico: atendimento, clareza_resolucao: clareza, agilidade_atendimento: agilidade }, comentario };
    const GOOGLE_SCRIPT_URL = 'SUA_URL_DO_GOOGLE_SCRIPT_AQUI';
    try {
      setMensagem({ tipo: 'info', texto: 'Enviando...' });
      await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(avaliacao) });
      setMensagem({ tipo: 'success', texto: 'Obrigado! Sua avaliação foi registrada.' });
      setNome(''); setOab('');
    } catch (error) {
      setMensagem({ tipo: 'danger', texto: 'Ocorreu um erro ao enviar.' });
    }
  };

  return (
    <div className="avaliacao-container">
      <div className="card-avaliacao">
        <div className="card-body">
          <div className="form-header">
            <img src="/oab-logo.png" alt="OAB Logo" className="logo" />
            <h1 className="h3 mt-3">Avaliação de Atendimento</h1>
            <p className="text-muted mt-3">Processo N°: <strong>{numeroProcesso}</strong></p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-8 mb-3">
                <label htmlFor="nome" className="form-label">Nome Completo</label>
                <input type="text" id="nome" className="form-control form-input" value={nome} onChange={(e) => setNome(e.target.value)} required />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="oab" className="form-label">N° OAB</label>
                <input type="text" id="oab" className="form-control form-input" value={oab} onChange={(e) => setOab(e.target.value)} required />
              </div>
            </div>
            <hr className="my-4" style={{borderColor: '#555'}} />
            
            <div className="mb-4 text-center">
              <label className="form-label h5">Suporte técnico prestado</label>
              <StarRating onRatingChange={setAtendimento} />
            </div>
            <div className="mb-4 text-center">
              <label className="form-label h5">Clareza na resolução do problema</label>
              <StarRating onRatingChange={setClareza} />
            </div>
            <div className="mb-4 text-center">
              <label className="form-label h5">Agilidade no atendimento do chamado</label>
              <StarRating onRatingChange={setAgilidade} />
            </div>
            <div className="mb-4">
              <label htmlFor="comentario" className="form-label">Comentários (opcional)</label>
              <textarea id="comentario" rows={4} className="form-control form-input" value={comentario} onChange={(e) => setComentario(e.target.value)} placeholder="Deixe sua sugestão ou elogio..."></textarea>
            </div>
            
            {mensagem.texto && (<div className={`alert alert-${mensagem.tipo} mt-4`}>{mensagem.texto}</div>)}

            <div className="d-grid">
              <button type="submit" className="btn btn-submit text-white">Enviar Avaliação</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AvaliacaoPage;