// frontend-admin/src/pages/DashboardPage.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './DashboardPage.css';

type Avaliacao = {
  id: number;
  created_at: string;
  processo: string;
  nota_atendimento: number;
  nota_clareza: number;
  nota_agilidade: number;
  comentario: string;
  setor: string;
};

const DashboardPage = () => {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error("Token de autenticação não encontrado.");

        const response = await axios.get('http://localhost:3001/api/avaliacoes', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setAvaliacoes(response.data.data);
      } catch (err: any) {
        setError("Não foi possível carregar os dados. Sua sessão pode ter expirado.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAvaliacoes();
  }, []);

  // --- LÓGICA PARA CALCULAR OS RESUMOS ---
  const totalAvaliacoes = avaliacoes.length;
  const mediaGeral = totalAvaliacoes > 0 ? (
    avaliacoes.reduce((acc, aval) => acc + aval.nota_atendimento + aval.nota_clareza + aval.nota_agilidade, 0) / (totalAvaliacoes * 3)
  ).toFixed(1) : 0;
  // ----------------------------------------

  if (loading) return <div className="dashboard-container"><h2>Carregando dados...</h2></div>;
  if (error) return <div className="dashboard-container"><h2>Erro: {error}</h2></div>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard de Desempenho</h1>

      {/* Cards de Resumo */}
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total de Avaliações</h3>
          <span className="card-value">{totalAvaliacoes}</span>
        </div>

        <div className="dashboard-card">
          <h3>Média Geral</h3>
          <span className="card-value">{mediaGeral} ⭐</span>
        </div>

        {/* Você pode adicionar mais cards aqui no futuro */}
      </div>

      {/* Tabela de Avaliações Recentes */}
      <h2 className="table-title">Avaliações Recentes</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Processo</th>
              <th>Atendimento</th>
              <th>Clareza</th>
              <th>Agilidade</th>
              <th>Comentário</th>
            </tr>
          </thead>
          <tbody>
            {avaliacoes.slice(0, 5).map((aval) => ( // Mostra apenas as 5 mais recentes
              <tr key={aval.id}>
                <td>{new Date(aval.created_at).toLocaleDateString('pt-BR')}</td>
                <td>{aval.processo}</td>
                <td>{"⭐".repeat(aval.nota_atendimento)}</td>
                <td>{"⭐".repeat(aval.nota_clareza)}</td>
                <td>{"⭐".repeat(aval.nota_agilidade)}</td>
                <td className="comentario-cell">{aval.comentario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;