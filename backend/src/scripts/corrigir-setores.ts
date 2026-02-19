import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function corrigirSetores() {
  console.log('🔧 Corrigindo setores das avaliações...');

  try {
    // 1. Verificar se existem avaliações
    const avaliacoes = await prisma.avaliacao.findMany();
    console.log(`📊 Total de avaliações encontradas: ${avaliacoes.length}`);

    // 2. Buscar ou criar o setor padrão "Não especificado"
    let setorPadrao = await prisma.setor.findUnique({
      where: { nome: 'Não especificado' }
    });

    if (!setorPadrao) {
      setorPadrao = await prisma.setor.create({
        data: { nome: 'Não especificado' }
      });
      console.log('✅ Setor padrão criado: Não especificado');
    }

    // 3. Atualizar todas as avaliações para usar o setor padrão
    const updateResult = await prisma.avaliacao.updateMany({
      data: {
        setor_id: setorPadrao.id
      }
    });

    console.log(`✅ ${updateResult.count} avaliações atualizadas com setor padrão`);

    // 4. Criar setores comuns
    const setoresComuns = [
      'Financeiro/Tesouraria',
      'Tecnologia da Informação',
      'TED',
      'ESA/MA'
    ];

    for (const nomeSetor of setoresComuns) {
      const setorExiste = await prisma.setor.findUnique({
        where: { nome: nomeSetor }
      });

      if (!setorExiste) {
        await prisma.setor.create({
          data: { nome: nomeSetor }
        });
        console.log(`✅ Setor criado: ${nomeSetor}`);
      }
    }

    // 5. Listar todos os setores
    const todosSetores = await prisma.setor.findMany();
    console.log('\n📋 Setores cadastrados:');
    todosSetores.forEach(setor => {
      console.log(`  - ${setor.nome} (ID: ${setor.id})`);
    });

    console.log('\n✅ Correção concluída com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao corrigir setores:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

corrigirSetores();
