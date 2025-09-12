import { useState } from "react";
import { DashboardHeader } from "@/dashboard/components/dashboard/DashboardHeader";
import { MetricCard } from "@/dashboard/components/dashboard/MetricCard";
import { SectorChart } from "@/dashboard/components/dashboard/SectorChart";
import { RecentEvaluations } from "@/dashboard/components/dashboard/RecentEvaluations";
import { FilterPanel } from "@/dashboard/components/dashboard/FilterPanel";
import { 
  mockEvaluations, 
  mockSectorData, 
  calculateOverallAverage, 
  getTotalEvaluations 
} from "@/dashboard/data/mockData";

interface SectorData {
  name: string;
  average: number;
  evaluations: number;
  color: string;
}

const Index = () => {
  const [selectedSector, setSelectedSector] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("30d");

  const overallAverage = calculateOverallAverage(mockSectorData);
  const totalEvaluations = getTotalEvaluations(mockSectorData);
  
  const bestSector = mockSectorData.reduce((best: SectorData, current: SectorData) => 
    current.average > best.average ? current : best
  );

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
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
            value={overallAverage}
            subtitle="Todas as avaliações"
            trend="up"
            trendValue="+2.4%"
            color="primary"
          />
          <MetricCard
            title="Total de Avaliações"
            value={totalEvaluations}
            subtitle="Últimos 30 dias"
            trend="up"
            trendValue="+12"
            color="secondary"
          />
          <MetricCard
            title="Melhor Setor"
            value={bestSector.average}
            subtitle={bestSector.name}
            trend="stable"
            color="success"
          />
          <MetricCard
            title="Taxa de Satisfação"
            value={92.5}
            subtitle="Acima de 4 estrelas"
            trend="up"
            trendValue="+5.2%"
            color="success"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SectorChart data={mockSectorData} type="bar" />
          <SectorChart data={mockSectorData} type="pie" />
        </div>

        <RecentEvaluations evaluations={mockEvaluations} />
      </div>
    </div>
  );
};

export default Index;