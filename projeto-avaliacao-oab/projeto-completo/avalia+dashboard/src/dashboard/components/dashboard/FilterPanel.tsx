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
  return (
    <Card className="shadow-card mb-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-primary">
          <Filter className="h-5 w-5" />
          Filtros
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
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

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
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
              onClick={onRefresh}
              variant="outline"
              className="w-full transition-smooth hover:bg-primary hover:text-primary-foreground"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};