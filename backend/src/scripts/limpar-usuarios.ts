import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function limparUsuarioAntigo() {
  console.log('🗑️  Excluindo usuário antigo...\n');

  try {
    // Excluir o usuário admin antigo
    await prisma.usuario.deleteMany({
      where: {
        email: 'admin@oab.ma.gov.br'
      }
    });

    console.log('✅ Usuário admin@oab.ma.gov.br excluído com sucesso!\n');

    // Listar usuários restantes
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        ativo: true,
        created_at: true
      }
    });

    console.log('==============================================');
    console.log('👥 Usuários no sistema:');
    console.log('==============================================');
    usuarios.forEach(user => {
      console.log(`ID: ${user.id}`);
      console.log(`Nome: ${user.nome}`);
      console.log(`Email: ${user.email}`);
      console.log(`Status: ${user.ativo ? 'Ativo' : 'Inativo'}`);
      console.log(`Criado em: ${user.created_at.toLocaleString('pt-BR')}`);
      console.log('----------------------------------------------');
    });
    console.log('==============================================\n');

  } catch (error) {
    console.error('❌ Erro ao excluir usuário:', error);
  } finally {
    await prisma.$disconnect();
  }
}

limparUsuarioAntigo();
