import { Badge } from "../ui/badge";
import { Calendar, RefreshCw, Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export const DashboardHeader = () => {
  const currentDate = new Date().toLocaleDateString('pt-BR');
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900 text-white p-8 md:p-10 rounded-2xl shadow-2xl mb-8 relative overflow-hidden transition-colors duration-300">
      {/* Efeito de fundo decorativo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-500/5 rounded-full -ml-48 -mb-48 blur-3xl"></div>
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4 md:gap-6">
          <img 
            src="/logo-oabma.png" 
            alt="Logo OAB-MA" 
            className="h-20 w-auto hidden sm:block drop-shadow-lg"
          />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
              Dashboard de Avaliações
            </h1>
            <p className="text-blue-100/90 text-base md:text-lg mt-1">Ordem dos Advogados do Brasil - Maranhão</p>
          </div>
        </div>
        
        <div className="text-right flex-shrink-0 flex flex-col gap-3 items-end">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
              aria-label="Alternar tema"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-blue-200" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-200" />
              )}
            </button>
            <Badge className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white border-0 shadow-lg px-3 py-1">
              <RefreshCw className="w-3 h-3 mr-1" />
              Sistema Ativo
            </Badge>
          </div>
          <p className="text-blue-100/70 text-xs md:text-sm flex items-center justify-end gap-1">
            <Calendar className="w-3 h-3" />
            {currentDate}
          </p>
        </div>
      </div>
    </div>
  );
};