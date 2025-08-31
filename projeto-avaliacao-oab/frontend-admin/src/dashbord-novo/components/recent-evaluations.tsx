import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type RecentEvaluationsProps = {
  avaliacoes: any[];
};

export function RecentEvaluations({ avaliacoes }: RecentEvaluationsProps) {
  const recentEvaluations = [...avaliacoes]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "bg-green-100 text-green-800"
    if (rating >= 3) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Avaliações Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentEvaluations.map((evaluation) => (
            <div key={evaluation.id} className="border-b border-gray-100 pb-4 last:border-b-0">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-900">{evaluation.nome_advogado}</span>
                    <Badge variant="outline" className="text-xs">{evaluation.setor}</Badge>
                    <Badge className={`text-xs ${getRatingColor(evaluation.nota_atendimento)}`}>{evaluation.nota_atendimento} ★</Badge>
                  </div>
                  {evaluation.comentario && <p className="text-sm text-gray-600">{evaluation.comentario}</p>}
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">#{evaluation.id}</span>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(evaluation.created_at).toLocaleDateString("pt-BR")}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}