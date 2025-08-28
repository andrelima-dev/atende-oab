import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './DashboardPage.css'; // Reutilizaremos o mesmo CSS

interface Avaliacao {
  id: number;
  nome_advogado: string;
  numero_ordem: string;
  setor: string;
  comentario: string;
  created_at: string;
  // Adicione todas as notas para cálculo
  nota_atendimento: number;
  nota_clareza: number;
  nota_agilidade: number;
  nota_cordialidade: number;
  nota_eficiencia: number;
}

function SetorDetalhePage() {
  const { setorNome } = useParams<{ setorNome: string }>();
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [mediaSetor, setMediaSetor] = useState('0.0');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/avaliacoes');
        const todasAvaliacoes: Avaliacao[] = response.data;
        
        const avaliacoesDoSetor = todasAvaliacoes.filter(av => av.setor === setorNome);
        setAvaliacoes(avaliacoesDoSetor);

        if (avaliacoesDoSetor.length > 0) {
          const todasAsNotas = avaliacoesDoSetor.flatMap(av => [
            av.nota_atendimento, av.nota_clareza, av.nota_agilidade, 
            av.nota_cordialidade, av.nota_eficiencia
          ]);
          const soma = todasAsNotas.reduce((acc, nota) => acc + nota, 0);
          const media = (soma / todasAsNotas.length).toFixed(1);
          setMediaSetor(media);
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes do setor:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDados();
  }, [setorNome]);
  
  if (isLoading) {
    return <div className="loading-container"><div className="spinner"></div></div>;
  }

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        {/* ... (Pode copiar a sidebar do DashboardPage.tsx se quiser) ... */}
        <div className="sidebar-header">
          <h3>OAB-MA</h3>
          <p>Painel de Avaliações</p>
        </div>
        <nav className="sidebar-nav">
          <Link to="/dashboard" className="back-link">
            &larr; Voltar ao Dashboard
          </Link>
        </nav>
      </aside>
      <main className="main-content">
        <header className="main-header">
          <h1>Setor: {setorNome}</h1>
          <div className="card-info">
            <p>Média Geral do Setor</p>
            <span>{mediaSetor}</span>
          </div>
        </header>
        <section className="recent-evals">
          <h2>Todas as Avaliações do Setor</h2>
          <div className="avaliacoes-container">
            {avaliacoes.length > 0 ? (
              avaliacoes.map(av => (
                <div key={av.id} className="avaliacao-card">
                  <div className="card-header">
                    <strong>{av.nome_advogado} (OAB: {av.numero_ordem})</strong>
                    <small>{new Date(av.created_at).toLocaleDateString('pt-BR')}</small>
                  </div>
                  <div className="card-body">
                    <p><strong>Comentário:</strong> "{av.comentario || 'N/A'}"</p>
                  </div>
                </div>
              ))
            ) : <p>Nenhuma avaliação para este setor.</p>}
          </div>
        </section>
      </main>
    </div>
  );
}

export default SetorDetalhePage;