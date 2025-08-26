// frontend-admin/src/services/AvaliacaoService.ts
import axios from 'axios';

// Define a URL base da nossa API do backend
const API_URL = 'http://localhost:3001/api';

// --- DEFINIÇÃO DE TIPOS (MANTENHA SINCRONIZADO COM O BACKEND) ---
// Este "molde" ajuda o TypeScript a entender o formato dos dados
export type Avaliacao = {
  id: number;
  data_criacao: string;
  processo: string;
  nota_atendimento: number;
  nota_clareza: number;
  nota_agilidade: number;
  nota_cordialidade: number;
  nota_eficiencia: number;
  comentario: string;
  setor: string;
  nome_advogado: string;
  numero_ordem: string;
};

/**
 * Busca todas as avaliações do backend.
 * Requer um token de autenticação para funcionar.
 */
export const fetchTodasAvaliacoes = async (): Promise<Avaliacao[]> => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error("Token de autenticação não encontrado.");
    }

    const response = await axios.get(`${API_URL}/avaliacoes`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Se a chamada foi bem-sucedida, retorna os dados
    return response.data.data;
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error);
    // Em caso de erro, retorna um array vazio ou lança o erro novamente
    throw error;
  }
};

/**
 * (Exemplo para o formulário público)
 * Envia uma nova avaliação para o backend.
 */
export const enviarNovaAvaliacao = async (dadosAvaliacao: Omit<Avaliacao, 'id' | 'data_criacao'>) => {
  try {
    const response = await axios.post(`${API_URL}/avaliacoes`, dadosAvaliacao);
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar nova avaliação:', error);
    throw error;
  }
};