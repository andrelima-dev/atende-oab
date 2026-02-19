# 🚀 Guia de Deploy - Atende OAB

> **✅ Este guia contém suas configurações REAIS do projeto!**  
> Todas as senhas, URLs e credenciais abaixo são do seu ambiente atual.  
> Para produção, crie novas credenciais mais seguras.

## ⚠️ IMPORTANTE: Backend e Frontend são Separados

Este projeto tem **2 aplicações distintas** que devem ser deployadas em servidores diferentes:

1. **Backend (API)** → Railway, Render, ou servidor VPS
2. **Frontend (Interface)** → Vercel, Netlify, ou Cloudflare Pages

---

## � CONFIGURAÇÕES REAIS DO SEU PROJETO

### Banco de Dados Local:
```
Usuário: postgres
Senha: andrelima1907
Host: localhost
Porta: 5432
Database: atende_oab
```

**Connection String Completa:**
```
DATABASE_URL="postgresql://postgres:andrelima1907@localhost:5432/atende_oab"
```

### Backend Local:
```
Porta: 3001
URL: http://localhost:3001
API: http://localhost:3001/api
```

### Frontend Local:
```
Porta: 5174
URL: http://localhost:5174
```

### Credenciais Admin:
```
Email: oabmainformatica@gmail.com
Senha: infMA2k26
```

### Segurança:
```
JWT_SECRET="oab_maranhao_secret_2026_super_seguro_token_jwt"
```

---

## �📦 Deploy do Frontend (Vercel)

### Passo 1: Preparação

Certifique-se de que o arquivo `vercel.json` está no root do projeto (já criado).

### Passo 2: Deploy via Vercel Dashboard

1. Acesse https://vercel.com
2. Clique em "Add New Project"
3. Conecte seu repositório GitHub
4. Selecione o repositório `atende-oab`
5. **IMPORTANTE:** Configure o **Root Directory:**
   - Clique em "Edit" ao lado de Root Directory
   - Digite: `projeto-avaliacao-oab/projeto-completo/avalia+dashboard`
   - Salve
6. **Framework Preset:** Vite (auto-detectado)
7. Clique em "Deploy"

> 🔴 **ATENÇÃO:** Se não configurar o Root Directory, você terá erro 404!

### Passo 3: Configurar Variáveis de Ambiente

Após o deploy, vá em **Settings → Environment Variables** e adicione:

```
VITE_API_URL=https://seu-backend-url.com/api
```

> 🔴 **IMPORTANTE:** 
> - **AGUARDE** o deploy do backend primeiro para pegar a URL correta!
> - Se backend no **Railway**, será algo como: `https://atende-oab-backend-production.up.railway.app/api`
> - Se backend no **Render**, será algo como: `https://atende-oab-backend.onrender.com/api`
> - Para **testes locais** enquanto backend não está deployado: `http://localhost:3001/api`

### Passo 4: Redeployar

Após adicionar a variável de ambiente, vá em **Deployments** e clique em **Redeploy** no último deploy.

---

## 🔧 Deploy do Backend (Railway ou Render)

O backend **NÃO pode** ser deployado na Vercel gratuitamente porque usa:
- ✅ PostgreSQL (banco de dados)
- ✅ Prisma ORM
- ✅ Processo contínuo (servidor Express)

### Opção A: Railway (Recomendado) ⭐

1. Acesse https://railway.app
2. Faça login com GitHub
3. Clique em "New Project"
4. Selecione "Deploy from GitHub repo"
5. Selecione o repositório `atende-oab`
6. **Root Directory:** selecione `backend`
7. Railway detectará automaticamente Node.js

#### Variáveis de Ambiente (Railway):

```env
# Banco de dados (será fornecido pelo Railway após criar PostgreSQL)
DATABASE_URL=postgresql://usuario:senha@host:5432/nome_banco

# Porta (Railway define automaticamente, mas pode especificar)
PORT=3001

# Secret JWT (COPIE EXATAMENTE DO SEU .env)
JWT_SECRET=oab_maranhao_secret_2026_super_seguro_token_jwt

# Ambiente de produção
NODE_ENV=production

# URL do frontend (após deploy na Vercel)
FRONTEND_URL=https://seu-frontend.vercel.app
```

**🔴 IMPORTANTE:** Após criar PostgreSQL no Railway, copie a `DATABASE_URL` fornecida por eles.

### Opção B: Render

1. Acesse https://render.com
2. Faça login com GitHub
3. Clique em "New +" → "Web Service"
4. Conecte o repositório `atende-oab`
# Banco de dados (será fornecido pelo Render após criar PostgreSQL)
DATABASE_URL=postgresql://usuario:senha@host:5432/nome_banco

# Porta
PORT=3001

# Secret JWT (COPIE EXATAMENTE DO SEU .env)
JWT_SECRET=oab_maranhao_secret_2026_super_seguro_token_jwt

# Ambiente de produção
NODE_ENV=production

