# Sistema de Autenticação - Dashboard OAB

## 🔐 Visão Geral

Sistema de autenticação com login restrito para acesso ao dashboard administrativo. A página de avaliações públicas permanece acessível sem autenticação.

## 📋 Funcionalidades

- ✅ Login com email e senha
- ✅ Proteção de rotas com JWT
- ✅ Sessão persistente (24 horas)
- ✅ Interface moderna em tema dark
- ✅ Botão de logout no dashboard
- ✅ Validação de autenticação automática

## 🚀 Configuração Inicial

### 1. Configurar Variáveis de Ambiente

No diretório `backend/`, crie um arquivo `.env` baseado no `.env.example`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/atende_oab?schema=public"
JWT_SECRET="seu_secret_super_seguro_aqui_mude_em_producao"
PORT=3001
FRONTEND_URL="http://localhost:5173"
```

⚠️ **IMPORTANTE**: Em produção, use um JWT_SECRET forte e único!

### 2. Criar Primeiro Usuário Admin

Execute o script para criar o primeiro usuário:

```bash
cd backend
npm run criar-usuario
```

Siga as instruções no terminal para informar:
- Nome completo
- Email
- Senha

### 3. Iniciar os Servidores

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd projeto-avaliacao-oab/projeto-completo/avalia+dashboard
npm run dev
```

## 🎨 Páginas do Sistema

### Páginas Públicas
- **`/`** - Formulário de avaliação (pública)
- **`/login`** - Página de login

### Páginas Protegidas
- **`/admin`** - Dashboard administrativo (requer autenticação)

## 🔑 Como Acessar

1. Acesse `http://localhost:5173/login`
2. Entre com o email e senha criados
3. Você será redirecionado para o dashboard
4. Para sair, clique no botão 🚪 no canto superior direito

## 📡 Endpoints da API

### Autenticação

**POST** `/api/auth/login`
```json
{
  "email": "admin@oab.com",
  "senha": "suasenha123"
}
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "email": "admin@oab.com",
    "nome": "Administrador"
  }
}
```

**GET** `/api/auth/verificar` (requer token)
```
Headers: Authorization: Bearer <token>
```

**POST** `/api/auth/usuario` (requer token)
Criar novo usuário (apenas usuários autenticados podem criar outros)

## 🛡️ Segurança

- Senhas são hasheadas com bcrypt (10 rounds)
- Tokens JWT expiram em 24 horas
- Rotas protegidas validam token a cada requisição
- Sessão é mantida no localStorage (limpa ao fazer logout)

## 🎭 Design da Página de Login

- ✨ Tema dark elegante
- 🔵 Gradientes azul OAB
- 🛡️ Ícone Shield representando segurança
- 📱 Totalmente responsivo
- 🎨 Animações suaves
- 👁️ Toggle de visualização de senha

## 🔧 Gerenciamento de Usuários

Para criar novos usuários após a configuração inicial:

1. Faça login no dashboard
2. Use a API diretamente:

```bash
# Com token de um usuário autenticado
curl -X POST http://localhost:3001/api/auth/usuario \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Novo Admin",
    "email": "novo@oab.com",
    "senha": "senha123"
  }'
```

Ou use o script:
```bash
npm run criar-usuario
```

## 📝 Estrutura de Arquivos

```
backend/
├── src/
│   ├── controllers/
│   │   └── auth.controller.ts      # Lógica de autenticação
│   ├── middleware/
│   │   └── auth.ts                 # Middleware JWT
│   ├── routes/
│   │   └── auth.ts                 # Rotas de autenticação
│   └── scripts/
│       └── criar-usuario.ts        # Script para criar usuários
└── prisma/
    └── schema.prisma               # Modelo Usuario

frontend/
└── src/
    ├── context/
    │   └── AuthContext.tsx         # Contexto de autenticação
    ├── components/
    │   └── PrivateRoute.tsx        # Proteção de rotas
    ├── pages/
    │   └── Login.tsx               # Página de login
    └── dashboard/
        └── components/
            └── dashboard/
                └── DashboardHeader.tsx  # Header com logout
```

## 🔄 Fluxo de Autenticação

1. Usuário acessa `/login`
2. Insere email e senha
3. Backend valida e retorna token JWT
4. Token é salvo no localStorage
5. Usuário é redirecionado para `/admin`
6. Todas as requisições incluem o token
7. Ao fazer logout, token é removido

## ⚠️ Solução de Problemas

**Erro: "Token inválido ou expirado"**
- Faça logout e login novamente
- Token expira em 24 horas

**Erro: "Credenciais inválidas"**
- Verifique email e senha
- Email é case-insensitive

**Redirecionado para login automaticamente**
- Token expirou ou foi invalidado
- Faça login novamente

**Não consegue criar usuário**
- Certifique-se de que o email não está duplicado
- Verifique se o banco está conectado

## 📧 Suporte

Para adicionar, remover ou redefinir senhas de usuários, use o Prisma Studio:

```bash
cd backend
npm run prisma:studio
```

Isso abrirá uma interface web para gerenciar o banco de dados.

---

**Sistema desenvolvido para OAB - Maranhão** 🏛️
