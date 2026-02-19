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
    if (!nome_advogado || !numero_ordem || !setor) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }
    let setorRecord = await prisma.setor.findUnique({ where: { nome: setor } });
    if (!setorRecord) {
      setorRecord = await prisma.setor.create({ data: { nome: setor } });
    }
    const avaliacao = await prisma.avaliacao.create({
      data: {
        nome_advogado,
        numero_ordem,
        processo: processo || null,
        setor_id: setorRecord.id,
        nota_atendimento: nota_atendimento || null,
        nota_clareza: nota_clareza || null,
        nota_agilidade: nota_agilidade || null,
        nota_cordialidade: nota_cordialidade || null,
        nota_eficiencia: nota_eficiencia || null,
        comentario: comentario || null
      },
      include: { setor: true }
    });
    return res.status(201).json({ success: true, data: avaliacao });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar avaliação' });
  }
};

export const getAvaliacoes = async (req: Request, res: Response) => {
  try {
    const avaliacoes = await prisma.avaliacao.findMany({
      include: { setor: true },
      orderBy: { created_at: 'desc' }
    });
    const avaliacoesComSetor = avaliacoes.map(av => ({
      ...av,
      setor: av.setor.nome
    }));
    return res.status(200).json({ success: true, data: avaliacoesComSetor });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar avaliações' });
  }
};

export const getSetores = async (req: Request, res: Response) => {
  try {
    const setores = await prisma.setor.findMany({ orderBy: { nome: 'asc' } });
    return res.status(200).json({ success: true, data: setores });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar setores' });
  }
};
