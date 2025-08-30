import { DashboardStats } from "@/components/dashboard-stats"
import { SectorAnalytics } from "@/components/sector-analytics"
import { RecentEvaluations } from "@/components/recent-evaluations"
import { EvaluationCharts } from "@/components/evaluation-charts"
import { EvaluationComments } from "@/components/evaluation-comments"

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">OAB/MA - Dashboard Administrativo</h1>
            <p className="text-gray-600 mt-1">Painel de Controle das Avaliações de Setores</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <DashboardStats />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <EvaluationCharts />
          <SectorAnalytics />
        </div>
        <EvaluationComments />
        <RecentEvaluations />
      </main>
    </div>
  )
}
