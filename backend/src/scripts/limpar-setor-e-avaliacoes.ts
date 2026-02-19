import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function limparTudo() {
  console.log('🧹 Limpando avaliações e setor "Não especificado"...');

  // 1. Deletar todas avaliações
  const delAvaliacao = await prisma.avaliacao.deleteMany();
  console.log(`✅ ${delAvaliacao.count} avaliações deletadas.`);

  // 2. Deletar setor "Não especificado"
  const setor = await prisma.setor.findFirst({ where: { nome: 'Não especificado' } });
  if (setor) {
    await prisma.setor.delete({ where: { id: setor.id } });
    console.log('✅ Setor "Não especificado" removido.');
  } else {
    console.log('ℹ️ Setor "Não especificado" já não existe.');
  }

  // 3. Listar setores finais
  const setores = await prisma.setor.findMany({ orderBy: { nome: 'asc' } });
  console.log('\n📋 Setores finais:');
  setores.forEach(s => console.log(`  - ${s.nome} (ID: ${s.id})`));

  await prisma.$disconnect();
}

limparTudo();
