import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { Filter, RefreshCw, Sliders, Download, BarChart3 } from "lucide-react";
import { exportToPDF } from "../../lib/exportUtils";

interface FilterPanelProps {
  selectedSector: string;
  selectedPeriod: string;
  onSectorChange: (sector: string) => void;
  onPeriodChange: (period: string) => void;
  onRefresh: () => void;
  avaliacoes?: any[];
  showAnalysis?: boolean;
  onToggleAnalysis?: () => void;
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
  avaliacoes = [],
  showAnalysis = false,
  onToggleAnalysis,
}: FilterPanelProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    onRefresh();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleExportPDF = () => {
    setIsExporting(true);
    try {
      const periodo = selectedPeriod === "all" ? "todos" : selectedPeriod;
      exportToPDF(avaliacoes, periodo);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900/70 dark:to-slate-800/50 shadow-lg border-slate-100 dark:border-slate-700 mb-8 rounded-2xl transition-colors duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-800/40 dark:to-indigo-800/40 rounded-lg">
            <Sliders className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100">
            Filtros de Análise
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="flex flex-col gap-2.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Setor
            </label>
            <Select value={selectedSector} onValueChange={onSectorChange}>
              <SelectTrigger className="border-2 border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg bg-white dark:bg-slate-800 shadow-sm text-slate-900 dark:text-slate-100 transition-colors duration-300">
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

          <div className="flex flex-col gap-2.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Período
            </label>
            <Select value={selectedPeriod} onValueChange={onPeriodChange}>
              <SelectTrigger className="border-2 border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg bg-white dark:bg-slate-800 shadow-sm text-slate-900 dark:text-slate-100 transition-colors duration-300">
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
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 dark:from-blue-600 dark:to-indigo-700 dark:hover:from-blue-700 dark:hover:to-indigo-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all rounded-lg py-2 h-10"
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Atualizar
            </Button>
          </div>
        </div>

        {/* Botões de Exportação */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-200 dark:border-slate-600">
          <Button
            onClick={handleExportPDF}
            disabled={isExporting || avaliacoes.length === 0}
            className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 dark:from-red-600 dark:to-orange-700 dark:hover:from-red-700 dark:hover:to-orange-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all rounded-lg flex items-center justify-center gap-2"
          >
            <Download className="h-4 w-4" />
            Exportar Relatório PDF
          </Button>

          <Button
            onClick={onToggleAnalysis}
            variant={showAnalysis ? "default" : "outline"}
            className={`font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
              showAnalysis
                ? "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 dark:from-purple-600 dark:to-indigo-700 dark:hover:from-purple-700 dark:hover:to-indigo-800 text-white shadow-lg hover:shadow-xl"
                : "border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            {showAnalysis ? "Ocultar" : "Mostrar"} Análise
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};