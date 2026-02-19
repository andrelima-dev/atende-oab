import { Router } from 'express';
import { createAvaliacao, getAvaliacoes, getSetores } from '../controllers/avaliacoes.controller';

const router = Router();

// POST /api/avaliacoes - Criar nova avaliação
router.post('/', createAvaliacao);

// GET /api/avaliacoes - Listar todas as avaliações
router.get('/', getAvaliacoes);

// GET /api/avaliacoes/setores - Listar todos os setores
router.get('/setores', getSetores);

export default router;
