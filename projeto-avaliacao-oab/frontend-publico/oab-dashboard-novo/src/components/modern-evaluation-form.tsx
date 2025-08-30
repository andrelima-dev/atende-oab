import { useState, useEffect } from "react"

const setores = ["Financeiro / Tesouraria", "Tecnologia da Informação", "TED", "ESA/MA"]

const avaliacaoCategories = [
  {
    key: "suporte",
    label: "Suporte prestado",
    question: "O setor atende às demandas de forma satisfatória?",
  },
  {
    key: "clareza",
    label: "Clareza na resolução do problema",
    question: "As respostas foram claras, completas e compreensíveis?",
  },
  {
    key: "agilidade",
    label: "Agilidade da resposta",
    question: "O setor responde rapidamente às solicitações?",
  },
  {
    key: "cordialidade",
    label: "Cordialidade / Atendimento",
    question: "O trato com o usuário é respeitoso e profissional?",
  },
  {
    key: "eficiencia",
    label: "Eficiência / Resultado final",
    question: "O problema foi efetivamente resolvido?",
  },
]

const ScaleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M16 11V3a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8"></path>
    <path d="M8 21h8"></path>
    <path d="M12 17v4"></path>
    <path d="M2 14l1.5-1.5c.8-.8 2.1-.8 2.9 0L8 14"></path>
    <path d="M16 14l1.6-1.5c.8-.8 2.1-.8 2.9 0L22 14"></path>
  </svg>
)

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)

const BuildingIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
    <path d="M10 6h4"></path>
    <path d="M10 10h4"></path>
    <path d="M10 14h4"></path>
    <path d="M10 18h4"></path>
  </svg>
)

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
  </svg>
)

const SendIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M22 2L11 13"></path>
    <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
  </svg>
)

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
)

const AlertIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
)

import StarRating from "./star-rating"
import SuccessScreen from "./success-screen"
import ProgressIndicator from "./progress-indicator"

