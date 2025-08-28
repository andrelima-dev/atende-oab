import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';


export type NovaAvaliacao = {
  nome: string;
  numero_ordem: string;
  setor: string;
  processo?: string;
  nota_atendimento: number;
  nota_clareza: number;
  nota_agilidade: number;
  nota_cordialidade: number;
  nota_eficiencia: number;
  comentario?: string;
};

export async function enviarAvaliacao(dados: NovaAvaliacao) {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/avalia-oab`, dados, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res.data;
  } catch (error: any) {
    console.error('Erro ao enviar avaliação:', error.response?.data || error.message);
    throw error;
  }
}
