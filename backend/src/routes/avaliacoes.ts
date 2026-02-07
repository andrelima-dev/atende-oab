import { Router } from 'express';
import { createAvaliacao, getAvaliacoes } from '../controllers/avaliacoes.controller';

const router = Router();

// POST /api/avaliacoes - Criar nova avaliação
router.post('/', createAvaliacao);

// GET /api/avaliacoes - Listar todas as avaliações
router.get('/', getAvaliacoes);

export default router;
