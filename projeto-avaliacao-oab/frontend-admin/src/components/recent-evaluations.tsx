import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function RecentEvaluations() {
  const recentEvaluations = [
    {
      id: "1247",
      lawyer: "Dr. João Silva",
      sector: "Atendimento ao Público",
      rating: 5,
      date: "2024-01-15",
      comment: "Excelente atendimento, muito prestativo",
    },
    {
      id: "1246",
      lawyer: "Dra. Maria Santos",
      sector: "Protocolo",
      rating: 4,
      date: "2024-01-15",
      comment: "Bom atendimento, processo rápido",
    },
    {
      id: "1245",
      lawyer: "Dr. Carlos Oliveira",
      sector: "Secretaria",
      rating: 3,
      date: "2024-01-14",
      comment: "Atendimento regular, pode melhorar",
    },
    {
      id: "1244",
      lawyer: "Dra. Ana Costa",
      sector: "Tesouraria",
      rating: 5,
      date: "2024-01-14",
      comment: "Muito eficiente e organizado",
    },
    {
      id: "1243",
      lawyer: "Dr. Pedro Lima",
      sector: "Biblioteca",
      rating: 4,
      date: "2024-01-13",
      comment: "Boa estrutura e acervo atualizado",
    },
  ]

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
                    <span className="font-medium text-gray-900">{evaluation.lawyer}</span>
                    <Badge variant="outline" className="text-xs">
                      {evaluation.sector}
                    </Badge>
                    <Badge className={`text-xs ${getRatingColor(evaluation.rating)}`}>{evaluation.rating} ★</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{evaluation.comment}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">#{evaluation.id}</span>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(evaluation.date).toLocaleDateString("pt-BR")}
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
