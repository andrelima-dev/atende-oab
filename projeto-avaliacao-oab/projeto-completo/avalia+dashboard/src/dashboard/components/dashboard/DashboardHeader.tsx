import { Badge } from "../ui/badge";

export const DashboardHeader = () => {
  const currentDate = new Date().toLocaleDateString('pt-BR');

  return (
    <div className="bg-primary text-primary-foreground p-6 md:p-8 rounded-xl shadow-lg mb-8">
      <div className="flex items-center justify-between">
        
        <div className="flex items-center gap-4 md:gap-6">
          <img 
            src="/logo-oabma.png" 
            alt="Logo OAB-MA" 
            className="h-16 w-auto hidden sm:block"
          />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Dashboard Avaliações</h1>
            <p className="text-white/80 text-base md:text-lg">Ordem dos Advogados do Brasil - OABMA</p>
          </div>
        </div>
        
        <div className="text-right flex-shrink-0">
          <Badge variant="secondary" className="bg-white/10 text-white border-white/20 mb-2">
            Sistema de Avaliação
          </Badge>
          <p className="text-white/70 text-xs md:text-sm">Última atualização: {currentDate}</p>
        </div>
      </div>
    </div>
  );
};