export default function ModernEvaluationForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [foiEnviado, setFoiEnviado] = useState(false)
  const [loading, setLoading] = useState(false)

  // Form data
  const [nome, setNome] = useState("")
  const [oab, setOab] = useState("")
  const [setorSelecionado, setSetorSelecionado] = useState("")
  const [numeroProcesso, setNumeroProcesso] = useState("Não aplicável")
  const [ratings, setRatings] = useState({
    suporte: 0,
    clareza: 0,
    agilidade: 0,
    cordialidade: 0,
    eficiencia: 0,
  })
  const [comentario, setComentario] = useState("")
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" })

  const steps = ["Identificação", "Seleção do Setor", "Avaliação", "Comentários", "Confirmação"]

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const processo = params.get("processo")
    if (processo) setNumeroProcesso(processo)
  }, [])

  const resetarFormulario = () => {
    setFoiEnviado(false)
    setCurrentStep(0)
    setNome("")
    setOab("")
    setSetorSelecionado("")
    setRatings({
      suporte: 0,
      clareza: 0,
      agilidade: 0,
      cordialidade: 0,
      eficiencia: 0,
    })
    setComentario("")
    setMensagem({ tipo: "", texto: "" })
  }

  const handleRatingChange = (category: string, rating: number) => {
    setRatings((prev) => ({ ...prev, [category]: rating }))
  }

  const canProceedToNext = () => {
    switch (currentStep) {
      case 0:
        return nome.trim() && oab.trim()
      case 1:
        return setorSelecionado
      case 2:
        return Object.values(ratings).every((rating) => rating > 0)
      case 3:
        return true // Comments are optional
      case 4:
        return true
      default:
        return false
    }
  }

  const handleNext = () => {
    if (canProceedToNext() && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    setMensagem({ tipo: "", texto: "" })

    const avaliacaoParaEnviar = {
      nome,
      oab,
      processo: numeroProcesso,
      setor: setorSelecionado,
      comentario,
      notas: {
        suporte_tecnico: ratings.suporte,
        clareza_resolucao: ratings.clareza,
        agilidade_atendimento: ratings.agilidade,
        cordialidade: ratings.cordialidade,
        eficiencia: ratings.eficiencia,
      },
    }

    try {
      setMensagem({ tipo: "info", texto: "Enviando sua avaliação..." })

      const response = await fetch("http://localhost:3001/api/avaliacoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(avaliacaoParaEnviar),
      })

      if (response.ok) {
        setFoiEnviado(true)
      } else {
        throw new Error("Erro na resposta do servidor")
      }
    } catch (error) {
      setMensagem({
        tipo: "error",
        texto: "Ocorreu um erro ao conectar com o servidor. Tente novamente.",
      })
      console.error("Erro ao enviar avaliação:", error)
    } finally {
      setLoading(false)
    }
  }

  const getMediaGeral = () => {
    const total = Object.values(ratings).reduce((sum, rating) => sum + rating, 0)
    return (total / 5).toFixed(1)
  }

  if (foiEnviado) {
    return <SuccessScreen onReset={resetarFormulario} />
  }

  return (
    <div className="min-h-screen text-slate-800 bg-slate-800">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3 font-sans font-semibold leading-7 tracking-normal text-justify">
            <ScaleIcon className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-blue-600 text-right flex-row">Sistema de Avaliação</h1>
              <p className="text-sm text-gray-600">OAB/MA - Seccional Maranhão</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <ProgressIndicator currentStep={currentStep} totalSteps={steps.length} steps={steps} />

        <div className="bg-white rounded-lg shadow-lg">
          <div className="text-center pb-6 pt-6 px-6 border-b">
            <h2 className="text-2xl text-blue-600 font-bold">
              {currentStep === 0 && "Identificação do Advogado"}
              {currentStep === 1 && "Seleção do Setor"}
              {currentStep === 2 && `Avaliação do Setor: ${setorSelecionado}`}
              {currentStep === 3 && "Comentários Adicionais"}
              {currentStep === 4 && "Confirmação dos Dados"}
            </h2>
          </div>

          <div className="p-6 space-y-6">
            {/* Step 0: Identification */}
            {currentStep === 0 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="nome" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <UserIcon className="w-4 h-4" />
                      Nome Completo *
                    </label>
                    <input
                      id="nome"
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Digite seu nome completo"
                      className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="oab" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <ScaleIcon className="w-4 h-4" />
                      Número da OAB *
                    </label>
                    <input
                      id="oab"
                      type="text"
                      value={oab}
                      onChange={(e) => setOab(e.target.value)}
                      placeholder="Ex: 12345/MA"
                      className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Sector Selection */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <BuildingIcon className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                  <p className="text-gray-600">Selecione o setor que você deseja avaliar</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {setores.map((setor) => (
                    <button
                      key={setor}
                      className={`h-16 text-left justify-start p-4 transition-all border rounded-md ${
                        setorSelecionado === setor
                          ? "bg-blue-600 text-white border-blue-600 ring-2 ring-blue-500 ring-offset-2"
                          : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                      }`}
                      onClick={() => setSetorSelecionado(setor)}
                    >
                      <div>
                        <div className="font-medium">{setor}</div>
                        <div className="text-xs opacity-75 mt-1">Clique para selecionar</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Ratings */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <StarIcon className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
                  <p className="text-gray-600">Avalie cada aspecto do atendimento de 1 a 5 estrelas</p>
                </div>
                {avaliacaoCategories.map((category) => (
                  <div
                    key={category.key}
                    className="border-l-4 border-l-yellow-500 bg-white rounded-lg shadow-sm border"
                  >
                    <div className="pt-6 px-6 pb-6">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{category.label}</h3>
                          <p className="text-sm text-gray-600">{category.question}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <StarRating
                            onRatingChange={(rating) => handleRatingChange(category.key, rating)}
                            initialRating={ratings[category.key as keyof typeof ratings]}
                            size="lg"
                          />
                          <span className="ml-4 px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
                            {ratings[category.key as keyof typeof ratings] || 0}/5
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 3: Comments */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <p className="text-gray-600">Compartilhe comentários adicionais sobre sua experiência (opcional)</p>
                </div>
                <div className="space-y-2">
                  <label htmlFor="comentario" className="text-sm font-medium text-gray-700">
                    Comentários Adicionais
                  </label>
                  <textarea
                    id="comentario"
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    placeholder="Deixe sua sugestão, elogio ou observação..."
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <CheckCircleIcon className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Confirme seus dados</h3>
                  <p className="text-gray-600">Revise as informações antes de enviar</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg border shadow-sm">
                    <div className="px-4 py-3 border-b">
                      <h4 className="text-sm font-medium text-gray-900">Dados Pessoais</h4>
                    </div>
                    <div className="p-4 space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Nome:</span>
                        <p className="text-sm text-gray-600">{nome}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">OAB:</span>
                        <p className="text-sm text-gray-600">{oab}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Setor:</span>
                        <p className="text-sm text-gray-600">{setorSelecionado}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border shadow-sm">
                    <div className="px-4 py-3 border-b">
                      <h4 className="text-sm font-medium text-gray-900">Avaliação</h4>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Média Geral:</span>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm font-medium">
                          {getMediaGeral()} ⭐
                        </span>
                      </div>
                      {avaliacaoCategories.map((category) => (
                        <div key={category.key} className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">{category.label}:</span>
                          <span className="text-xs text-gray-900">
                            {ratings[category.key as keyof typeof ratings]}/5
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {comentario && (
                  <div className="bg-white rounded-lg border shadow-sm">
                    <div className="px-4 py-3 border-b">
                      <h4 className="text-sm font-medium text-gray-900">Comentário</h4>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600">{comentario}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Messages */}
            {mensagem.texto && (
              <div
                className={`p-4 rounded-md border ${
                  mensagem.tipo === "error"
                    ? "border-red-300 bg-red-50 text-red-800"
                    : "border-blue-300 bg-blue-50 text-blue-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <AlertIcon className="h-4 w-4" />
                  <span className="text-sm">{mensagem.texto}</span>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>

              <div className="flex gap-2">
                {currentStep < steps.length - 1 ? (
                  <button
                    onClick={handleNext}
                    disabled={!canProceedToNext()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Próximo
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <SendIcon className="w-4 h-4" />
                        Enviar Avaliação
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
