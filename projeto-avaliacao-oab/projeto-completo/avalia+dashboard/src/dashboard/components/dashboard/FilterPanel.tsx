import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { Filter, RefreshCw } from "lucide-react";

interface FilterPanelProps {
  selectedSector: string;
  selectedPeriod: string;
  onSectorChange: (sector: string) => void;
  onPeriodChange: (period: string) => void;
  onRefresh: () => void;
}

const sectors = [
  { value: "all", label: "Todos os Setores" },
  { value: "financeiro", label: "Financeiro/Tesouraria" },
  { value: "ti", label: "Tecnologia da Informação" },
  { value: "ted", label: "TED" },
  { value: "esa", label: "ESA/MA" },
];

const periods = [
  { value: "7d", label: "Últimos 7 dias" },
  { value: "30d", label: "Últimos 30 dias" },
  { value: "90d", label: "Últimos 3 meses" },
  { value: "1y", label: "Último ano" },
  { value: "all", label: "Todo o período" },
];

export const FilterPanel = ({
  selectedSector,
  selectedPeriod,
  onSectorChange,
  onPeriodChange,
  onRefresh,
}: FilterPanelProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    onRefresh();
    // Simula um tempo de carregamento para mostrar o ícone de refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <Card className="shadow-card mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="flex items-center gap-2 text-primary text-xl">
          <Filter className="h-6 w-6" />
          Filtros
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-muted-foreground block">
              Setor
            </label>
            <Select value={selectedSector} onValueChange={onSectorChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um setor" />
              </SelectTrigger>
              <SelectContent>
                {sectors.map((sector) => (
                  <SelectItem key={sector.value} value={sector.value}>
                    {sector.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-muted-foreground block">
              Período
            </label>
            <Select value={selectedPeriod} onValueChange={onPeriodChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um período" />
              </SelectTrigger>
              <SelectContent>
                {periods.map((period) => (
                  <SelectItem key={period.value} value={period.value}>
                    {period.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button
              onClick={handleRefreshClick}
              variant="default"
              className="w-full transition-all bg-primary hover:bg-primary-hover text-primary-foreground font-semibold"
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Atualizar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};