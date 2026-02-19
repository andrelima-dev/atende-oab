import express from 'express';
import { 
  login, 
  criarUsuario, 
  verificarToken,
  listarUsuarios,
  buscarUsuario,
  atualizarUsuario,
  deletarUsuario,
  toggleUsuarioStatus
} from '../controllers/auth.controller';
import { autenticarToken } from '../middleware/auth';

const router = express.Router();

// Rotas públicas
router.post('/login', login);

// Rotas protegidas (requerem autenticação)
router.get('/verificar', autenticarToken, verificarToken);

// Gestão de usuários (protegido)
router.get('/usuarios', autenticarToken, listarUsuarios);
router.get('/usuarios/:id', autenticarToken, buscarUsuario);
router.post('/usuarios', autenticarToken, criarUsuario);
router.put('/usuarios/:id', autenticarToken, atualizarUsuario);
router.delete('/usuarios/:id', autenticarToken, deletarUsuario);
router.patch('/usuarios/:id/toggle-status', autenticarToken, toggleUsuarioStatus);

export default router;
