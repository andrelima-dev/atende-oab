# 🚀 Deploy Rápido - Referência

## 📝 Configurações do Seu Projeto

### Banco de Dados Local
```
postgresql://postgres:andrelima1907@localhost:5432/atende_oab
```

### JWT Secret
```
oab_maranhao_secret_2026_super_seguro_token_jwt
```

### Credenciais Admin
```
Email: oabmainformatica@gmail.com
Senha: infMA2k26
```

---

## ⚡ Ordem de Deploy

```
1. 🗄️  Deploy Banco de Dados (Railway/Render PostgreSQL)
          ↓
2. 🔧 Deploy Backend (Railway/Render com Node.js)
          ↓
3. 🌐 Deploy Frontend (Vercel)
          ↓
4. 🔄 Conectar Frontend ↔ Backend (variáveis de ambiente)
          ↓
5. ✅ Testar tudo!
```

---

## 🔑 Variáveis de Ambiente

### Backend (Railway/Render):
```env
DATABASE_URL=postgresql://[fornecido pelo serviço]
PORT=3001
JWT_SECRET=oab_maranhao_secret_2026_super_seguro_token_jwt
NODE_ENV=production
FRONTEND_URL=https://[sua-url-vercel].vercel.app
```

### Frontend (Vercel):
```env
VITE_API_URL=https://[sua-url-backend]/api
```

---

## 🛠️ Comandos Essenciais

### Rodar Migrations (Railway/Render):
```bash
npx prisma migrate deploy
```

### Criar Admin:
```bash
npm run seed-admin
```

### Testar API:
```bash
# Abrir no navegador:
https://[sua-url-backend]/api/avaliacoes/setores
```

---

## 📱 URLs Finais

**Anote aqui suas URLs de produção:**

Backend: `_________________________________`

Frontend: `_________________________________`

Banco: `_________________________________`

---

## 🆘 Problemas Comuns

| Problema | Solução |
|----------|---------|
| **Frontend erro 404** | **Configurar Root Directory na Vercel:** `projeto-avaliacao-oab/projeto-completo/avalia+dashboard` - Ver [RESOLVER-ERRO-404-VERCEL.md](./RESOLVER-ERRO-404-VERCEL.md) |
| Backend não inicia | Verificar `DATABASE_URL` e rodar `npx prisma migrate deploy` |
| Erro de CORS | Adicionar `FRONTEND_URL` no backend |
| Erro 401 no login | Criar usuário admin com `npm run seed-admin` |
| Setores não aparecem | Route `/api/avaliacoes/setores` deve ser pública |

---

## 📚 Documentação Completa

- [GUIA-DEPLOY.md](./GUIA-DEPLOY.md) - Guia detalhado
- [CHECKLIST-DEPLOY.md](./CHECKLIST-DEPLOY.md) - Checklist passo a passo
