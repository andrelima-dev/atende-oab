import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { StarRating } from "@/components/star-rating"
import { ProgressBar } from "@/components/progress-bar"
import { CheckCircle, Building2, Laptop, DollarSign, Users } from "lucide-react"

interface FormData {
  name: string
  oabNumber: string
  sector: string
  ratings: { [key: string]: number }
  comments: string
}

const sectors = [
  { id: "financeiro", name: "Financeiro", icon: DollarSign },
  { id: "ti", name: "Tecnologia da Informação", icon: Laptop },
  { id: "administrativo", name: "Administrativo", icon: Building2 },
  { id: "atendimento", name: "Atendimento", icon: Users },
]

const criteria = [
  "Qualidade do atendimento",
  "Tempo de resposta",
  "Conhecimento técnico",
  "Organização",
  "Satisfação geral",
]

export function EvaluationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    oabNumber: "",
    sector: "",
    ratings: {},
    comments: "",
  })

  const totalSteps = 5

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const updateRating = (criterion: string, rating: number) => {
    setFormData((prev) => ({
      ...prev,
      ratings: { ...prev.ratings, [criterion]: rating },
    }))
  }

  const handleSubmit = () => {
    console.log("Avaliação enviada:", formData)
    alert("Avaliação enviada com sucesso!")
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Identificação do Advogado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  placeholder="Digite seu nome completo"
                />
              </div>
              <div>
                <Label htmlFor="oab">Número da OAB</Label>
                <Input
                  id="oab"
                  value={formData.oabNumber}
                  onChange={(e) => updateFormData("oabNumber", e.target.value)}
                  placeholder="Digite seu número da OAB"
                />
              </div>
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Seleção do Setor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sectors.map((sector) => {
                  const Icon = sector.icon
                  return (
                    <Button
                      key={sector.id}
                      variant={formData.sector === sector.id ? "default" : "outline"}
                      className="h-20 flex flex-col items-center justify-center space-y-2"
                      onClick={() => updateFormData("sector", sector.id)}
                    >
                      <Icon className="h-6 w-6" />
                      <span>{sector.name}</span>
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Avaliação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {criteria.map((criterion) => (
                <div key={criterion} className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">{criterion}</span>
                  <div className="flex items-center space-x-3">
                    <StarRating
                      rating={formData.ratings[criterion] || 0}
                      onRatingChange={(rating) => updateRating(criterion, rating)}
                    />
                    <span className="text-sm text-gray-500 min-w-[30px]">{formData.ratings[criterion] || 0}/5</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )

      case 4:
        return (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Comentários</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="comments">Comentários adicionais (opcional)</Label>
                <Textarea
                  id="comments"
                  value={formData.comments}
                  onChange={(e) => updateFormData("comments", e.target.value)}
                  placeholder="Deixe seus comentários sobre o atendimento..."
                  rows={5}
                />
              </div>
            </CardContent>
          </Card>
        )

      case 5:
        const selectedSector = sectors.find((s) => s.id === formData.sector)
        return (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Confirmação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div>
                  <span className="font-medium text-gray-700">Nome:</span>
                  <span className="ml-2 text-gray-900">{formData.name}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">OAB:</span>
                  <span className="ml-2 text-gray-900">{formData.oabNumber}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Setor:</span>
                  <span className="ml-2 text-gray-900">{selectedSector?.name}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Avaliações:</span>
                  <div className="mt-2 space-y-1">
                    {criteria.map((criterion) => (
                      <div key={criterion} className="flex justify-between">
                        <span className="text-sm text-gray-600">{criterion}:</span>
                        <span className="text-sm font-medium">{formData.ratings[criterion] || 0}/5</span>
                      </div>
                    ))}
                  </div>
                </div>
                {formData.comments && (
                  <div>
                    <span className="font-medium text-gray-700">Comentários:</span>
                    <p className="mt-1 text-sm text-gray-600">{formData.comments}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      {renderStep()}

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
          Anterior
        </Button>

        {currentStep === totalSteps ? (
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
            <CheckCircle className="h-4 w-4 mr-2" />
            Enviar Avaliação
          </Button>
        ) : (
          <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
            Próximo
          </Button>
        )}
      </div>
    </div>
  )
}
