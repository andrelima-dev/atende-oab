const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface AvaliacaoInput {
  nome_advogado: string;
  numero_ordem: string;
  processo?: string;
  setor: string;
  nota_atendimento?: number;
  nota_clareza?: number;
  nota_agilidade?: number;
  nota_cordialidade?: number;
  nota_eficiencia?: number;
  comentario?: string;
}

export interface Avaliacao extends AvaliacaoInput {
  id: number;
  created_at: string;
  data_criacao: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async create(avaliacao: AvaliacaoInput): Promise<ApiResponse<Avaliacao>> {
    try {
      const response = await fetch(`${this.baseUrl}/avaliacoes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(avaliacao),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Erro ao criar avaliação');
      }

      return data;
    } catch (error) {
      console.error('Erro ao criar avaliação:', error);
      throw error;
    }
  }

  async getAll(): Promise<Avaliacao[]> {
    try {
      const response = await fetch(`${this.baseUrl}/avaliacoes`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || result.message || 'Erro ao buscar avaliações');
      }

      return result.data || [];
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
      throw error;
    }
  }
}

export const api = new ApiClient(API_URL);
