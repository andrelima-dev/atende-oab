import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function criarUsuarioOAB() {
  console.log('🔐 Criando usuário OAB Informática...\n');

  try {
    const nome = 'OAB Informática';
    const email = 'oabmainformatica@gmail.com';
    const senha = 'infMA2k26';

    // Verificar se já existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (usuarioExistente) {
      console.log('⚠️  Usuário já existe! Atualizando senha...\n');
      
      // Hash da senha
      const senhaHash = await bcrypt.hash(senha, 10);
      
      // Atualizar
      const usuario = await prisma.usuario.update({
        where: { email: email.toLowerCase() },
        data: {
          senha: senhaHash,
          nome,
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
      
      console.log('✅ Usuário atualizado com sucesso!\n');
      console.log('==============================================');
      console.log('📧 Email:', usuario.email);
      console.log('🔑 Senha:', senha);
      console.log('👤 Nome:', usuario.nome);
      console.log('📅 Criado em:', usuario.created_at.toLocaleString('pt-BR'));
      console.log('==============================================\n');
      
    } else {
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

      console.log('✅ Usuário criado com sucesso!\n');
      console.log('==============================================');
      console.log('📧 Email:', usuario.email);
      console.log('🔑 Senha:', senha);
      console.log('👤 Nome:', usuario.nome);
      console.log('📅 Criado em:', usuario.created_at.toLocaleString('pt-BR'));
      console.log('==============================================\n');
    }
    
    console.log('⚠️  IMPORTANTE: Anote estas credenciais!');
    console.log('Use-as para fazer login em: http://localhost:5174/login\n');

  } catch (error) {
    console.error('❌ Erro ao criar/atualizar usuário:', error);
  } finally {
    await prisma.$disconnect();
  }
}

criarUsuarioOAB();
