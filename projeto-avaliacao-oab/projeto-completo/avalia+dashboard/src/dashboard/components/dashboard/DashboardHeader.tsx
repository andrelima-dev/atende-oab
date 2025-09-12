import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

export const DashboardHeader = () => {
  return (
    <div className="gradient-primary text-white p-8 rounded-lg shadow-elevated mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard Institucional</h1>
          <p className="text-white/90 text-lg">Ordem dos Advogados do Brasil - Seção Maranhão</p>
        </div>
        <div className="text-right">
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-2">
            Sistema de Avaliação
          </Badge>
          <p className="text-white/80 text-sm">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
        </div>
      </div>
    </div>
  );
};