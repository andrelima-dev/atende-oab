"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"

export function EvaluationCharts() {
  const monthlyData = [
    { month: "Jan", evaluations: 89 },
    { month: "Fev", evaluations: 112 },
    { month: "Mar", evaluations: 134 },
    { month: "Abr", evaluations: 156 },
    { month: "Mai", evaluations: 178 },
    { month: "Jun", evaluations: 203 },
  ]

  const ratingDistribution = [
    { stars: 5, count: 487, percentage: 39, color: "bg-emerald-500", textColor: "text-emerald-600" },
    { stars: 4, count: 356, percentage: 29, color: "bg-blue-500", textColor: "text-blue-600" },
    { stars: 3, count: 234, percentage: 19, color: "bg-amber-500", textColor: "text-amber-600" },
    { stars: 2, count: 123, percentage: 10, color: "bg-orange-500", textColor: "text-orange-600" },
    { stars: 1, count: 47, percentage: 3, color: "bg-red-500", textColor: "text-red-600" },
  ]

  const totalEvaluations = ratingDistribution.reduce((sum, item) => sum + item.count, 0)
  const maxMonthly = Math.max(...monthlyData.map((d) => d.evaluations))

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <ThemeToggle />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card dark:bg-card border border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Distribuição por Estrelas</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Modern donut chart */}
            <div className="flex items-center justify-center mb-8">
              <div className="relative w-56 h-56">
                <svg className="w-56 h-56 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="25"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    className="text-muted opacity-20"
                  />
                  {ratingDistribution.map((item, index) => {
                    const previousPercentage = ratingDistribution
                      .slice(0, index)
                      .reduce((sum, prev) => sum + prev.percentage, 0)
                    const circumference = 2 * Math.PI * 25
                    const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`
                    const strokeDashoffset = -((previousPercentage / 100) * circumference)

                    return (
                      <circle
                        key={index}
                        cx="60"
                        cy="60"
                        r="25"
                        fill="none"
                        strokeWidth="12"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className={`${item.color.replace("bg-", "stroke-")} transition-all duration-500 hover:stroke-width-[14] cursor-pointer`}
                        strokeLinecap="round"
                      />
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

            {/* Enhanced legend */}
            <div className="space-y-4">
              {ratingDistribution.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-5 h-5 rounded-full ${item.color} shadow-sm group-hover:scale-110 transition-transform`}
                    ></div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{item.stars}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${i < item.stars ? "text-yellow-500" : "text-muted-foreground"}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">{item.count}</div>
                      <div className="text-xs text-muted-foreground">avaliações</div>
                    </div>
                    <div className={`text-xl font-bold ${item.textColor} min-w-[3rem] text-right`}>
                      {item.percentage}%
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary stats */}
            <div className="mt-6 pt-4 border-t border-border">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-emerald-600">
                    {(((ratingDistribution[0].count + ratingDistribution[1].count) / totalEvaluations) * 100).toFixed(
                      1,
                    )}
                    %
                  </div>
                  <div className="text-xs text-muted-foreground">Satisfação Alta</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">
                    {(
                      ratingDistribution.reduce((sum, item) => sum + item.stars * item.count, 0) / totalEvaluations
                    ).toFixed(1)}
                  </div>
                  <div className="text-xs text-muted-foreground">Média Geral</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tendência Mensal */}
        <Card className="bg-card dark:bg-card border border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Tendência Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-end justify-between h-48 gap-3 p-4 bg-muted/30 rounded-lg">
                {monthlyData.map((data, index) => {
                  const height = (data.evaluations / maxMonthly) * 100
                  const isHighest = data.evaluations === maxMonthly

                  return (
                    <div key={index} className="flex flex-col items-center gap-2 group cursor-pointer">
                      <div className="relative">
                        <div
                          className={`w-8 rounded-t-lg transition-all duration-300 group-hover:opacity-80 ${
                            isHighest
                              ? "bg-gradient-to-t from-green-600 to-green-400"
                              : "bg-gradient-to-t from-blue-600 to-blue-400"
                          }`}
                          style={{ height: `${height * 1.5}px` }}
                        />
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border shadow-md">
                          {data.evaluations} avaliações
                        </div>
                      </div>
                      <span className="text-xs font-medium text-foreground">{data.month}</span>
                    </div>
                  )
                })}
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">
                    {Math.max(...monthlyData.map((d) => d.evaluations))}
                  </div>
                  <div className="text-xs text-muted-foreground">Maior mês</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">
                    {Math.round(monthlyData.reduce((sum, d) => sum + d.evaluations, 0) / monthlyData.length)}
                  </div>
                  <div className="text-xs text-muted-foreground">Média mensal</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">
                    +
                    {Math.round(
                      ((monthlyData[monthlyData.length - 1].evaluations - monthlyData[0].evaluations) /
                        monthlyData[0].evaluations) *
                        100,
                    )}
                    %
                  </div>
                  <div className="text-xs text-muted-foreground">Crescimento</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
