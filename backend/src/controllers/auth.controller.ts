
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'seu_secret_super_seguro_aqui_mude_em_producao';
const JWT_EXPIRES_IN = '24h';

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }
    const usuario = await prisma.usuario.findUnique({ where: { email: email.toLowerCase() } });
    if (!usuario || !usuario.ativo) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const token = jwt.sign({ id: usuario.id, email: usuario.email, nome: usuario.nome }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return res.json({ token, usuario: { id: usuario.id, email: usuario.email, nome: usuario.nome } });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao fazer login' });
  }
};

export const criarUsuario = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, senha, nome } = req.body;
    if (!email || !senha || !nome) {
      return res.status(400).json({ error: 'Email, senha e nome são obrigatórios' });
    }
    const usuarioExistente = await prisma.usuario.findUnique({ where: { email: email.toLowerCase() } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Este email já está cadastrado' });
    }
    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = await prisma.usuario.create({
      data: {
        email: email.toLowerCase(),
        senha: senhaHash,
        nome,
        ativo: true
      },
      select: {
        id: true,
        email: true,
        nome: true,
        ativo: true,
        created_at: true
      }
    });
    return res.status(201).json(novoUsuario);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

export const verificarToken = async (req: Request, res: Response): Promise<Response> => {
  try {
    const usuario = req.usuario;
    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }
    return res.json({ valido: true, usuario: { id: usuario.id, email: usuario.email, nome: usuario.nome } });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao verificar token' });
  }
};
