import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createAvaliacao = async (req: Request, res: Response) => {
  try {
    const {
      nome_advogado,
      numero_ordem,
      processo,
      setor,
      nota_atendimento,
      nota_clareza,
      nota_agilidade,
      nota_cordialidade,
      nota_eficiencia,
      comentario
    } = req.body;

    // Validação básica
    if (!nome_advogado || !numero_ordem || !setor) {
      return res.status(400).json({
        error: 'Campos obrigatórios faltando',
        required: ['nome_advogado', 'numero_ordem', 'setor'],
        received: { nome_advogado, numero_ordem, setor }
      });
    }

    // Criar avaliação no banco
    const avaliacao = await prisma.avaliacao.create({
      data: {
        nome_advogado,
        numero_ordem,
        processo: processo || null,
        setor,
        nota_atendimento: nota_atendimento || null,
        nota_clareza: nota_clareza || null,
        nota_agilidade: nota_agilidade || null,
        nota_cordialidade: nota_cordialidade || null,
        nota_eficiencia: nota_eficiencia || null,
        comentario: comentario || null
      }
    });

    res.status(201).json({
      success: true,
      data: avaliacao,
      message: 'Avaliação criada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar avaliação:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({
      error: 'Erro ao criar avaliação',
      message: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};


export const getAvaliacoes = async (req: Request, res: Response) => {
  try {
    const avaliacoes = await prisma.avaliacao.findMany({
      orderBy: {
        created_at: 'desc'
      }
    });

    res.status(200).json({
      success: true,
      data: avaliacoes,
      count: avaliacoes.length
    });
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({
      error: 'Erro ao buscar avaliações',
      message: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

