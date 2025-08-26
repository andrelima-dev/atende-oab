import React, { useState, useEffect } from 'react';
import './AvaliacaoSetores.css';

interface Setor {
  id: string;
  name: string;
  icon: string;
}

const AvaliacaoSetores: React.FC = () => {
  const [nome, setNome] = useState('');
  const [oabNumber, setOabNumber] = useState('');
  const [setorSelecionado, setSetorSelecionado] = useState('financeiro');
  const [avaliacoes, setAvaliacoes] = useState<Record<string, number>>({});
  const [comentarios, setComentarios] = useState('');
  const [progresso, setProgresso] = useState(0);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  const setores: Setor[] = [
    { id: 'financeiro', name: 'Financeiro / Tesouraria', icon: 'bi-wallet2' },
    { id: 'ti', name: 'Tecnologia da Informação', icon: 'bi-laptop' },
    { id: 'ted', name: 'TED', icon: 'bi-shield-check' },
    { id: 'esa', name: 'ESA/MA', icon: 'bi-book' }
  ];

  const categoriasAvaliacao = [
    'Suporte prestado – O setor atende às demandas de forma satisfatória?',
    'Clareza na resolução do problema – As respostas foram claras, completas e compreensíveis?',
    'Agilidade / Tempo de resposta – O setor responde rapidamente às solicitações?',
    'Cordialidade / Atendimento – O trato com o usuário é respeitoso e profissional?',
    'Eficiência / Resultado final – O problema ou solicitação foi realmente resolvido?'
  ];

  useEffect(() => {
    let progressoCalculado = 0;
    if (nome) progressoCalculado += 20;
    if (oabNumber) progressoCalculado += 20;
    if (Object.keys(avaliacoes).length === categoriasAvaliacao.length) progressoCalculado += 40;
    if (comentarios) progressoCalculado += 20;
    
    setProgresso(progressoCalculado);
  }, [nome, oabNumber, avaliacoes, comentarios, categoriasAvaliacao.length]);

  const handleAvaliacaoChange = (categoria: string, valor: number) => {
    setAvaliacoes(prev => ({ ...prev, [categoria]: valor }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome || !oabNumber || Object.keys(avaliacoes).length !== categoriasAvaliacao.length) {
      alert('Por favor, preencha todos os campos obrigatórios antes de enviar.');
      return;
    }
    
    // Simular envio
    setMostrarConfirmacao(true);
    
    // Aqui você faria a chamada API para seu backend
    console.log('Dados da avaliação:', {
      nome,
      oabNumber,
      setor: setorSelecionado,
      ratings: avaliacoes,
      comentarios
    });
    
    // Limpar formulário após 3 segundos
    setTimeout(() => {
      setNome('');
      setOabNumber('');
      setAvaliacoes({});
      setComentarios('');
      setMostrarConfirmacao(false);
    }, 3000);
  };

  // Componente de Estrelas simplificado e funcional
  const StarRating: React.FC<{ 
    categoria: string;
    value: number;
    onChange: (categoria: string, value: number) => void;
  }> = ({ categoria, value, onChange }) => {
    const [hoverValue, setHoverValue] = useState(0);
    
    return (
      <div className="rating-category">
        <div className="rating-title">{categoria}</div>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= (hoverValue || value) ? 'active' : ''}`}
              onClick={() => onChange(categoria, star)}
              onMouseEnter={() => setHoverValue(star)}
              onMouseLeave={() => setHoverValue(0)}
            >
              <i className={`bi bi-star${star <= (hoverValue || value) ? '-fill' : ''}`} />
            </span>
          ))}
        </div>
        <div className="rating-text">
          <span>1 estrela: Muito insatisfatório</span>
          <span>5 estrelas: Excelente</span>
        </div>
      </div>
    );
  };

  return (
    <div className="avaliacao-container">
      {/* Overlay e Modal de Confirmação */}
      {mostrarConfirmacao && (
        <div className="confirmation-overlay">
          <div className="confirmation-modal">
            <div className="confirmation-content">
              <i className="bi bi-check-circle-fill confirmation-icon"></i>
              <h3>Avaliação enviada com sucesso!</h3>
              <p>Obrigado por seu feedback.</p>
              <button 
                className="btn btn-primary confirmation-btn"
                onClick={() => setMostrarConfirmacao(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="card">
        <div className="card-header">Identificação do Advogado</div>
        <div className="card-body">
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progresso}%` }}></div>
          </div>
          
          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <label htmlFor="nome" className="form-label">Nome Completo *</label>
              <input
                type="text"
                className="form-control"
                id="nome"
                placeholder="Digite seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="oab" className="form-label">Número da OAB *</label>
              <input
                type="text"
                className="form-control"
                id="oab"
                placeholder="Ex: 12345/MA"
                value={oabNumber}
                onChange={(e) => setOabNumber(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="form-label">Selecione o setor para avaliação:</label>
            <div className="sector-selector">
              {setores.map(setor => (
                <div
                  key={setor.id}
                  className={`sector-btn ${setorSelecionado === setor.id ? 'active' : ''}`}
                  onClick={() => setSetorSelecionado(setor.id)}
                >
                  <i className={`bi ${setor.icon} sector-icon`}></i>
                  <span>{setor.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card evaluation-card">
        <div className="card-header">
          Avaliação do Setor: <span className="sector-name">
            {setores.find(s => s.id === setorSelecionado)?.name}
          </span>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {categoriasAvaliacao.map(categoria => (
              <StarRating
                key={categoria}
                categoria={categoria}
                value={avaliacoes[categoria] || 0}
                onChange={handleAvaliacaoChange}
              />
            ))}
            
            <div className="mb-4">
              <label htmlFor="comentarios" className="form-label">Comentários adicionais (opcional)</label>
              <textarea
                className="form-control"
                id="comentarios"
                rows={4}
                placeholder="Deixe aqui seus comentários, sugestões ou observações sobre o atendimento"
                value={comentarios}
                onChange={(e) => setComentarios(e.target.value)}
              ></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary btn-submit">
              <i className="bi bi-send-fill me-2"></i> Enviar Avaliação
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AvaliacaoSetores;