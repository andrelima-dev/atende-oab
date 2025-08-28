import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import './DashboardPage.css';
import type { PieLabelRenderProps } from 'recharts';

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
  media?: number;
};

type SetorData = {
  setor: string;
  total: number;
  media: number;
};

const CORES_OAB = {
  azulPrimario: '#003366',
  azulSecundario: '#0066CC',
  dourado: '#DAA520',
  verde: '#28A745',
  amarelo: '#FFC107',
  vermelho: '#DC3545',
  cinza: '#666666'
};

const CORES_GRAFICOS = Object.values(CORES_OAB);

const DashboardPage = () => {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [setorSelecionado, setSetorSelecionado] = useState<string>('todos');
  const [periodoSelecionado, setPeriodoSelecionado] = useState<string>('todos');
  const [viewMode, setViewMode] = useState<'overview' | 'setores' | 'temporal' | 'detalhes'>('overview');

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('Token não encontrado. Faça o login novamente.');

        const response = await axios.get('http://localhost:3001/api/avaliacoes', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAvaliacoes(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Erro ao carregar dados.');
      } finally {
        setLoading(false);
      }
    };
    fetchAvaliacoes();
  }, []);

  const avaliacoesFiltradas = useMemo(() => {
    let filtradas = avaliacoes;
    if (setorSelecionado !== 'todos') {
      filtradas = filtradas.filter((aval) => aval.setor === setorSelecionado);
    }
    if (periodoSelecionado !== 'todos') {
      const agora = new Date();
      const dataLimite = new Date();
      switch (periodoSelecionado) {
        case '7dias': dataLimite.setDate(agora.getDate() - 7); break;
        case '30dias': dataLimite.setDate(agora.getDate() - 30); break;
        case '90dias': dataLimite.setDate(agora.getDate() - 90); break;
        case '6meses': dataLimite.setMonth(agora.getMonth() - 6); break;
      }
      filtradas = filtradas.filter((aval) => new Date(aval.data_criacao) >= dataLimite);
    }
    return filtradas;
  }, [avaliacoes, setorSelecionado, periodoSelecionado]);

  const setoresDisponiveis = useMemo(() => {
    const setoresDoBanco = new Set(avaliacoes.map((aval) => aval.setor));
    setoresDoBanco.add('TED');
    return Array.from(setoresDoBanco).sort();
  }, [avaliacoes]);

  const dadosSetores: SetorData[] = useMemo(() => {
    const agrupados = avaliacoesFiltradas.reduce((acc, aval) => {
      if (!acc[aval.setor]) acc[aval.setor] = { total: 0, somaNotas: 0 };
      acc[aval.setor].total++;
      const mediaAval = (aval.nota_atendimento + aval.nota_clareza + aval.nota_agilidade + aval.nota_cordialidade + aval.nota_eficiencia) / 5;
      acc[aval.setor].somaNotas += mediaAval;
      return acc;
    }, {} as Record<string, { total: number; somaNotas: number }>);
    return Object.entries(agrupados).map(([setor, dados]) => ({
      setor,
      total: dados.total,
      media: Number((dados.somaNotas / dados.total).toFixed(1))
    })).sort((a, b) => b.media - a.media);
  }, [avaliacoesFiltradas]);
  
  const estatisticas = useMemo(() => {
    const total = avaliacoesFiltradas.length;
    if (total === 0) return { total: 0, mediaGeral: 0, melhorSetor: 'N/A' };
    const somaTotal = dadosSetores.reduce((acc, setor) => acc + (setor.media * setor.total), 0);
    const mediaGeral = total > 0 ? somaTotal / total : 0;
    const melhorSetor = dadosSetores.length > 0 ? dadosSetores[0].setor : 'N/A';
    return {
      total,
      mediaGeral: Number(mediaGeral.toFixed(1)),
      melhorSetor
    };
  }, [avaliacoesFiltradas, dadosSetores]);

  const dadosGraficoMensal: ChartData[] = useMemo(() => {
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const contadorPorMes = new Array(12).fill(0);
    avaliacoesFiltradas.forEach((aval) => {
      const mes = new Date(aval.data_criacao).getMonth();
      contadorPorMes[mes]++;
    });
    return meses.map((nomeDoMes, index) => ({
      name: nomeDoMes,
      avaliacoes: contadorPorMes[index],
    }));
  }, [avaliacoesFiltradas]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/';
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <h2>Carregando Dashboard...</h2>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h2>Erro: {error}</h2>
      <button onClick={() => window.location.reload()} className="retry-button">
        Tentar Novamente
      </button>
    </div>
  );

  const getStatusClass = (media: number) => {
    if (media >= 4.5) return 'excelente';
    if (media >= 4.0) return 'bom';
    if (media >= 3.0) return 'regular';
    return 'baixo';
  };

  const getStatusText = (media: number) => {
    if (media >= 4.5) return 'Excelente';
    if (media >= 4.0) return 'Bom';
    if (media >= 3.0) return 'Regular';
    return 'Precisa Melhorar';
  };

  const renderContent = () => {
    switch (viewMode) {
      case 'overview':
        return (
          <>
            <div className="stats-grid">
              <div className="stat-card total">
                <div className="stat-content">
                  <h3>Total de Avaliações</h3>
                  <span className="stat-value">{estatisticas.total}</span>
                </div>
              </div>
              <div className="stat-card media">
                <div className="stat-content">
                  <h3>Média Geral</h3>
                  <span className="stat-value">{estatisticas.mediaGeral}</span>
                </div>
              </div>
              <div className="stat-card melhor">
                <div className="stat-content">
                  <h3>Melhor Setor</h3>
                  <span className="stat-value">{estatisticas.melhorSetor}</span>
                </div>
              </div>
              <div className="stat-card setores">
                <div className="stat-content">
                  <h3>Setores Ativos</h3>
                  <span className="stat-value">{dadosSetores.length}</span>
                </div>
              </div>
            </div>
            <div className="main-charts-single">
              <div className="chart-card primary">
                <div className="chart-header">
                  <h3>Evolução Mensal das Avaliações</h3>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={dadosGraficoMensal}>
                    <defs>
                      <linearGradient id="colorAvaliacoes" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={CORES_OAB.azulPrimario} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={CORES_OAB.azulPrimario} stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" stroke={CORES_OAB.cinza} />
                    <YAxis stroke={CORES_OAB.cinza} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: `1px solid ${CORES_OAB.cinza}`}}/>
                    <Area
                      type="monotone"
                      dataKey="avaliacoes"
                      stroke={CORES_OAB.azulPrimario}
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorAvaliacoes)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        );
      case 'setores':
        return (
          <div className="table-section">
            <div className="table-header">
              <h2>Performance por Setor</h2>
            </div>
            <div className="table-wrapper modern">
              <table className="performance-table">
                <thead>
                  <tr>
                    <th>Setor</th>
                    <th>Total de Avaliações</th>
                    <th>Média Geral</th>
                    <th>Performance</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dadosSetores.map((setor) => (
                    <tr key={setor.setor}>
                      <td className="setor-name-cell">{setor.setor}</td>
                      <td>{setor.total}</td>
                      <td>
                        <div className="media-badge">{setor.media.toFixed(1)} ⭐</div>
                      </td>
                      <td>
                        <div className="performance-bar-container">
                           <div className="performance-bar" style={{ width: `${(setor.media / 5) * 100}%`, backgroundColor: setor.media >= 4.0 ? 'var(--oab-verde)' : setor.media >= 3.0 ? 'var(--oab-amarelo)' : 'var(--oab-vermelho)' }}></div>
                        </div>
                      </td>
                      <td>
                        <div className={`status-badge ${getStatusClass(setor.media)}`}>
                          {getStatusText(setor.media)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
        case 'detalhes':
            return (
              <div className="detalhes-view">
                <div className="table-section">
                  <div className="table-header"><h2>Avaliações Detalhadas</h2></div>
                  <div className="table-wrapper modern">
                    <table className="avaliacoes-table">
                      <thead>
                        <tr>
                          <th>Data</th>
                          <th>Advogado(a)</th>
                          <th>OAB</th>
                          <th>Setor</th>
                          <th>Atendimento</th>
                          <th>Clareza</th>
                          <th>Agilidade</th>
                          <th>Cordialidade</th>
                          <th>Eficiência</th>
                          <th>Média</th>
                          <th>Comentário</th>
                        </tr>
                      </thead>
                      <tbody>
                        {avaliacoesFiltradas.map((aval) => {
                          const media = ((aval.nota_atendimento + aval.nota_clareza + aval.nota_agilidade + 
                                        aval.nota_cordialidade + aval.nota_eficiencia) / 5).toFixed(1);
                          return (
                            <tr key={aval.id}>
                              <td>{new Date(aval.data_criacao).toLocaleDateString('pt-BR')}</td>
                              <td className="advogado-name">{aval.nome_advogado}</td>
                              <td><span className="oab-number">{aval.numero_ordem}</span></td>
                              <td><span className="setor-tag">{aval.setor}</span></td>
                              <td><div className={`nota-badge nota-${aval.nota_atendimento}`}>{aval.nota_atendimento}</div></td>
                              <td><div className={`nota-badge nota-${aval.nota_clareza}`}>{aval.nota_clareza}</div></td>
                              <td><div className={`nota-badge nota-${aval.nota_agilidade}`}>{aval.nota_agilidade}</div></td>
                              <td><div className={`nota-badge nota-${aval.nota_cordialidade}`}>{aval.nota_cordialidade}</div></td>
                              <td><div className={`nota-badge nota-${aval.nota_eficiencia}`}>{aval.nota_eficiencia}</div></td>
                              <td><div className="media-badge">{media}</div></td>
                              <td className="comentario-cell"><div className="comentario-preview">{aval.comentario}</div></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="/oab-logo.png" alt="Logo OAB" className="oab-logo" />
          <h1>Dashboard OAB</h1>
        </div>
        <nav className="sidebar-nav">
          <button className={`nav-item ${viewMode === 'overview' ? 'active' : ''}`} onClick={() => setViewMode('overview')}>
            <span className="nav-icon">📊</span> Visão Geral
          </button>
          <button className={`nav-item ${viewMode === 'setores' ? 'active' : ''}`} onClick={() => setViewMode('setores')}>
            <span className="nav-icon">🏢</span> Análise por Setores
          </button>
          <button className={`nav-item ${viewMode === 'detalhes' ? 'active' : ''}`} onClick={() => setViewMode('detalhes')}>
            <span className="nav-icon">📋</span> Dados Detalhados
          </button>
        </nav>
        <div className="sidebar-filters">
          <h3>Filtros</h3>
          <div className="filter-group">
            <label>Setor:</label>
            <select value={setorSelecionado} onChange={(e) => setSetorSelecionado(e.target.value)} className="filter-select">
              <option value="todos">Todos os Setores</option>
              {setoresDisponiveis.map((setor) => (
                <option key={setor} value={setor}>{setor}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
             <label>Período:</label>
             <select value={periodoSelecionado} onChange={(e) => setPeriodoSelecionado(e.target.value)} className="filter-select">
                 <option value="todos">Todo Período</option>
                 <option value="7dias">Últimos 7 dias</option>
                 <option value="30dias">Últimos 30 dias</option>
                 <option value="90dias">Últimos 90 dias</option>
                 <option value="6meses">Últimos 6 meses</option>
             </select>
          </div>
        </div>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <span className="nav-icon">🚪</span> Sair
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="content-header">
          <div className="header-info">
            <h2>
              {viewMode === 'overview' && 'Visão Geral do Sistema'}
              {viewMode === 'setores' && 'Análise por Setores'}
              {viewMode === 'detalhes' && 'Dados Detalhados'}
            </h2>
            <p>
              {avaliacoesFiltradas.length} avaliações 
              {setorSelecionado !== 'todos' && ` • Setor: ${setorSelecionado}`}
            </p>
          </div>
          <div className="header-actions">
             <button className="action-btn refresh" onClick={() => window.location.reload()}>
                 <span>🔄</span> Atualizar
             </button>
             <button className="action-btn export">
                 <span>📊</span> Exportar
             </button>
          </div>
        </header>
        <div className="content-body">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
