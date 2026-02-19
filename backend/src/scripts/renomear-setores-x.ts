import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function renomearSetores() {
  console.log('🔄 Consolidando setores em "X" (exceto Informática)...\n');

  try {
    // Buscar todos os setores
    const setores = await prisma.setor.findMany();

    console.log(`📋 Setores encontrados: ${setores.length}\n`);

    // Separar setores que devem ser mantidos (Informática) dos que serão consolidados
    const setoresParaManter: typeof setores = [];
    const setoresParaConsolidar: typeof setores = [];

    for (const setor of setores) {
      const nomeNormalizado = setor.nome.toLowerCase()
        .replace(/[áàãâä]/g, 'a')
        .replace(/[éèêë]/g, 'e')
        .replace(/[íìîï]/g, 'i')
        .replace(/[óòõôö]/g, 'o')
        .replace(/[úùûü]/g, 'u');

      // Verificar se é Informática
      if (nomeNormalizado.includes('informatica') || 
          nomeNormalizado === 'ti' ||
          nomeNormalizado === 't.i' ||
          nomeNormalizado === 't.i.' ||
          nomeNormalizado.includes('tecnologia')) {
        setoresParaManter.push(setor);
        console.log(`✅ Mantendo: "${setor.nome}"`);
      } else {
        setoresParaConsolidar.push(setor);
        console.log(`📌 Para consolidar: "${setor.nome}"`);
      }
    }

    if (setoresParaConsolidar.length === 0) {
      console.log('\n✅ Nenhum setor precisa ser consolidado!');
      await prisma.$disconnect();
      return;
    }

    console.log(`\n🔄 Consolidando ${setoresParaConsolidar.length} setor(es) em "X"...\n`);

    // Verificar se já existe um setor "X"
    let setorX = await prisma.setor.findUnique({ where: { nome: 'X' } });

    if (!setorX) {
      // Criar o setor "X"
      setorX = await prisma.setor.create({
        data: { nome: 'X' }
      });
      console.log('✅ Setor "X" criado');
    } else {
      console.log('✅ Setor "X" já existe');
    }

    // Migrar todas as avaliações dos setores a consolidar para o setor "X"
    for (const setor of setoresParaConsolidar) {
      // Se o próprio setor já é "X", pular
      if (setor.id === setorX.id) {
        continue;
      }

      const countAvaliacoes = await prisma.avaliacao.count({
        where: { setor_id: setor.id }
      });

      if (countAvaliacoes > 0) {
        await prisma.avaliacao.updateMany({
          where: { setor_id: setor.id },
          data: { setor_id: setorX.id }
        });
        console.log(`   ✅ ${countAvaliacoes} avaliação(ões) migrada(s) de "${setor.nome}" → "X"`);
      }

      // Deletar o setor antigo
      await prisma.setor.delete({
        where: { id: setor.id }
      });
      console.log(`   🗑️  Setor "${setor.nome}" removido`);
    }

    console.log('\n✅ Processo concluído com sucesso!\n');
    console.log('==============================================');
    
    // Mostrar resultado final
    const setoresFinais = await prisma.setor.findMany({
      include: {
        _count: {
          select: { avaliacoes: true }
        }
      },
      orderBy: { nome: 'asc' }
    });

    console.log('📊 Setores finais:');
    setoresFinais.forEach(setor => {
      console.log(`   - ${setor.nome}: ${setor._count.avaliacoes} avaliação(ões)`);
    });
    console.log('==============================================\n');

  } catch (error) {
    console.error('❌ Erro ao consolidar setores:', error);
  } finally {
    await prisma.$disconnect();
  }
}

renomearSetores();
