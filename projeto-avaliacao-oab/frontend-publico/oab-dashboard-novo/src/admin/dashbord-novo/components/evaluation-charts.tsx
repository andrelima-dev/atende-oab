"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type EvaluationChartsProps = {
  avaliacoes: any[];
};

export function EvaluationCharts({ avaliacoes }: EvaluationChartsProps) {
  const totalEvaluations = avaliacoes.length;

  const getRatingDistribution = () => {
    const counts: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    for (const avaliacao of avaliacoes) {
      const rating = avaliacao.nota_atendimento;
      if (rating >= 1 && rating <= 5) {
        counts[rating]++;
      }
    }

    const ratingData = [
      { stars: 5, color: "bg-emerald-500", textColor: "text-emerald-600" },
      { stars: 4, color: "bg-blue-500", textColor: "text-blue-600" },
      { stars: 3, color: "bg-amber-500", textColor: "text-amber-600" },
      { stars: 2, color: "bg-orange-500", textColor: "text-orange-600" },
      { stars: 1, color: "bg-red-500", textColor: "text-red-600" },
    ];

    return ratingData.map(item => {
      const count = counts[item.stars];
      const percentage = totalEvaluations > 0 ? Math.round((count / totalEvaluations) * 100) : 0;
      return { ...item, count, percentage };
    });
  };

  const ratingDistribution = getRatingDistribution();

  return (
    // A div que continha o ThemeToggle foi removida daqui
    <Card className="bg-card dark:bg-card border border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Distribuição por Estrelas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center mb-8">
          <div className="relative w-56 h-56">
            <svg className="w-56 h-56 transform -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="25" fill="none" stroke="currentColor" strokeWidth="12" className="text-muted opacity-20" />
              {ratingDistribution.map((item, index) => {
                const previousPercentage = ratingDistribution.slice(0, index).reduce((sum, prev) => sum + prev.percentage, 0);
                const circumference = 2 * Math.PI * 25;
                const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
                const strokeDashoffset = -((previousPercentage / 100) * circumference);
                return (
                  <circle key={index} cx="60" cy="60" r="25" fill="none" strokeWidth="12" strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} className={`${item.color.replace("bg-", "stroke-")} transition-all duration-500 hover:stroke-width-[14] cursor-pointer`} strokeLinecap="round" />
                )
              })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">{totalEvaluations}</div>
                <div className="text-sm text-muted-foreground">Avaliações</div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {ratingDistribution.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-all duration-200 cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className={`w-5 h-5 rounded-full ${item.color} shadow-sm group-hover:scale-110 transition-transform`}></div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{item.stars}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => ( <span key={i} className={`text-sm ${i < item.stars ? "text-yellow-500" : "text-muted-foreground"}`}>★</span> ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">{item.count}</div>
                  <div className="text-xs text-muted-foreground">avaliações</div>
                </div>
                <div className={`text-xl font-bold ${item.textColor} min-w-[3rem] text-right`}>{item.percentage}%</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}