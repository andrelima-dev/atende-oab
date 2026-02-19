import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Criar nova avaliação (público)
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

    // Validações
    if (!nome_advogado || !numero_ordem || !setor) {
      return res.status(400).json({ error: 'Campos obrigatórios: nome_advogado, numero_ordem e setor' });
    }

    // Validar notas (1 a 5)
    const notas = [nota_atendimento, nota_clareza, nota_agilidade, nota_cordialidade, nota_eficiencia];
    for (const nota of notas) {
      if (nota && (nota < 1 || nota > 5)) {
        return res.status(400).json({ error: 'As notas devem estar entre 1 e 5' });
      }
    }

    // Buscar ou criar setor
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
        nota_atendimento: nota_atendimento || 0,
        nota_clareza: nota_clareza || 0,
        nota_agilidade: nota_agilidade || 0,
        nota_cordialidade: nota_cordialidade || 0,
        nota_eficiencia: nota_eficiencia || 0,
        comentario: comentario || null
      },
      include: { setor: true }
    });

    return res.status(201).json({ success: true, data: avaliacao });
  } catch (error) {
    console.error('Erro ao criar avaliação:', error);
    return res.status(500).json({ error: 'Erro ao criar avaliação' });
  }
};

// Listar avaliações com paginação e filtros (protegido)
export const getAvaliacoes = async (req: Request, res: Response) => {
  try {
    const { 
      page = '1', 
      limit = '50', 
      setor, 
      dataInicio, 
      dataFim,
      busca 
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Construir filtros
    const where: any = {};

    if (setor && setor !== 'todos') {
      const setorRecord = await prisma.setor.findUnique({ 
        where: { nome: setor as string } 
      });
      if (setorRecord) {
        where.setor_id = setorRecord.id;
      }
    }

    if (dataInicio || dataFim) {
      where.created_at = {};
      if (dataInicio) {
        where.created_at.gte = new Date(dataInicio as string);
      }
      if (dataFim) {
        const dataFimObj = new Date(dataFim as string);
        dataFimObj.setHours(23, 59, 59, 999);
        where.created_at.lte = dataFimObj;
      }
    }

    if (busca) {
      where.OR = [
        { nome_advogado: { contains: busca as string, mode: 'insensitive' } },
        { numero_ordem: { contains: busca as string, mode: 'insensitive' } },
        { processo: { contains: busca as string, mode: 'insensitive' } }
      ];
    }

    // Buscar total e avaliações
    const [total, avaliacoes] = await Promise.all([
      prisma.avaliacao.count({ where }),
      prisma.avaliacao.findMany({
        where,
        include: { setor: true },
        orderBy: { created_at: 'desc' },
        skip,
        take: limitNum
      })
    ]);

    const avaliacoesComSetor = avaliacoes.map(av => ({
      ...av,
      setor: av.setor.nome
    }));

    return res.status(200).json({ 
      success: true, 
      data: avaliacoesComSetor,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error);
    return res.status(500).json({ error: 'Erro ao buscar avaliações' });
  }
};

// Buscar avaliação por ID (protegido)
export const getAvaliacaoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const avaliacaoId = Array.isArray(id) ? id[0] : id;
    
    const avaliacao = await prisma.avaliacao.findUnique({
      where: { id: parseInt(avaliacaoId) },
      include: { setor: true }
    });

    if (!avaliacao) {
      return res.status(404).json({ error: 'Avaliação não encontrada' });
    }

    const avaliacaoComSetor = {
      ...avaliacao,
      setor: avaliacao.setor.nome
    };

    return res.status(200).json({ success: true, data: avaliacaoComSetor });
  } catch (error) {
    console.error('Erro ao buscar avaliação:', error);
    return res.status(500).json({ error: 'Erro ao buscar avaliação' });
  }
};

