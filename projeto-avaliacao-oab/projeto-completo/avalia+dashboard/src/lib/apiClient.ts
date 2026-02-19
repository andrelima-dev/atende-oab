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

export interface Setor {
  id: number;
  nome: string;
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

  // Método para obter headers com autenticação
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  // Criar avaliação (público - sem autenticação necessária)
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

  // Buscar todas as avaliações (protegido - requer autenticação)
  async getAll(params?: {
    page?: number;
    limit?: number;
    setor?: string;
    dataInicio?: string;
    dataFim?: string;
    busca?: string;
  }): Promise<{ data: Avaliacao[]; pagination?: any }> {
    try {
      // Construir query string
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.setor) queryParams.append('setor', params.setor);
      if (params?.dataInicio) queryParams.append('dataInicio', params.dataInicio);
      if (params?.dataFim) queryParams.append('dataFim', params.dataFim);
      if (params?.busca) queryParams.append('busca', params.busca);

      const queryString = queryParams.toString();
      const url = `${this.baseUrl}/avaliacoes${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || result.message || 'Erro ao buscar avaliações');
      }

      return { 
        data: result.data || [], 
        pagination: result.pagination 
      };
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
      throw error;
    }
  }

  // Buscar setores (público - não requer autenticação)
  async getSetores(): Promise<Setor[]> {
    try {
      const response = await fetch(`${this.baseUrl}/avaliacoes/setores`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || result.message || 'Erro ao buscar setores');
      }

      return result.data || [];
    } catch (error) {
      console.error('Erro ao buscar setores:', error);
      throw error;
    }
  }

  // Buscar estatísticas (protegido - requer autenticação)
  async getEstatisticas(params?: {
    dataInicio?: string;
    dataFim?: string;
  }): Promise<any> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.dataInicio) queryParams.append('dataInicio', params.dataInicio);
      if (params?.dataFim) queryParams.append('dataFim', params.dataFim);

      const queryString = queryParams.toString();
      const url = `${this.baseUrl}/avaliacoes/estatisticas${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || result.message || 'Erro ao buscar estatísticas');
      }

      return result.data || {};
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      throw error;
    }
  }

  // Deletar avaliação (protegido - requer autenticação)
  async delete(id: number): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${this.baseUrl}/avaliacoes/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || result.message || 'Erro ao deletar avaliação');
      }

      return result;
    } catch (error) {
      console.error('Erro ao deletar avaliação:', error);
      throw error;
    }
  }

  // Atualizar avaliação (protegido - requer autenticação)
  async update(id: number, avaliacao: Partial<AvaliacaoInput>): Promise<ApiResponse<Avaliacao>> {
    try {
      const response = await fetch(`${this.baseUrl}/avaliacoes/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(avaliacao),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || result.message || 'Erro ao atualizar avaliação');
      }

      return result;
    } catch (error) {
      console.error('Erro ao atualizar avaliação:', error);
      throw error;
    }
  }
}

export const api = new ApiClient(API_URL);
