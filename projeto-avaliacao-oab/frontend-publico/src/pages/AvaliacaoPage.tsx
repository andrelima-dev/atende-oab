"use client"

import type React from "react"

import { useState, useEffect } from "react"
import StarRating from "../components/StarRating"
import axios from "axios"
import "./AvaliacaoPage.css"
import TelaSucesso from "../components/TelaSucesso"

const setores = ["Financeiro / Tesouraria", "Tecnologia da Informação", "TED", "ESA/MA"]

const AvaliacaoPage = () => {
  const [foiEnviado, setFoiEnviado] = useState(false)
  const [nome, setNome] = useState("")
  const [oab, setOab] = useState("")
  const [setorSelecionado, setSetorSelecionado] = useState("Tecnologia da Informação")
  const [numeroProcesso, setNumeroProcesso] = useState("Não aplicável")
  const [notaSuporte, setNotaSuporte] = useState(0)
  const [notaClareza, setNotaClareza] = useState(0)
  const [notaAgilidade, setNotaAgilidade] = useState(0)
  const [notaCordialidade, setNotaCordialidade] = useState(0)
  const [notaEficiencia, setNotaEficiencia] = useState(0)
  const [comentario, setComentario] = useState("")
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const processo = params.get("processo")
    if (processo) setNumeroProcesso(processo)
  }, [])

  const resetarFormulario = () => {
    setFoiEnviado(false)
    setNome("")
    setOab("")
    setComentario("")
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setMensagem({ tipo: "", texto: "" })

    if (!nome || !oab) {
      setMensagem({ tipo: "danger", texto: "Por favor, preencha seu nome e número da Ordem." })
      return
    }
    if (
      notaSuporte === 0 ||
      notaClareza === 0 ||
      notaAgilidade === 0 ||
      notaCordialidade === 0 ||
      notaEficiencia === 0
    ) {
      setMensagem({ tipo: "danger", texto: "Por favor, avalie todas as 5 categorias com estrelas." })
      return
    }

    const avaliacaoParaEnviar = {
      nome,
      oab,
      processo: numeroProcesso,
      setor: setorSelecionado,
      comentario,
      notas: {
        suporte_tecnico: notaSuporte,
        clareza_resolucao: notaClareza,
        agilidade_atendimento: notaAgilidade,
        cordialidade: notaCordialidade,
        eficiencia: notaEficiencia,
      },
    }

    const API_BACKEND_URL = "http://localhost:3001/api/avaliacoes"

    try {
      setMensagem({ tipo: "info", texto: "Enviando sua avaliação..." })
      await axios.post(API_BACKEND_URL, avaliacaoParaEnviar)
      setFoiEnviado(true)
    } catch (error) {
      setMensagem({ tipo: "danger", texto: "Ocorreu um erro ao conectar com o servidor. Tente novamente." })
      console.error("Erro ao enviar avaliação:", error)
    }
  }

  return (
    <div className="form-card">
      {foiEnviado ? (
        <TelaSucesso onReset={resetarFormulario} />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h2 className="section-title">Identificação do Advogado</h2>
            <div className="input-group">
              <div className="input-field">
                <label htmlFor="nome">Nome Completo *</label>
                <input
                  type="text"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  placeholder="Digite seu nome completo"
                />
              </div>
              <div className="input-field">
                <label htmlFor="oab">Número da OAB *</label>
                <input
                  type="text"
                  id="oab"
                  value={oab}
                  onChange={(e) => setOab(e.target.value)}
                  required
                  placeholder="Ex: 12345/MA"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">Selecione o setor para avaliação</h2>
            <div className="setor-selection">
              {setores.map((setor) => (
                <button
                  key={setor}
                  type="button"
                  className={`setor-btn ${setorSelecionado === setor ? "active" : ""}`}
                  onClick={() => setSetorSelecionado(setor)}
                >
                  <span>{setor}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">Avaliação do Setor: {setorSelecionado}</h2>

            <div className="rating-group">
              <label>
                Suporte prestado:{" "}
                <span className="question-text">O setor atende às demandas de forma satisfatória?</span>
              </label>
              <StarRating onRatingChange={setNotaSuporte} />
            </div>
            <div className="rating-group">
              <label>
                Clareza na resolução do problema:{" "}
                <span className="question-text">As respostas foram claras, completas e compreensíveis?</span>
              </label>
              <StarRating onRatingChange={setNotaClareza} />
            </div>
            <div className="rating-group">
              <label>
                Agilidade da resposta:{" "}
                <span className="question-text">O setor responde rapidamente às solicitações?</span>
              </label>
              <StarRating onRatingChange={setNotaAgilidade} />
            </div>
            <div className="rating-group">
              <label>
                Cordialidade / Atendimento:{" "}
                <span className="question-text">O trato com o usuário é respeitoso e profissional?</span>
              </label>
              <StarRating onRatingChange={setNotaCordialidade} />
            </div>
            <div className="rating-group">
              <label>
                Eficiência / Resultado final:{" "}
                <span className="question-text">O problema foi efetivamente resolvido?</span>
              </label>
              <StarRating onRatingChange={setNotaEficiencia} />
            </div>

            <div className="textarea-field">
              <label htmlFor="comentario">Comentários adicionais (opcional)</label>
              <textarea
                id="comentario"
                rows={5}
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Deixe sua sugestão ou elogio..."
              ></textarea>
            </div>
          </div>

          {mensagem.texto && <div className={`alert alert-${mensagem.tipo}`}>{mensagem.texto}</div>}

          <div className="submit-container">
            <button type="submit" className="submit-button">
              Enviar Avaliação
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default AvaliacaoPage