// Atualizar avaliação (protegido)
export const updateAvaliacao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const avaliacaoId = Array.isArray(id) ? id[0] : id;
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

    // Verificar se existe
    const avaliacaoExistente = await prisma.avaliacao.findUnique({
      where: { id: parseInt(avaliacaoId) }
    });

    if (!avaliacaoExistente) {
      return res.status(404).json({ error: 'Avaliação não encontrada' });
    }

    // Validar notas se fornecidas
    const notas = [nota_atendimento, nota_clareza, nota_agilidade, nota_cordialidade, nota_eficiencia];
    for (const nota of notas) {
      if (nota !== undefined && nota !== null && (nota < 1 || nota > 5)) {
        return res.status(400).json({ error: 'As notas devem estar entre 1 e 5' });
      }
    }

    // Preparar dados para atualização
    const dataToUpdate: any = {};

    if (nome_advogado !== undefined) dataToUpdate.nome_advogado = nome_advogado;
    if (numero_ordem !== undefined) dataToUpdate.numero_ordem = numero_ordem;
    if (processo !== undefined) dataToUpdate.processo = processo || null;
    if (nota_atendimento !== undefined) dataToUpdate.nota_atendimento = nota_atendimento;
    if (nota_clareza !== undefined) dataToUpdate.nota_clareza = nota_clareza;
    if (nota_agilidade !== undefined) dataToUpdate.nota_agilidade = nota_agilidade;
    if (nota_cordialidade !== undefined) dataToUpdate.nota_cordialidade = nota_cordialidade;
    if (nota_eficiencia !== undefined) dataToUpdate.nota_eficiencia = nota_eficiencia;
    if (comentario !== undefined) dataToUpdate.comentario = comentario || null;

    // Atualizar setor se fornecido
    if (setor) {
      let setorRecord = await prisma.setor.findUnique({ where: { nome: setor } });
      if (!setorRecord) {
        setorRecord = await prisma.setor.create({ data: { nome: setor } });
      }
      dataToUpdate.setor_id = setorRecord.id;
    }

    const avaliacaoAtualizada = await prisma.avaliacao.update({
      where: { id: parseInt(avaliacaoId) },
      data: dataToUpdate,
      include: { setor: true }
    });

    return res.status(200).json({ 
      success: true, 
      data: {
        ...avaliacaoAtualizada,
        setor: avaliacaoAtualizada.setor.nome
      }
    });
  } catch (error) {
    console.error('Erro ao atualizar avaliação:', error);
    return res.status(500).json({ error: 'Erro ao atualizar avaliação' });
  }
};

// Deletar avaliação (protegido)
export const deleteAvaliacao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const avaliacaoId = Array.isArray(id) ? id[0] : id;

    // Verificar se existe
    const avaliacaoExistente = await prisma.avaliacao.findUnique({
      where: { id: parseInt(avaliacaoId) }
    });

    if (!avaliacaoExistente) {
      return res.status(404).json({ error: 'Avaliação não encontrada' });
    }

    await prisma.avaliacao.delete({
      where: { id: parseInt(avaliacaoId) }
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Avaliação deletada com sucesso' 
    });
  } catch (error) {
    console.error('Erro ao deletar avaliação:', error);
    return res.status(500).json({ error: 'Erro ao deletar avaliação' });
  }
};

