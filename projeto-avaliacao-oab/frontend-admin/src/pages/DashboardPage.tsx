// frontend-admin/src/pages/DashboardPage.tsx
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import AvaliacoesChart from '../components/AvaliacoesChart';
import './DashboardPage.css';

type Avaliacao = {
  id: number;
  data_criacao: string;
  processo: string;
  nota_atendimento: number;
  nota_clareza: number;
  nota_agilidade: number;
  nota_cordialidade: number;
  nota_eficiencia: number;
  comentario: string;
  setor: string;
  nome_advogado: string;
  numero_ordem: string;
};

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
        if (!token) throw new Error("Token não encontrado. Faça o login novamente.");
        
        const response = await axios.get('http://localhost:3001/api/avaliacoes', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setAvaliacoes(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.error || "Erro ao carregar dados.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAvaliacoes();
  }, []);

  const dadosDoGrafico: ChartData[] = useMemo(() => {
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const contadorPorMes = new Array(12).fill(0);
    avaliacoes.forEach(aval => {
      const mes = new Date(aval.data_criacao).getMonth();
      contadorPorMes[mes]++;
    });
    return meses.map((nomeDoMes, index) => ({ name: nomeDoMes, avaliacoes: contadorPorMes[index] }));
  }, [avaliacoes]);

  const totalAvaliacoes = avaliacoes.length;
  const mediaGeral = totalAvaliacoes > 0 ? (
    avaliacoes.reduce((acc, aval) => acc + aval.nota_atendimento + aval.nota_clareza + aval.nota_agilidade + aval.nota_cordialidade + aval.nota_eficiencia, 0) / (totalAvaliacoes * 5)
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
              <th>Data</th><th>Advogado(a)</th><th>OAB</th><th>Setor</th>
              <th>Atend.</th><th>Clareza</th><th>Agilid.</th>
              <th>Cord.</th><th>Efic.</th>
              <th>Comentário</th>
            </tr>
          </thead>
          <tbody>
            {avaliacoes.map((aval) => (
              <tr key={aval.id}>
                <td>{new Date(aval.data_criacao).toLocaleDateString('pt-BR')}</td>
                <td>{aval.nome_advogado}</td>
                <td>{aval.numero_ordem}</td>
                <td>{aval.setor}</td>
                <td>{"⭐".repeat(aval.nota_atendimento)}</td>
                <td>{"⭐".repeat(aval.nota_clareza)}</td>
                <td>{"⭐".repeat(aval.nota_agilidade)}</td>
                <td>{"⭐".repeat(aval.nota_cordialidade)}</td>
                <td>{"⭐".repeat(aval.nota_eficiencia)}</td>
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