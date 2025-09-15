import { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";
import { DashboardHeader } from "@/dashboard/components/dashboard/DashboardHeader";
import { MetricCard } from "@/dashboard/components/dashboard/MetricCard";
import { SectorChart } from "@/dashboard/components/dashboard/SectorChart";
import { RecentEvaluations } from "@/dashboard/components/dashboard/RecentEvaluations";
import { FilterPanel } from "@/dashboard/components/dashboard/FilterPanel";

interface Avaliacao {
  id: number;
  nome_advogado: string;
  setor: string;
  nota_agilidade: number | null;
  nota_atendimento: number | null;
  nota_clareza: number | null;
  nota_cordialidade: number | null;
  nota_eficiencia: number | null;
  comentario: string | null;
  created_at: string | null;
  data_criacao: string;
  numero_ordem: string;
  processo: string | null;
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

  const [avaliacoes, setAvaliacaos] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const normalizeText = (text: string): string =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

const sectorKeys: Record<string, string> = {
  "financeiro / tesouraria": "financeiro", 
  
  "financeiro": "financeiro",
  "financeiro/tesouraria": "financeiro",
  "tesouraria": "financeiro",

  "tecnologia da informacao": "ti",
  "ti": "ti",
  "ted": "ted",
  "esa": "esa",
  "esa/ma": "esa",
};

  const getSectorKey = (setor: string): string => {
    const norm = normalizeText(setor);
    return sectorKeys[norm] ?? norm;
  };

  useEffect(() => {
    const fetchAvaliacaos = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("avaliacoes_oab")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
        console.error("Erro ao buscar avaliações:", error);
      } else {
        setAvaliacaos(data || []);
      }
      setLoading(false);
    };

    fetchAvaliacaos();
  }, []);

  const filteredEvaluations = avaliacoes.filter((item) => {
    const itemSectorKey = getSectorKey(item.setor);

    if (selectedSector === "financeiro") {
      console.log("--- Checando avaliação para o setor Financeiro ---");
      console.log("Filtro selecionado (selectedSector):", selectedSector);
      console.log("Setor do item no banco (item.setor):", `'${item.setor}'`);
      console.log("Setor do item após normalização (itemSectorKey):", `'${itemSectorKey}'`);
      console.log(
        `A comparação será: '${itemSectorKey}' === '${selectedSector}'? ->`,
        itemSectorKey === selectedSector
      );
      console.log("-------------------------------------------------");
    }

    const isSectorMatch =
      selectedSector === "all" || itemSectorKey === selectedSector;

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

  const formattedEvaluations = formatEvaluations(filteredEvaluations);

  const overallAverage =
    filteredEvaluations.length > 0
      ? (
          filteredEvaluations.reduce(
            (sum, item) =>
              sum +
              ((item.nota_agilidade || 0) +
                (item.nota_atendimento || 0) +
                (item.nota_clareza || 0) +
                (item.nota_cordialidade || 0) +
                (item.nota_eficiencia || 0)) /
                5,
            0
          ) / filteredEvaluations.length
        ).toFixed(1)
      : "0";

  const totalEvaluations = filteredEvaluations.length;

  const bestSector = filteredEvaluations.reduce(
    (best, current) =>
      (current.nota_eficiencia || 0) >
      (best ? best.nota_eficiencia || 0 : 0)
        ? current
        : best,
    filteredEvaluations[0]
  );

  const groupDataBySector = (data: Avaliacao[]): SectorData[] => {
    const sectorMap: { [key: string]: { sum: number; count: number } } = {};

    data.forEach((avaliacao) => {
      const setorKey = getSectorKey(avaliacao.setor);
      const average =
        ((avaliacao.nota_agilidade || 0) +
          (avaliacao.nota_atendimento || 0) +
          (avaliacao.nota_clareza || 0) +
          (avaliacao.nota_cordialidade || 0) +
          (avaliacao.nota_eficiencia || 0)) /
        5;

      if (!sectorMap[setorKey]) {
        sectorMap[setorKey] = { sum: 0, count: 0 };
      }
      sectorMap[setorKey].sum += average;
      sectorMap[setorKey].count += 1;
    });

    const COLORS = ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"];

    return Object.keys(sectorMap).map((setor, index) => ({
      name: setor,
      average: sectorMap[setor].sum / sectorMap[setor].count,
      evaluations: sectorMap[setor].count,
      color: COLORS[index % COLORS.length],
    }));
  };

  const formattedSectorData = groupDataBySector(filteredEvaluations);

  const handleRefresh = () => {
    console.log("Refreshing data...");
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

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader />

        <FilterPanel
          selectedSector={selectedSector}
          selectedPeriod={selectedPeriod}
          onSectorChange={setSelectedSector}
          onPeriodChange={setSelectedPeriod}
          onRefresh={handleRefresh}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
          <MetricCard
            title="Melhor Setor"
            value={bestSector ? bestSector.nota_eficiencia || 0 : 0}
            subtitle={bestSector ? bestSector.setor : ""}
            trend="stable"
            color="success"
          />
          <MetricCard
            title="Taxa de Satisfação"
            value={92.5}
            subtitle="Acima de 4 estrelas"
            trend="up"
            
            color="success"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SectorChart data={formattedSectorData} type="bar" />
          <SectorChart data={formattedSectorData} type="pie" />
        </div>

        <RecentEvaluations evaluations={formattedEvaluations} />
      </div>
    </div>
  );
};

export default Index;