// Estatísticas para o dashboard (protegido)
export const getEstatisticas = async (req: Request, res: Response) => {
  try {
    const { dataInicio, dataFim } = req.query;

    // Construir filtro de data
    const where: any = {};
    if (dataInicio || dataFim) {
      where.created_at = {};
      if (dataInicio) {
        where.created_at.gte = new Date(dataInicio as string);
      }
      if (dataFim) {
        const dataFimObj = new Date(dataFim as string);
        dataFimObj.setHours(23, 59, 59, 999);
        where.created_at.lte = dataFimObj;
      }
    }

    // Buscar todas as avaliações do período
    const avaliacoes = await prisma.avaliacao.findMany({
      where,
      include: { setor: true }
    });

    // Total de avaliações
    const totalAvaliacoes = avaliacoes.length;

    // Calcular médias gerais
    const calcularMedia = (campo: keyof typeof avaliacoes[0]) => {
      const valores = avaliacoes
        .map(av => av[campo] as number)
        .filter(v => v > 0);
      return valores.length > 0 
        ? Number((valores.reduce((a, b) => a + b, 0) / valores.length).toFixed(2))
        : 0;
    };

    const mediasGerais = {
      atendimento: calcularMedia('nota_atendimento'),
      clareza: calcularMedia('nota_clareza'),
      agilidade: calcularMedia('nota_agilidade'),
      cordialidade: calcularMedia('nota_cordialidade'),
      eficiencia: calcularMedia('nota_eficiencia')
    };

    // Média geral
    const somaMedias = Object.values(mediasGerais).reduce((a, b) => a + b, 0);
    const mediaGeral = somaMedias > 0 
      ? Number((somaMedias / Object.values(mediasGerais).length).toFixed(2))
      : 0;

    // Estatísticas por setor
    const setoresMap = new Map<string, any>();
    
    avaliacoes.forEach(av => {
      const nomeSetor = av.setor.nome;
      if (!setoresMap.has(nomeSetor)) {
        setoresMap.set(nomeSetor, {
          nome: nomeSetor,
          total: 0,
          somaAtendimento: 0,
          somaClareza: 0,
          somaAgilidade: 0,
          somaCordialidade: 0,
          somaEficiencia: 0,
          countAtendimento: 0,
          countClareza: 0,
          countAgilidade: 0,
          countCordialidade: 0,
          countEficiencia: 0
        });
      }

      const stats = setoresMap.get(nomeSetor)!;
      stats.total++;
      
      if (av.nota_atendimento > 0) {
        stats.somaAtendimento += av.nota_atendimento;
        stats.countAtendimento++;
      }
      if (av.nota_clareza > 0) {
        stats.somaClareza += av.nota_clareza;
        stats.countClareza++;
      }
      if (av.nota_agilidade > 0) {
        stats.somaAgilidade += av.nota_agilidade;
        stats.countAgilidade++;
      }
      if (av.nota_cordialidade > 0) {
        stats.somaCordialidade += av.nota_cordialidade;
        stats.countCordialidade++;
      }
      if (av.nota_eficiencia > 0) {
        stats.somaEficiencia += av.nota_eficiencia;
        stats.countEficiencia++;
      }
    });

    // Calcular médias por setor
    const estatisticasPorSetor = Array.from(setoresMap.values()).map(stats => {
      const medias = {
        atendimento: stats.countAtendimento > 0 
          ? Number((stats.somaAtendimento / stats.countAtendimento).toFixed(2)) 
          : 0,
        clareza: stats.countClareza > 0 
          ? Number((stats.somaClareza / stats.countClareza).toFixed(2)) 
          : 0,
        agilidade: stats.countAgilidade > 0 
          ? Number((stats.somaAgilidade / stats.countAgilidade).toFixed(2)) 
          : 0,
        cordialidade: stats.countCordialidade > 0 
          ? Number((stats.somaCordialidade / stats.countCordialidade).toFixed(2)) 
          : 0,
        eficiencia: stats.countEficiencia > 0 
          ? Number((stats.somaEficiencia / stats.countEficiencia).toFixed(2)) 
          : 0
      };

      const somaMediasSetor = Object.values(medias).reduce((a, b) => a + b, 0);
      const mediaGeralSetor = somaMediasSetor > 0 
        ? Number((somaMediasSetor / Object.values(medias).length).toFixed(2))
        : 0;

      return {
        setor: stats.nome,
        total: stats.total,
        mediaGeral: mediaGeralSetor,
        medias
      };
    }).sort((a, b) => b.total - a.total);

    // Avaliações por dia (últimos 30 dias ou período filtrado)
    const avaliacoesPorDia: { [key: string]: number } = {};
    avaliacoes.forEach(av => {
      const data = new Date(av.created_at).toISOString().split('T')[0];
      avaliacoesPorDia[data] = (avaliacoesPorDia[data] || 0) + 1;
    });

    return res.status(200).json({
      success: true,
      data: {
        totalAvaliacoes,
        mediaGeral,
        mediasGerais,
        estatisticasPorSetor,
        avaliacoesPorDia
      }
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    return res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
};

// Listar setores (público - necessário para o formulário)
export const getSetores = async (req: Request, res: Response) => {
  try {
    const setores = await prisma.setor.findMany({ 
      orderBy: { nome: 'asc' },
      include: {
        _count: {
          select: { avaliacoes: true }
        }
      }
    });

    const setoresComContagem = setores.map(setor => ({
      id: setor.id,
      nome: setor.nome,
      totalAvaliacoes: setor._count.avaliacoes
    }));

    return res.status(200).json({ success: true, data: setoresComContagem });
  } catch (error) {
    console.error('Erro ao buscar setores:', error);
    return res.status(500).json({ error: 'Erro ao buscar setores' });
  }
};
