import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function criarAvaliacoesTeste() {
  console.log('📝 Criando avaliações de teste...');

  try {
    // 1. Buscar setores
    const setores = await prisma.setor.findMany();
    console.log(`📋 Encontrados ${setores.length} setores`);

    // 2. Criar uma avaliação para cada setor
    for (const setor of setores) {
      if (setor.nome === 'Não especificado') continue; // Pula o setor padrão

      const notasAleatorias = () => Math.floor(Math.random() * 2) + 4; // Entre 4 e 5

      const avaliacao = await prisma.avaliacao.create({
        data: {
          nome_advogado: `Teste ${setor.nome}`,
          numero_ordem: `TEST${setor.id}MA`,
          processo: 'Processo Teste',
          setor_id: setor.id,
          nota_atendimento: notasAleatorias(),
          nota_clareza: notasAleatorias(),
          nota_agilidade: notasAleatorias(),
          nota_cordialidade: notasAleatorias(),
          nota_eficiencia: notasAleatorias(),
          comentario: `Avaliação de teste do setor ${setor.nome}`
        }
      });

      console.log(`✅ Avaliação criada para ${setor.nome} (ID: ${avaliacao.id})`);
    }

    // 3. Listar todas as avaliações
    const avaliacoes = await prisma.avaliacao.findMany({
      include: {
        setor: true
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    console.log(`\n📊 Total de avaliações: ${avaliacoes.length}`);
    console.log('\nDistribuição por setor:');
    
    const distribuicao: { [key: string]: number } = {};
    avaliacoes.forEach(av => {
      const setorNome = av.setor.nome;
      distribuicao[setorNome] = (distribuicao[setorNome] || 0) + 1;
    });

    Object.entries(distribuicao).forEach(([setor, count]) => {
      console.log(`  - ${setor}: ${count} avaliação(ões)`);
    });

    console.log('\n✅ Avaliações de teste criadas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao criar avaliações de teste:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

criarAvaliacoesTeste();
