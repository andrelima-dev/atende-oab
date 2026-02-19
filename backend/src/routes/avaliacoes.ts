import { Router } from 'express';
import { 
  createAvaliacao, 
  getAvaliacoes, 
  getSetores,
  getAvaliacaoById,
  updateAvaliacao,
  deleteAvaliacao,
  getEstatisticas
} from '../controllers/avaliacoes.controller';
import { autenticarToken } from '../middleware/auth';

const router = Router();

// Rotas públicas
// POST /api/avaliacoes - Criar nova avaliação (público - formulário)
router.post('/', createAvaliacao);

// Rotas protegidas (requerem autenticação)
// GET /api/avaliacoes - Listar todas as avaliações com filtros e paginação
router.get('/', autenticarToken, getAvaliacoes);

// GET /api/avaliacoes/estatisticas - Estatísticas para o dashboard
router.get('/estatisticas', autenticarToken, getEstatisticas);

// GET /api/avaliacoes/setores - Listar todos os setores
router.get('/setores', autenticarToken, getSetores);

// GET /api/avaliacoes/:id - Buscar uma avaliação específica
router.get('/:id', autenticarToken, getAvaliacaoById);

// PUT /api/avaliacoes/:id - Atualizar uma avaliação
router.put('/:id', autenticarToken, updateAvaliacao);

// DELETE /api/avaliacoes/:id - Deletar uma avaliação
router.delete('/:id', autenticarToken, deleteAvaliacao);

export default router;
