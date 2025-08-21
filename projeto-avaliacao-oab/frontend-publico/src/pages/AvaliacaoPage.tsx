// frontend/src/pages/AvaliacaoPage.tsx

import { useState, useEffect } from 'react';
import StarRating from '../components/StarRating';
import './AvaliacaoPage.css';

const AvaliacaoPage = () => {
  // Estados para guardar os valores de cada avaliação
  const [numeroProcesso, setNumeroProcesso] = useState('Carregando...');
  const [atendimento, setAtendimento] = useState(0);
  const [clareza, setClareza] = useState(0);
  const [agilidade, setAgilidade] = useState(0);
  const [comentario, setComentario] = useState("");

  // Efeito para ler o número do processo da URL quando a página carrega
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const processo = params.get('processo');
    setNumeroProcesso(processo || "Processo não identificado");
  }, []);

  // Função que será chamada ao clicar no botão "Enviar" (VERSÃO DE TESTE)
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("1. Botão 'Enviar' clicado. Iniciando handleSubmit.");

    // Ajuste no label das categorias para o setor de Informática
    if (atendimento === 0 || clareza === 0 || agilidade === 0) {
      alert("Por favor, preencha a nota para todas as categorias.");
      console.log("2. Validação falhou. Faltam notas.");
      return;
    }
    
    console.log("2. Validação passou. Todas as notas foram preenchidas.");

    const avaliacao = {
      processo: numeroProcesso,
      notas: {
        suporte_tecnico: atendimento,
        clareza_resolucao: clareza,
        agilidade_atendimento: agilidade,
      },
      comentario,
    };

    console.log("3. Objeto de avaliação criado:", avaliacao);
    console.log("4. Tentando enviar para o backend em http://localhost:3001/api/avaliacoes...");

    try {
      const response = await fetch('http://localhost:3001/api/avaliacoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(avaliacao),
      });

      console.log("5. 'fetch' completado. Resposta do servidor recebida.", response);

      if (!response.ok) {
        // Se a resposta não for de sucesso (ex: 404, 500)
        console.error("6. Erro na resposta do servidor. Status:", response.status);
        throw new Error('Falha ao enviar avaliação. Status: ' + response.status);
      }

      const responseData = await response.json();
      console.log("6. Sucesso! Resposta do servidor (JSON):", responseData);
      alert("Obrigado! Sua avaliação foi enviada com sucesso.");

    } catch (error) {
      console.error("--- ERRO GRAVE NA COMUNICAÇÃO ---");
      console.error("7. Aconteceu um erro durante o 'fetch':", error);
      alert("Ocorreu um erro de comunicação ao enviar sua avaliação. Verifique o console.");
    }
  };

  return (
    <div className="avaliacao-container">
      <div className="avaliacao-header">
        <img src="/oab-logo.png" alt="OAB Logo" className="logo" /> 
        <h1>Avaliação de Serviço</h1>
        <h2>Setor de Informática</h2>
        <p>Processo N°: <strong>{numeroProcesso}</strong></p>
      </div>

      <form className="avaliacao-form" onSubmit={handleSubmit}>
        <div className="rating-category">
          <label>Suporte técnico prestado</label>
          <StarRating onRatingChange={setAtendimento} />
        </div>

        <div className="rating-category">
          <label>Clareza na resolução do problema</label>
          <StarRating onRatingChange={setClareza} />
        </div>

        <div className="rating-category">
          <label>Agilidade no atendimento do chamado</label>
          <StarRating onRatingChange={setAgilidade} />
        </div>

        <div className="comment-category">
          <label htmlFor="comentario">Comentários (opcional)</label>
          <textarea
            id="comentario"
            rows={4}
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Deixe sua sugestão ou elogio..."
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">Enviar Avaliação</button>
      </form>
    </div>
  );
};

export default AvaliacaoPage;