
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

// Listar todos os usuários (protegido)
export const listarUsuarios = async (req: Request, res: Response): Promise<Response> => {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        email: true,
        nome: true,
        ativo: true,
        created_at: true,
        updated_at: true
      },
      orderBy: { created_at: 'desc' }
    });
    return res.json({ success: true, data: usuarios });
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    return res.status(500).json({ error: 'Erro ao listar usuários' });
  }
};

// Buscar usuário por ID (protegido)
export const buscarUsuario = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const usuarioId = Array.isArray(id) ? id[0] : id;
    
    const usuario = await prisma.usuario.findUnique({
      where: { id: parseInt(usuarioId) },
      select: {
        id: true,
        email: true,
        nome: true,
        ativo: true,
        created_at: true,
        updated_at: true
      }
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    return res.json({ success: true, data: usuario });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
};

// Atualizar usuário (protegido)
export const atualizarUsuario = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const usuarioId = Array.isArray(id) ? id[0] : id;
    const { email, nome, senha, ativo } = req.body;

    // Verificar se o usuário existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { id: parseInt(usuarioId) }
    });

    if (!usuarioExistente) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Verificar se o email já está em uso por outro usuário
    if (email && email !== usuarioExistente.email) {
      const emailEmUso = await prisma.usuario.findUnique({
        where: { email: email.toLowerCase() }
      });
      if (emailEmUso) {
        return res.status(400).json({ error: 'Este email já está cadastrado' });
      }
    }

    // Preparar dados para atualização
    const dataToUpdate: any = {};
    if (email !== undefined) dataToUpdate.email = email.toLowerCase();
    if (nome !== undefined) dataToUpdate.nome = nome;
    if (ativo !== undefined) dataToUpdate.ativo = ativo;
    
    // Atualizar senha se fornecida
    if (senha) {
      dataToUpdate.senha = await bcrypt.hash(senha, 10);
    }

    const usuarioAtualizado = await prisma.usuario.update({
      where: { id: parseInt(usuarioId) },
      data: dataToUpdate,
      select: {
        id: true,
        email: true,
        nome: true,
        ativo: true,
        created_at: true,
        updated_at: true
      }
    });

    return res.json({ success: true, data: usuarioAtualizado });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};

// Deletar usuário (protegido)
export const deletarUsuario = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const usuarioId = Array.isArray(id) ? id[0] : id;
    const usuarioLogado = req.usuario;

    // Verificar se está tentando deletar a si mesmo
    if (usuarioLogado && usuarioLogado.id === parseInt(usuarioId)) {
      return res.status(400).json({ error: 'Você não pode deletar sua própria conta' });
    }

    // Verificar se o usuário existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { id: parseInt(usuarioId) }
    });

    if (!usuarioExistente) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    await prisma.usuario.delete({
      where: { id: parseInt(usuarioId) }
    });

    return res.json({ success: true, message: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    return res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
};

// Alternar status do usuário (ativar/desativar) (protegido)
export const toggleUsuarioStatus = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const usuarioId = Array.isArray(id) ? id[0] : id;
    const usuarioLogado = req.usuario;

    // Verificar se está tentando desativar a si mesmo
    if (usuarioLogado && usuarioLogado.id === parseInt(usuarioId)) {
      return res.status(400).json({ error: 'Você não pode desativar sua própria conta' });
    }

    // Buscar usuário atual
    const usuario = await prisma.usuario.findUnique({
      where: { id: parseInt(usuarioId) }
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Alternar o status
    const usuarioAtualizado = await prisma.usuario.update({
      where: { id: parseInt(usuarioId) },
      data: { ativo: !usuario.ativo },
      select: {
        id: true,
        email: true,
        nome: true,
        ativo: true,
        created_at: true,
        updated_at: true
      }
    });

    return res.json({ 
      success: true, 
      data: usuarioAtualizado,
      message: `Usuário ${usuarioAtualizado.ativo ? 'ativado' : 'desativado'} com sucesso`
    });
  } catch (error) {
    console.error('Erro ao alternar status do usuário:', error);
    return res.status(500).json({ error: 'Erro ao alternar status do usuário' });
  }
};
