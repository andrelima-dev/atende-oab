// frontend-admin/src/pages/DashboardPage.tsx
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import AvaliacoesChart from '../components/charts/AvaliacoesChart';
import './DashboardPage.css';

// Definindo o formato de uma avaliação
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

// Definindo o formato dos dados do gráfico
type ChartData = {
  name: string;
  avaliacoes: number;
};

const DashboardPage = () => {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error("Token não encontrado.");
        
        const response = await axios.get('http://localhost:3001/api/avaliacoes', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setAvaliacoes(response.data.data);
      } catch (err) {
        setError("Erro ao carregar dados.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAvaliacoes();
  }, []);

  // Lógica para processar os dados (agora com tipagem correta)
  const dadosDoGrafico: ChartData[] = useMemo(() => {
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const contadorPorMes = new Array(12).fill(0);

    avaliacoes.forEach(aval => {
      const mes = new Date(aval.created_at).getMonth();
      contadorPorMes[mes]++;
    });

    return meses.map((nomeDoMes, index) => ({
      name: nomeDoMes,
      avaliacoes: contadorPorMes[index],
    }));
  }, [avaliacoes]);

  const totalAvaliacoes = avaliacoes.length;
  const mediaGeral = totalAvaliacoes > 0 ? (
    avaliacoes.reduce((acc, aval) => acc + aval.nota_atendimento + aval.nota_clareza + aval.nota_agilidade, 0) / (totalAvaliacoes * 3)
  ).toFixed(1) : "0.0";
  
  if (loading) return <div className="dashboard-container"><h2>Carregando dados...</h2></div>;
  if (error) return <div className="dashboard-container"><h2>Erro: {error}</h2></div>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard de Desempenho</h1>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total de Avaliações</h3>
          <span className="card-value">{totalAvaliacoes}</span>
        </div>
        <div className="dashboard-card">
          <h3>Média Geral</h3>
          <span className="card-value">{mediaGeral} ⭐</span>
        </div>
      </div>
      <div className="chart-wrapper">
        <h2 className="table-title">Volume de Avaliações por Mês</h2>
        <AvaliacoesChart data={dadosDoGrafico} />
      </div>
      <h2 className="table-title">Avaliações Recentes</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Data</th><th>Processo</th><th>Atendimento</th><th>Clareza</th><th>Agilidade</th><th>Comentário</th>
            </tr>
          </thead>
          <tbody>
            {avaliacoes.slice(0, 5).map((aval) => (
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