# URL do frontend (após deploy na Vercel)
FRONTEND_URL=https://seu-frontend.vercel.app
```

**🔴 IMPORTANTE:** Após criar PostgreSQL no Render, copie a `Internal Database URL` fornecida
```env
DATABASE_URL=postgresql://usuario:senha@host:5432/nome_banco
PORT=3001
JWT_SECRET=oab_maranhao_secret_2026_super_seguro_token_jwt
NODE_ENV=production
FRONTEND_URL=https://seu-frontend.vercel.app
```

> Render oferece PostgreSQL gratuito! Crie um "New PostgreSQL" na dashboard.

---

## 🔗 Conectar Frontend e Backend

Após fazer deploy de ambos:

### 1. Atualize o Frontend

No projeto Vercel, adicione/atualize a variável:

```
VITE_API_URL=https://sua-api.railway.app/api
```

### 2. Atualize o Backend

No projeto Railway/Render, adicione/atualize:

```
FRONTEND_URL=https://seu-projeto.vercel.app
```

### 3. Teste a Conexão

Acesse seu frontend e verifique se:
- ✅ O formulário público funciona
- ✅ O login funciona
- ✅ O dashboard carrega as avaliações

---

## 🔍 Troubleshooting

### Erro: "Failed to load resource: net::ERR_BLOCKED_BY_CLIENT"

**Solução:** Verifique se a URL da API está correta na variável `VITE_API_URL`

### Erro: "Access to fetch at ... has been blocked by CORS policy"

**Solução:** No backend, verifique se `FRONTEND_URL` está configurado corretamente

### Erro: "Error: P1001: Can't reach database server"

**Solução:** Verifique se a `DATABASE_URL` está correta e se o banco está acessível

### Frontend carrega mas não conecta ao backend

**Solução:** 
1. Abra DevTools (F12) → Console
2. Veja qual URL está tentando acessar
3. Verifique se `VITE_API_URL` está correto
4. Lembre-se: variáveis começadas com `VITE_` precisam de rebuild após mudança

---

## 📋 Checklist Final

### Backend
- [ ] PostgreSQL criado e funcionando
- [ ] Variável `DATABASE_URL` configurada
- [ ] Migrations executadas (`prisma migrate deploy`)
- [ ] Variável `FRONTEND_URL` configurada
- [ ] Variável `JWT_SECRET` configurada
- [ ] API respondendo em `/api/health`

### Frontend
- [ ] Variável `VITE_API_URL` configurada
- [ ] Build executado com sucesso
- [ ] Site acessível
- [ ] Formulário público funciona
- [ ] Login funciona
- [ ] Dashboard carrega dados

---install
npm run prisma:generate
npm run prisma:migrate
npm run dev
# Rodará em: http://localhost:3001

# Terminal 2 - Frontend  
cd projeto-avaliacao-oab/projeto-completo/avalia+dashboard
npm install
npm run dev
# Rodará em: http://localhost:5174
```

**Acesso:**
- Formulário: http://localhost:5174/
- Login: http://localhost:5174/login
- Dashboard: http://localhost:5174/admin

**Login de teste:**
- Email: `oabmainformatica@gmail.com`
- Senha: `infMA2k26`

---

## 📊 Criar Usuário Admin em Produção

Após deploy do backend, você precisa criar o usuário admin:

**Opção 1:** Via Railway/Render CLI
```bash
# Conectar ao container
railway run npm run seed-admin
# ou
render-cli exec npm run seed-admin
```

**Opção 2:** Via Prisma Studio (mais seguro)
```bash
railway run npx prisma studio
# ou  
render-cli exec npx prisma studio
```

**Opção 3:** Via SQL direto no banco
```sql
-- Conecte ao banco PostgreSQL e execute:
INSERT INTO usuarios (email, senha, nome, ativo, created_at, updated_at)
VALUES (
  'oabmainformatica@gmail.com',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- senha: infMA2k26
  'OAB Informática',
  true,
  NOW(),
  NOW()
);
```

---

## 🔒 Migrar Banco Local para Produção

Se você já tem dados no banco local e quer migrar para produção:

```bash
# 1. Exportar dados locais
cd backend
pg_dump -U postgres -d atende_oab > backup_local.sql

# 2. Importar para Railway/Render
# Obtenha a URL de conexão do banco de produção e execute:
psql "postgresql://user:pass@host/db" < backup_local.sql
```
cd backend
npm run dev

# Terminal 2 - Frontend
cd projeto-avaliacao-oab/projeto-completo/avalia+dashboard
npm run dev
```

Acesse: http://localhost:5174

---

## 💰 Custos

### Gratuito:
- ✅ Vercel (Frontend)
- ✅ Railway (Starter Plan - 500 horas/mês)
- ✅ Render (Free tier com limitações)

### Pagos (recomendado para produção):
- 💵 Railway: $5/mês por serviço
- 💵 Render: $7/mês por serviço
- 💵 VPS (DigitalOcean, etc): $4-12/mês

---

**Última atualização:** 19/02/2026
