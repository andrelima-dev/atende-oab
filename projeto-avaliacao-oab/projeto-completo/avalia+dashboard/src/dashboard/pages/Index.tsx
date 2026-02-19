import { useEffect, useState } from "react";
import { api, Avaliacao as AvaliacaoType } from "../../lib/apiClient";
import { DashboardHeader } from "@/dashboard/components/dashboard/DashboardHeader";
import { MetricCard } from "@/dashboard/components/dashboard/MetricCard";
import { SectorChart } from "@/dashboard/components/dashboard/SectorChart";
import { RecentEvaluations } from "@/dashboard/components/dashboard/RecentEvaluations";
import { FilterPanel } from "@/dashboard/components/dashboard/FilterPanel";
import { SectorAnalysis } from "@/dashboard/components/dashboard/SectorAnalysis";
import { calculateSectorStats } from "@/dashboard/lib/exportUtils";

interface Avaliacao {
  id: number;
  nome_advogado: string;
  setor: string;
  nota_agilidade?: number | null;
  nota_atendimento?: number | null;
  nota_clareza?: number | null;
  nota_cordialidade?: number | null;
  nota_eficiencia?: number | null;
  comentario?: string | null;
  created_at?: string | null;
  data_criacao: string;
  numero_ordem: string;
  processo?: string | null;
}

interface Evaluation {
  id: number;
  advogado: string;
  sector: string;
  rating: number;
  comment?: string;
  date: string;
  numeroOrdem: string;
}

interface SectorData {
  name: string;
  average: number;
  evaluations: number;
  color: string;
}

