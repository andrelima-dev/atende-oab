import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, MessageSquare, Star } from "lucide-react"

// Mock data para comentários
const mockComments = [
  {
    id: 1,
    sector: "ESA",
    department: "Coordenação Acadêmica",
    rating: 5,
    comment:
      "Excelente atendimento e organização dos cursos. A equipe é muito profissional e sempre disposta a ajudar.",
    author: "Advogado(a) - OAB 12345",
    date: "2024-01-15",
    sentiment: "positive",
  },
  {
    id: 2,
    sector: "Tecnologia da Informação",
    department: "Suporte Técnico",
    rating: 4,
    comment: "O suporte é eficiente, mas às vezes demora um pouco para responder. No geral, resolvem bem os problemas.",
    author: "Advogado(a) - OAB 67890",
    date: "2024-01-14",
    sentiment: "positive",
  },
  {
    id: 3,
    sector: "TED",
    department: "Análise de Processos",
    rating: 3,
    comment: "O processo foi demorado, mas o resultado foi justo. Sugiro melhorar a comunicação durante o andamento.",
    author: "Advogado(a) - OAB 11111",
    date: "2024-01-13",
    sentiment: "neutral",
  },
  {
    id: 4,
    sector: "Financeiro",
    department: "Cobrança",
    rating: 2,
    comment: "Tive dificuldades para resolver uma questão de anuidade. O atendimento precisa melhorar.",
    author: "Advogado(a) - OAB 22222",
    date: "2024-01-12",
    sentiment: "negative",
  },
  {
    id: 5,
    sector: "ESA",
    department: "Biblioteca",
    rating: 5,
    comment: "Biblioteca muito bem organizada com excelente acervo. Funcionários sempre prestativos.",
    author: "Advogado(a) - OAB 33333",
    date: "2024-01-11",
    sentiment: "positive",
  },
  {
    id: 6,
    sector: "Tecnologia da Informação",
    department: "Desenvolvimento",
    rating: 4,
    comment: "O novo sistema está funcionando bem. Algumas funcionalidades ainda podem ser melhoradas.",
    author: "Advogado(a) - OAB 44444",
    date: "2024-01-10",
    sentiment: "positive",
  },
]

export function EvaluationComments() {
  const [selectedSector, setSelectedSector] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSentiment, setSelectedSentiment] = useState<string>("all")

  const filteredComments = mockComments.filter((comment) => {
    const matchesSector = selectedSector === "all" || comment.sector === selectedSector
    const matchesSearch =
      comment.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSentiment = selectedSentiment === "all" || comment.sentiment === selectedSentiment

    return matchesSector && matchesSearch && matchesSentiment
  })

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-800"
      case "negative":
        return "bg-red-100 text-red-800"
      case "neutral":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSentimentLabel = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "Positivo"
      case "negative":
        return "Negativo"
      case "neutral":
        return "Neutro"
      default:
        return "Indefinido"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <Card className="bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <CardTitle>Comentários das Avaliações</CardTitle>
          </div>
          <Badge variant="secondary">{filteredComments.length} comentários</Badge>
        </div>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar comentários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedSector} onValueChange={setSelectedSector}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filtrar por setor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os setores</SelectItem>
              <SelectItem value="ESA">ESA</SelectItem>
              <SelectItem value="Tecnologia da Informação">Tecnologia da Informação</SelectItem>
              <SelectItem value="TED">TED</SelectItem>
              <SelectItem value="Financeiro">Financeiro</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedSentiment} onValueChange={setSelectedSentiment}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filtrar por sentimento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="positive">Positivos</SelectItem>
              <SelectItem value="neutral">Neutros</SelectItem>
              <SelectItem value="negative">Negativos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {filteredComments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Nenhum comentário encontrado com os filtros aplicados.</p>
            </div>
          ) : (
            filteredComments.map((comment) => (
              <div key={comment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{comment.sector}</Badge>
                    <Badge variant="secondary" className="text-xs">
                      {comment.department}
                    </Badge>
                    <Badge className={getSentimentColor(comment.sentiment)}>
                      {getSentimentLabel(comment.sentiment)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(comment.rating)}
                    <span className="text-sm text-gray-600 ml-1">({comment.rating})</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-3 leading-relaxed">{comment.comment}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{comment.author}</span>
                  <span>{new Date(comment.date).toLocaleDateString("pt-BR")}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {filteredComments.length > 0 && (
          <div className="flex justify-center mt-6">
            <Button variant="outline">Carregar mais comentários</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
