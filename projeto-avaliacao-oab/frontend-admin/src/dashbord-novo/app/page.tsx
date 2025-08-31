import { unstable_noStore as noStore } from 'next/cache';
import Image from 'next/image';
import { supabase } from '../lib/supabaseClient';
import { DashboardStats } from "@/components/dashboard-stats";
import { SectorAnalytics } from "@/components/sector-analytics";
import { RecentEvaluations } from "@/components/recent-evaluations";
import { EvaluationCharts } from "@/components/evaluation-charts";
import { EvaluationComments } from "@/components/evaluation-comments";
import { ThemeToggle } from '@/components/theme-toggle';

export default async function Home() {
  noStore();

  const { data: avaliacoes, error } = await supabase
    .from('avaliacoes_oab')
    .select('*');

  if (error || !avaliacoes) {
    console.error("Erro ao buscar avaliações:", error);
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <p>Não foi possível carregar os dados do painel. Tente novamente mais tarde.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="bg-white shadow-sm">
        <div className="relative max-w-7xl mx-auto px-4 py-4">
          
          <div className="flex justify-center items-center gap-4">
             <Image 
              src="/oab-logo.png"
              alt="Logo da OAB/MA"
              width={200}
              height={200}
              className="h-12 w-auto"
            />
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">OAB/MA - Dashboard Administrativo</h1>
              <p className="text-gray-600 mt-1">Painel de Controle das Avaliações de Setores</p>
            </div>
          </div>

          <div className="absolute top-1/2 right-4 -translate-y-1/2">
            <ThemeToggle />
          </div>

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <DashboardStats avaliacoes={avaliacoes} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <EvaluationCharts avaliacoes={avaliacoes} />
          <SectorAnalytics avaliacoes={avaliacoes} />
        </div>
        <EvaluationComments avaliacoes={avaliacoes} />
        <RecentEvaluations avaliacoes={avaliacoes} />
      </main>
    </div>
  )
}