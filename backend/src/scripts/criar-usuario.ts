import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import * as readline from 'readline';

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

async function criarPrimeiroUsuario() {
  console.log('==============================================');
  console.log('🔐 Criação de Usuário Admin - Sistema OAB');
  console.log('==============================================\n');

  try {
    const nome = await question('Nome completo: ');
    const email = await question('Email: ');
    const senha = await question('Senha: ');

    if (!nome || !email || !senha) {
      console.error('❌ Todos os campos são obrigatórios!');
      process.exit(1);
    }

    // Verificar se o email já existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (usuarioExistente) {
      console.error('❌ Este email já está cadastrado!');
      process.exit(1);
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

    console.log('\n✅ Usuário criado com sucesso!');
    console.log('==============================================');
    console.log('ID:', usuario.id);
    console.log('Nome:', usuario.nome);
    console.log('Email:', usuario.email);
    console.log('Status:', usuario.ativo ? 'Ativo' : 'Inativo');
    console.log('Criado em:', usuario.created_at.toLocaleString('pt-BR'));
    console.log('==============================================\n');

  } catch (error) {
    console.error('❌ Erro ao criar usuário:', error);
    process.exit(1);
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

criarPrimeiroUsuario();
