import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Users, TrendingUp, BarChart3 } from "lucide-react";

type DashboardStatsProps = {
  avaliacoes: any[];
};

export function DashboardStats({ avaliacoes }: DashboardStatsProps) {
  const totalAvaliacoes = avaliacoes.length;
  const somaNotas = avaliacoes.reduce((acc, avaliacao) => acc + (avaliacao.nota_atendimento || 0), 0);
  const mediaGeral = totalAvaliacoes > 0 ? (somaNotas / totalAvaliacoes).toFixed(1) : "0.0";
  const setoresUnicos = new Set(avaliacoes.map(a => a.setor));
  const totalSetores = setoresUnicos.size;
  const avaliacoesPositivas = avaliacoes.filter(a => (a.nota_atendimento || 0) >= 4).length;
  const taxaSatisfacaoNumerica = totalAvaliacoes > 0 ? Math.round((avaliacoesPositivas / totalAvaliacoes) * 100) : 0;
  const taxaSatisfacao = `${taxaSatisfacaoNumerica}%`;

  const stats = [
    { title: "Total de Avaliações", value: totalAvaliacoes.toString(), change: "Dados atualizados", icon: Users, color: "text-blue-600" },
    { title: "Média Geral", value: mediaGeral, change: `Baseado em ${totalAvaliacoes} notas`, icon: Star, color: "text-yellow-600" },
    { title: "Setores Avaliados", value: totalSetores.toString(), change: "Setores com avaliações", icon: BarChart3, color: "text-green-600" },
    { title: "Taxa de Satisfação", value: taxaSatisfacao, change: "Notas 4 ou 5 estrelas", icon: TrendingUp, color: "text-purple-600" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}