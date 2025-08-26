import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api/avalia-oab';

export const enviarAvaliacao = async (avaliacaoData: {
  nome: string;
  oabNumber: string;
  setor: string;
  ratings: Record<string, number>;
  comentarios: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/avalia_oab`, avaliacaoData);
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar avaliação:', error);
    throw error;
  }
};