import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function unificarSetoresDuplicados() {
  console.log('🔧 Unificando setores duplicados...');

  try {
    // 1. Buscar o setor "Financeiro/Tesouraria" (sem espaços)
    const setorSemEspaco = await prisma.setor.findFirst({
      where: { nome: 'Financeiro/Tesouraria' }
    });

    // 2. Buscar o setor "Financeiro / Tesouraria" (com espaços)
    const setorComEspaco = await prisma.setor.findFirst({
      where: { nome: 'Financeiro / Tesouraria' }
    });

    if (!setorSemEspaco || !setorComEspaco) {
      console.log('❌ Setores não encontrados');
      return;
    }

    console.log(`📋 Setor mantido: ${setorComEspaco.nome} (ID: ${setorComEspaco.id})`);
    console.log(`📋 Setor a remover: ${setorSemEspaco.nome} (ID: ${setorSemEspaco.id})`);

    // 3. Atualizar todas as avaliações do setor sem espaço para o setor com espaço
    const updateResult = await prisma.avaliacao.updateMany({
      where: {
        setor_id: setorSemEspaco.id
      },
      data: {
        setor_id: setorComEspaco.id
      }
    });

    console.log(`✅ ${updateResult.count} avaliação(ões) transferida(s)`);

    // 4. Deletar o setor duplicado
    await prisma.setor.delete({
      where: { id: setorSemEspaco.id }
    });

    console.log(`✅ Setor "${setorSemEspaco.nome}" removido`);

    // 5. Listar setores finais
    const setoresFinal = await prisma.setor.findMany({
      orderBy: { nome: 'asc' }
    });

    console.log('\n📋 Setores finais:');
    setoresFinal.forEach(setor => {
      console.log(`  - ${setor.nome} (ID: ${setor.id})`);
    });

    console.log('\n✅ Unificação concluída!');
  } catch (error) {
    console.error('❌ Erro ao unificar setores:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

unificarSetoresDuplicados();