const Index = () => {
  const [selectedSector, setSelectedSector] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [showAnalysis, setShowAnalysis] = useState(false);

  const [avaliacoes, setAvaliacaos] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para recarregar avaliações
  const handleRefresh = async () => {
    setLoading(true);
    try {
      const result = await api.getAll();
      setAvaliacaos(result.data || []);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao buscar avaliações');
      console.error("Erro ao buscar avaliações:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  const filteredEvaluations = avaliacoes.filter((item) => {
    const itemSector = (item.setor as string) || 'Não especificado';

    const isSectorMatch =
      selectedSector === "all" || itemSector === selectedSector;

    const itemDate = new Date(item.data_criacao);
    const today = new Date();

    const isPeriodMatch = (() => {
      switch (selectedPeriod) {
        case "7d":
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(today.getDate() - 7);
          return itemDate >= sevenDaysAgo;
        case "30d":
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(today.getDate() - 30);
          return itemDate >= thirtyDaysAgo;
        case "90d":
          const ninetyDaysAgo = new Date();
          ninetyDaysAgo.setDate(today.getDate() - 90);
          return itemDate >= ninetyDaysAgo;
        case "1y":
          const oneYearAgo = new Date(
            today.getFullYear() - 1,
            today.getMonth(),
            today.getDate()
          );
          return itemDate >= oneYearAgo;
        case "all":
        default:
          return true;
      }
    })();

    return isSectorMatch && isPeriodMatch;
  });

  const formatEvaluations = (data: Avaliacao[]): Evaluation[] => {
    return data.map((item) => {
      const notas = [
        item.nota_agilidade,
        item.nota_atendimento,
        item.nota_clareza,
        item.nota_cordialidade,
        item.nota_eficiencia,
      ].filter((nota): nota is number => nota !== null);

      const averageRating =
        notas.length > 0
          ? notas.reduce((sum, nota) => sum + nota, 0) / notas.length
          : 0;

      return {
        id: item.id,
        advogado: item.nome_advogado,
        sector: item.setor,
        rating: Number(averageRating.toFixed(1)),
        comment: item.comentario ?? undefined,
        date: item.data_criacao,
        numeroOrdem: item.numero_ordem,
      };
    });
  };

  const convertToAnalysisFormat = (data: Avaliacao[]) => {
    return data.map((item) => ({
      id: item.id.toString(),
      nome_advogado: item.nome_advogado,
      numero_ordem: item.numero_ordem,
      processo: item.processo || "",
      setor: item.setor,
      nota_atendimento: item.nota_atendimento || 0,
      nota_qualidade: item.nota_clareza || 0,
      nota_pontualidade: item.nota_agilidade || 0,
      nota_comunicacao: item.nota_cordialidade || 0,
      nota_resultado: item.nota_eficiencia || 0,
      comentario: item.comentario || "",
      createdAt: item.data_criacao,
    }));
  };

  const formattedEvaluations = formatEvaluations(filteredEvaluations);

  const overallAverage =
    filteredEvaluations.length > 0
      ? (
          filteredEvaluations.reduce((sum, item) => {
            const notas = [
              item.nota_agilidade,
              item.nota_atendimento,
              item.nota_clareza,
              item.nota_cordialidade,
              item.nota_eficiencia,
            ].filter((nota): nota is number => nota !== null && nota !== undefined);
            
            const media = notas.length > 0 
              ? notas.reduce((s, n) => s + n, 0) / notas.length 
              : 0;
            
            return sum + media;
          }, 0) / filteredEvaluations.length
        ).toFixed(1)
      : "0.0";

  const totalEvaluations = filteredEvaluations.length;

  // Corrige a lógica para usar a média geral por setor
  const sectorStats = calculateSectorStats(convertToAnalysisFormat(filteredEvaluations));
  const bestSector = sectorStats.length > 0 ? sectorStats[0] : null;

  const groupDataBySector = (data: Avaliacao[]): SectorData[] => {
    const sectorMap: { [key: string]: { sum: number; count: number } } = {};

    data.forEach((avaliacao) => {
      const setorNome = (avaliacao.setor as string) || 'Não especificado';
      
      // Calcula a média apenas das notas que existem
      const notas = [
        avaliacao.nota_agilidade,
        avaliacao.nota_atendimento,
        avaliacao.nota_clareza,
        avaliacao.nota_cordialidade,
        avaliacao.nota_eficiencia,
      ].filter((nota): nota is number => nota !== null && nota !== undefined);
      
      const average = notas.length > 0 
        ? notas.reduce((s, n) => s + n, 0) / notas.length 
        : 0;

      if (!sectorMap[setorNome]) {
        sectorMap[setorNome] = { sum: 0, count: 0 };
      }
      sectorMap[setorNome].sum += average;
      sectorMap[setorNome].count += 1;
    });

    const COLORS = ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"];

    return Object.keys(sectorMap)
      .filter((setor) => sectorMap[setor].count > 0)
      .map((setor, index) => ({
        name: setor,
        average: Number((sectorMap[setor].sum / sectorMap[setor].count).toFixed(2)),
        evaluations: sectorMap[setor].count,
        color: COLORS[index % COLORS.length],
      }))
      .sort((a, b) => b.average - a.average);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-xl text-primary">
          Carregando dados do banco de dados...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-xl text-red-500">Erro: {error}</p>
      </div>
    );
  }

  // Corrige: define os dados formatados para os gráficos
  const formattedSectorData = groupDataBySector(filteredEvaluations);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 transition-colors duration-300">
      {/* Efeito de fundo decorativo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 dark:bg-blue-600/10 rounded-full blur-3xl -mt-48 transition-colors duration-300"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-200/20 dark:bg-indigo-600/10 rounded-full blur-3xl -mb-48 transition-colors duration-300"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <DashboardHeader />

        <FilterPanel
          selectedSector={selectedSector}
          selectedPeriod={selectedPeriod}
          onSectorChange={setSelectedSector}
          onPeriodChange={setSelectedPeriod}
          onRefresh={handleRefresh}
          avaliacoes={convertToAnalysisFormat(filteredEvaluations)}
          showAnalysis={showAnalysis}
          onToggleAnalysis={() => setShowAnalysis(!showAnalysis)}
        />

        {showAnalysis && (
          <div className="mb-10">
            <SectorAnalysis avaliacoes={convertToAnalysisFormat(filteredEvaluations)} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <MetricCard
            title="Média Geral"
            value={Number(overallAverage)}
            subtitle="Todas as avaliações"
            trend="up"
            color="primary"
          />
          <MetricCard
            title="Total de Avaliações"
            value={totalEvaluations}
            subtitle="Últimos 30 dias"
            trend="up"
            color="secondary"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <SectorChart data={formattedSectorData} type="bar" />
          <SectorChart data={formattedSectorData} type="pie" />
        </div>

        <RecentEvaluations evaluations={formattedEvaluations} />
      </div>
    </div>
  );
};

export default Index;