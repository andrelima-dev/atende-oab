# ✅ Checklist de Deploy - Atende OAB

Use este checklist para fazer o deploy passo a passo.

---

## 📋 Fase 1: Preparação (Local)

- [ ] Código do backend está funcionando localmente
  ```bash
  cd backend
  npm run dev
  # Deve rodar em http://localhost:3001
  ```

- [ ] Código do frontend está funcionando localmente
  ```bash
  cd projeto-avaliacao-oab/projeto-completo/avalia+dashboard
  npm run dev
  # Deve rodar em http://localhost:5174
  ```

- [ ] Banco PostgreSQL local está rodando
  ```bash
  # Testar conexão:
  psql -U postgres -d atende_oab
  ```

- [ ] Você consegue fazer login no sistema local
  - Email: `oabmainformatica@gmail.com`
  - Senha: `infMA2k26`

---

## 🗄️ Fase 2: Deploy do Banco de Dados

### Opção A: Railway
- [ ] Criar conta em https://railway.app
- [ ] Criar novo projeto
- [ ] Adicionar PostgreSQL Database
- [ ] Copiar a `DATABASE_URL` fornecida
- [ ] Anotar aqui: `__________________________________`

### Opção B: Render
- [ ] Criar conta em https://render.com
- [ ] Criar novo PostgreSQL
- [ ] Copiar a `Internal Database URL`
- [ ] Anotar aqui: `__________________________________`

---

## 🔧 Fase 3: Deploy do Backend

### Railway:
- [ ] Criar novo serviço → Deploy from GitHub
- [ ] Selecionar repositório `atende-oab`
- [ ] Root Directory: `backend`
- [ ] Adicionar variáveis de ambiente:
  - [ ] `DATABASE_URL` = (URL que você copiou acima)
  - [ ] `PORT` = `3001`
  - [ ] `JWT_SECRET` = `oab_maranhao_secret_2026_super_seguro_token_jwt`
  - [ ] `NODE_ENV` = `production`
  - [ ] `FRONTEND_URL` = (deixar vazio por enquanto)
  
- [ ] Aguardar deploy finalizar
- [ ] Copiar URL do backend deployado
- [ ] Anotar aqui: `__________________________________`
- [ ] Testar API: abrir `sua-url-backend.com/api/avaliacoes/setores`

### Executar Migrations:
- [ ] No Railway, abrir terminal do serviço:
  ```bash
  npx prisma migrate deploy
  ```
- [ ] Criar usuário admin:
  ```bash
  npm run seed-admin
  ```

---

## 🌐 Fase 4: Deploy do Frontend

### Vercel:
- [ ] Criar conta em https://vercel.com
- [ ] Novo projeto → Import GitHub repository
- [ ] Selecionar `atende-oab`
- [ ] **🔴 IMPORTANTE - Configure Root Directory:**
  - [ ] Clicar em "Edit" ao lado de Root Directory
  - [ ] Digite: `projeto-avaliacao-oab/projeto-completo/avalia+dashboard`
  - [ ] Framework Preset: Vite
- [ ] Fazer deploy
- [ ] Se der erro 404, veja: [RESOLVER-ERRO-404-VERCEL.md](./RESOLVER-ERRO-404-VERCEL.md)
- [ ] Ir em Settings → Environment Variables
- [ ] Adicionar variável:
  - [ ] `VITE_API_URL` = (URL do backend que você anotou + `/api`)
    - Exemplo: `https://atende-oab-production.up.railway.app/api`
- [ ] Voltar em Deployments → Redeploy
- [ ] Aguardar deploy finalizar
- [ ] Copiar URL do frontend
- [ ] Anotar aqui: `__________________________________`

---

## 🔄 Fase 5: Conectar Frontend e Backend

- [ ] Voltar no Railway (backend)
- [ ] Adicionar variável de ambiente:
  - [ ] `FRONTEND_URL` = (URL do frontend Vercel)
- [ ] Aguardar redeploy automático

---

## 🧪 Fase 6: Testar Produção

- [ ] Abrir URL do frontend
- [ ] Acessar formulário público (`/`)
  - [ ] Consegue ver os setores
  - [ ] Consegue enviar avaliação
- [ ] Fazer login (`/login`)
  - Email: `oabmainformatica@gmail.com`
  - Senha: `infMA2k26`
- [ ] Acessar dashboard (`/admin`)
  - [ ] Consegue ver as avaliações
  - [ ] Gráficos carregam
  - [ ] Filtros funcionam
  - [ ] Exportação funciona

---

## 🎉 Deploy Concluído!

### URLs Finais:

**Formulário Público:**
`_______________________________________`

**Dashboard Admin:**
`_______________________________________/admin`

**API Backend:**
`_______________________________________/api`

---

## 🔒 Próximos Passos (Segurança)

- [ ] Mudar senha do usuário admin
- [ ] Gerar novo `JWT_SECRET` mais complexo para produção
- [ ] Configurar domínio personalizado (opcional)
- [ ] Configurar backup automático do banco
- [ ] Monitorar logs de erro

---

## ⚠️ Se Algo Der Errado

### Backend não inicia:
1. Verificar logs no Railway/Render
2. Confirmar que `DATABASE_URL` está correta
3. Verificar se migrations rodaram: `npx prisma migrate deploy`

### Frontend não conecta no backend:
1. Verificar variável `VITE_API_URL` na Vercel
2. Testar API no navegador: `sua-backend-url/api/avaliacoes/setores`
3. Verificar CORS no backend: `FRONTEND_URL` deve estar correta

### Erro 401 no dashboard:
1. Criar usuário admin: `npm run seed-admin` no backend
2. Verificar se `JWT_SECRET` é o mesmo no backend e está correto

### Banco de dados vazio:
1. Rodar migrations: `npx prisma migrate deploy`
2. Criar admin: `npm run seed-admin`

---

## 📞 Comandos Úteis

```bash
# Ver logs do backend (Railway)
railway logs

# Conectar ao banco de produção
railway connect postgres

# Rodar comando no backend
railway run npm run seed-admin

# Ver status do deploy (Vercel)
vercel inspect [deployment-url]
```
