// frontend-publico/src/pages/AvaliacaoPage.tsx
import { useState, useEffect } from 'react';
import StarRating from '../components/StarRating';
import axios from 'axios';
// Opcional: importe o App.css se seus estilos de header/footer estiverem lá.
// import '../App.css';

const setores = ["Financeiro / Tesouraria", "Tecnologia da Informação", "TED", "ESA/MA"];

const AvaliacaoPage = () => {
  const [nome, setNome] = useState("");
  const [oab, setOab] = useState("");
  const [setorSelecionado, setSetorSelecionado] = useState("Tecnologia da Informação");
  const [numeroProcesso, setNumeroProcesso] = useState("Não aplicável");
  const [notaSuporte, setNotaSuporte] = useState(0);
  const [notaClareza, setNotaClareza] = useState(0);
  const [notaAgilidade, setNotaAgilidade] = useState(0);
  const [notaCordialidade, setNotaCordialidade] = useState(0);
  const [notaEficiencia, setNotaEficiencia] = useState(0);
  const [comentario, setComentario] = useState("");
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
  
  // A lógica do useEffect e do handleSubmit continua a mesma.
  // ...

  return (
    // Não precisamos mais do container-fluid ou outras classes do Bootstrap aqui.
    // O estilo virá do App.css ou de um CSS específico.
    <div>
        <div className="form-section">
            <h2 className="section-title">Identificação do Advogado</h2>
            <div className="input-group">
                <div className="input-field">
                    <label htmlFor="nome">Nome Completo *</label>
                    <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required placeholder="Digite seu nome completo" />
                </div>
                <div className="input-field">
                    <label htmlFor="oab">Número da OAB *</label>
                    <input type="text" id="oab" value={oab} onChange={(e) => setOab(e.target.value)} required placeholder="Ex: 12345/MA" />
                </div>
            </div>
            
            <h3 className="section-subtitle">Selecione o setor para avaliação</h3>
            <div className="setor-selection">
                {setores.map(setor => (
                    <button 
                        key={setor} 
                        type="button" 
                        className={`setor-btn ${setorSelecionado === setor ? 'active' : ''}`}
                        onClick={() => setSetorSelecionado(setor)}
                    >
                        {/* Adicionar SVGs aqui depois, se quiser */}
                        <span>{setor}</span>
                    </button>
                ))}
            </div>
        </div>

        <div className="form-section">
            <h2 className="section-title">Avaliação do Setor: {setorSelecionado}</h2>
            
            <div className="rating-group">
                <label>Suporte prestado - O setor atende às demandas de forma satisfatória?</label>
                <StarRating onRatingChange={setNotaSuporte} />
            </div>
            <div className="rating-group">
                <label>Clareza na resolução do problema - As respostas foram claras, completas e compreensíveis?</label>
                <StarRating onRatingChange={setNotaClareza} />
            </div>
            <div className="rating-group">
                <label>Agilidade da resposta - O setor responde rapidamente às solicitações?</label>
                <StarRating onRatingChange={setNotaAgilidade} />
            </div>
             <div className="rating-group">
                <label>Cordialidade / Atendimento - O trato com o usuário é respeitoso e profissional?</label>
                <StarRating onRatingChange={setNotaCordialidade} />
            </div>
             <div className="rating-group">
                <label>Eficiência / Resultado final - O problema foi efetivamente resolvido?</label>
                <StarRating onRatingChange={setNotaEficiencia} />
            </div>

            <div className="textarea-field">
                <label htmlFor="comentario">Comentários adicionais (opcional)</label>
                <textarea id="comentario" rows={5} value={comentario} onChange={(e) => setComentario(e.target.value)}></textarea>
            </div>
        </div>

        {mensagem.texto && (
            <div className={`alert alert-${mensagem.tipo}`}>
                {mensagem.texto}
            </div>
        )}

        <div className="submit-container">
            <button type="submit" className="submit-button">Enviar Avaliação</button>
        </div>
    </div>
  );
};

export default AvaliacaoPage;