# 🚀 Guia Rápido - Sistema de Login

## ✅ O que foi implementado

1. **Backend:**
   - ✅ Tabela de usuários no banco de dados
   - ✅ Sistema de autenticação JWT
   - ✅ Endpoints de login e verificação
   - ✅ Middleware de proteção de rotas
   - ✅ Hash de senhas com bcrypt

2. **Frontend:**
   - ✅ Página de login linda em tema dark
   - ✅ Contexto de autenticação global
   - ✅ Proteção automática da rota `/admin`
   - ✅ Botão de logout no dashboard
   - ✅ Persistência de sessão

## 🔐 Credenciais de Acesso

**Email:** `admin@oab.ma.gov.br`  
**Senha:** `oab@2026`

## 🎯 Como Usar

### 1. Iniciar o Backend
```bash
cd backend
npm run dev
```

### 2. Iniciar o Frontend
```bash
cd projeto-avaliacao-oab/projeto-completo/avalia+dashboard
npm run dev
```

### 3. Acessar o Sistema

- **Formulário de Avaliação (Público):** http://localhost:5174/
- **Página de Login:** http://localhost:5174/login
- **Dashboard (Protegido):** http://localhost:5174/admin

## 🔑 Fluxo de Acesso

1. Acesse `http://localhost:5174/login`
2. Digite o email: `admin@oab.ma.gov.br`
3. Digite a senha: `oab@2026`
4. Clique em "Entrar"
5. Você será redirecionado para o dashboard
6. Para sair, clique no ícone 🚪 no canto superior direito

## 🆕 Criar Novos Usuários

### Opção 1: Via Script Interativo
```bash
cd backend
npm run criar-usuario
```

### Opção 2: Via Prisma Studio (Interface Gráfica)
```bash
cd backend
npm run prisma:studio
```
Acesse http://localhost:5555 e adicione usuários manualmente.

### Opção 3: Via API (Após fazer login)
```bash
curl -X POST http://localhost:3001/api/auth/usuario \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@oab.ma.gov.br",
    "senha": "senha123"
  }'
```

## 🎨 Design da Página de Login

A página de login possui:
- 🌑 Tema dark elegante com gradientes azul
- 🛡️ Ícone de escudo representando segurança
- ✨ Animações suaves e responsivas
- 👁️ Toggle para mostrar/ocultar senha
- 📱 Totalmente responsivo para mobile
- 🔵 Cores da identidade visual da OAB

## 🔒 Segurança

- ✅ Senhas hasheadas com bcrypt (10 rounds)
- ✅ Tokens JWT com expiração de 24h
- ✅ Validação em cada requisição
- ✅ Logout limpa completamente a sessão
- ✅ Proteção automática de rotas

## 📱 Rotas do Sistema

| Rota | Acesso | Descrição |
|------|--------|-----------|
| `/` | Público | Formulário de avaliação |
| `/login` | Público | Página de login |
| `/admin` | Protegido | Dashboard administrativo |

## ⚠️ Importante

- A página de avaliação pública (`/`) continua acessível sem login
- Apenas o dashboard (`/admin`) requer autenticação
- Tokens expiram em 24 horas
- Ao tentar acessar `/admin` sem login, você é redirecionado para `/login`

## 🐛 Problemas Comuns

**Erro: "Token inválido"**
- Solução: Faça logout e login novamente

**Não consigo fazer login**
- Verifique se o backend está rodando
- Confirme as credenciais
- Veja o console do navegador para erros

**Redirecionado para login ao tentar acessar dashboard**
- Isso é esperado! Faça login primeiro

## 📞 Suporte

Para resetar a senha ou gerenciar usuários, use:
```bash
cd backend
npm run prisma:studio
```

---

✅ **Sistema pronto para uso!** 🎉
