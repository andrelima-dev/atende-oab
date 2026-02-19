import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function criarUsuarioAdmin() {
  console.log('🔐 Criando usuário admin padrão...\n');

  try {
    // Dados do usuário admin padrão
    const nome = 'Administrador OAB';
    const email = 'admin@oab.ma.gov.br';
    const senha = 'oab@2026';

    // Verificar se já existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (usuarioExistente) {
      console.log('⚠️  Usuário admin já existe!');
      console.log('Email:', usuarioExistente.email);
      console.log('Nome:', usuarioExistente.nome);
      return;
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Criar usuário
    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email: email.toLowerCase(),
        senha: senhaHash,
        ativo: true
      },
      select: {
        id: true,
        nome: true,
        email: true,
        ativo: true,
        created_at: true
      }
    });

    console.log('✅ Usuário admin criado com sucesso!\n');
    console.log('==============================================');
    console.log('📧 Email:', usuario.email);
    console.log('🔑 Senha:', senha);
    console.log('👤 Nome:', usuario.nome);
    console.log('📅 Criado em:', usuario.created_at.toLocaleString('pt-BR'));
    console.log('==============================================\n');
    console.log('⚠️  IMPORTANTE: Anote estas credenciais!');
    console.log('Use-as para fazer login em: http://localhost:5174/login\n');

  } catch (error) {
    console.error('❌ Erro ao criar usuário:', error);
  } finally {
    await prisma.$disconnect();
  }
}

criarUsuarioAdmin();
