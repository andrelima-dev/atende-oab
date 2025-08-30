import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Star, Building, Percent } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

type Avaliacao = {
  id: number;
  created_at: string;
  nota_atendimento: number;
  nota_clareza: number;
  nota_agilidade: number;
  nota_cordialidade: number;
  nota_eficiencia: number;
  setor: string;
};

const CORES_GRAFICO_PIZZA = ['#DC2626', '#F97316', '#FACC15', '#84CC16', '#22C55E'];

export default function DashboardPage() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await axios.get('http://localhost:3001/api/avaliacoes', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAvaliacoes(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Erro ao carregar dados. Tente fazer login novamente.');
      } finally {
        setLoading(false);
      }
    };
    fetchAvaliacoes();
  }, [navigate]);

  const dadosProcessados = useMemo(() => {
    if (avaliacoes.length === 0) {
      return {
        totalAvaliacoes: 0,
        mediaGeral: 0,
        totalSetores: 0,
        taxaSatisfacao: 0,
        distribuicaoEstrelas: [],
        dadosSetores: [],
      };
    }

    const setoresUnicos = new Set(avaliacoes.map(a => a.setor));

    let totalSatisfeitos = 0;
    const contagemEstrelas: Record<string, number> = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };

    avaliacoes.forEach(aval => {
      const media = (aval.nota_atendimento + aval.nota_clareza + aval.nota_agilidade + aval.nota_cordialidade + aval.nota_eficiencia) / 5;
      if (media >= 4) totalSatisfeitos++;
      const mediaArredondada = Math.round(media);
      if (mediaArredondada >= 1 && mediaArredondada <= 5) {
        contagemEstrelas[mediaArredondada.toString()]++;
      }
    });

    const distribuicaoEstrelas = Object.entries(contagemEstrelas).map(([estrelas, contagem]) => ({
        name: `${estrelas} Estrela${estrelas > '1' ? 's' : ''}`,
        value: contagem,
        percent: ((contagem / avaliacoes.length) * 100).toFixed(0)
    })).reverse();

    const dadosAgrupadosSetor = Array.from(setoresUnicos).map(setor => {
        const avaliacoesSetor = avaliacoes.filter(a => a.setor === setor);
        const somaMedias = avaliacoesSetor.reduce((acc, curr) => {
            return acc + (curr.nota_atendimento + curr.nota_clareza + curr.nota_agilidade + curr.nota_cordialidade + curr.nota_eficiencia) / 5;
        }, 0);
        return {
            setor,
            avaliacoes: avaliacoesSetor.length,
            media: somaMedias / avaliacoesSetor.length
        };
    }).sort((a,b) => b.media - a.media);

    return {
      totalAvaliacoes: avaliacoes.length,
      mediaGeral: dadosAgrupadosSetor.reduce((acc, curr) => acc + curr.media * curr.avaliacoes, 0) / avaliacoes.length,
      totalSetores: setoresUnicos.size,
      taxaSatisfacao: (totalSatisfeitos / avaliacoes.length) * 100,
      distribuicaoEstrelas,
      dadosSetores: dadosAgrupadosSetor,
    };
  }, [avaliacoes]);


  if (loading) return <div className="flex h-screen items-center justify-center bg-gray-950 text-white">Carregando Dashboard...</div>;
  if (error) return <div className="flex h-screen items-center justify-center bg-gray-950 text-red-500">{error}</div>;

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-950 text-white">
      <header className="sticky top-0 flex h-16 items-center justify-center gap-4 border-b border-gray-800 bg-gray-950 px-4 md:px-6">
        <h1 className="text-xl font-bold">OAB/MA - Dashboard Administrativo</h1>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total de Avaliações</CardTitle>
              <Users className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{dadosProcessados.totalAvaliacoes}</div>
              <p className="text-xs text-gray-400">+12% este mês (exemplo)</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Média Geral</CardTitle>
                <Star className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{dadosProcessados.mediaGeral.toFixed(2)}</div>
              <p className="text-xs text-gray-400">+0.3 pontos (exemplo)</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Setores Avaliados</CardTitle>
                <Building className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{dadosProcessados.totalSetores}</div>
              <p className="text-xs text-gray-400">Todos ativos (exemplo)</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Satisfação</CardTitle>
                <Percent className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{dadosProcessados.taxaSatisfacao.toFixed(0)}%</div>
              <p className="text-xs text-gray-400">+5% este mês (exemplo)</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-5">
          <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Distribuição por Estrelas</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie data={dadosProcessados.distribuicaoEstrelas} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {dadosProcessados.distribuicaoEstrelas.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={CORES_GRAFICO_PIZZA[index % CORES_GRAFICO_PIZZA.length]} />
                        ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 flex flex-col gap-2 text-sm">
                    {dadosProcessados.distribuicaoEstrelas.map((entry, index) => (
                        <div key={entry.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: CORES_GRAFICO_PIZZA[index] }} />
                                <span>{entry.name}</span>
                            </div>
                            <span className="font-medium">{entry.value} ({entry.percent}%)</span>
                        </div>
                    ))}
                </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Análise por Setores</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    {dadosProcessados.dadosSetores.map(setor => (
                        <div key={setor.setor} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 text-sm">
                            <div className="font-medium">{setor.setor}</div>
                            <div className="text-gray-400">{setor.avaliacoes} avaliações</div>
                            <div className="flex items-center gap-2 font-semibold">
                                <span>{setor.media.toFixed(2)}</span>
                                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                            </div>
                            <div className="col-span-3 h-2 rounded-full bg-gray-800">
                                <div className="h-2 rounded-full bg-green-500" style={{ width: `${(setor.media / 5) * 100}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

