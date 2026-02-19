import express from 'express';
import { login, criarUsuario, verificarToken } from '../controllers/auth.controller';
import { autenticarToken } from '../middleware/auth';

const router = express.Router();

// Rotas públicas
router.post('/login', login);

// Rotas protegidas (requerem autenticação)
router.post('/usuario', autenticarToken, criarUsuario);
router.get('/verificar', autenticarToken, verificarToken);

export default router;
