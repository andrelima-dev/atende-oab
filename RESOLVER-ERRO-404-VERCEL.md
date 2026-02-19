# ⚠️ RESOLVER ERRO 404 NA VERCEL

## 🔴 Problema

Ao fazer deploy na Vercel, aparece erro **404 NOT_FOUND**.

## ✅ Solução

O problema é que o projeto frontend está dentro de uma pasta aninhada. Você precisa configurar o **Root Directory** na Vercel.

---

## 📋 Passo a Passo

### 1. Acesse seu projeto na Vercel

1. Vá para https://vercel.com/dashboard
2. Clique no projeto `atende-oab`
3. Vá em **Settings** (configurações)

### 2. Configure o Root Directory

1. No menu lateral, clique em **General**
2. Role até a seção **Root Directory**
3. Clique em **Edit**
4. Digite exatamente:
   ```
   projeto-avaliacao-oab/projeto-completo/avalia+dashboard
   ```
5. Clique em **Save**

### 3. Configure Build & Development Settings

Ainda em **Settings**, role até **Build & Development Settings**:

1. **Framework Preset:** Vite
2. **Build Command:** `npm run build`
3. **Output Directory:** `dist`
4. **Install Command:** `npm install`

### 4. Redesployar

1. Vá para a aba **Deployments**
2. Clique nos 3 pontinhos do último deployment
3. Clique em **Redeploy**
4. Aguarde o build completar

---

## 🧪 Testar

Após o deploy:

1. Abra a URL do seu projeto
2. Deve aparecer a página de login ou formulário
3. **NÃO mais o erro 404**

---

## 🆘 Se Ainda Der Erro

### Verificar Build Logs

1. Na aba **Deployments**
2. Clique no deployment com erro
3. Clique em **Build Logs**
4. Procure por erros de compilação

### Erros Comuns

**Erro de módulo não encontrado:**
```bash
# Certifique-se que as dependências estão no package.json correto
```

**Erro de variável de ambiente:**
```bash
# Adicione VITE_API_URL nas Environment Variables
```

**Erro de TypeScript:**
```bash
# Verifique se não há erros de tipo no código
```

---

## 📸 Referência Visual

Suas configurações devem ficar assim:

```
┌─────────────────────────────────────┐
│ Root Directory                      │
│ projeto-avaliacao-oab/projeto-      │
│ completo/avalia+dashboard           │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Build Command                       │
│ npm run build                       │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Output Directory                    │
│ dist                                │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Install Command                     │
│ npm install                         │
└─────────────────────────────────────┘
```

---

## ✅ Checklist Final

- [ ] Root Directory configurado
- [ ] Build Command = `npm run build`
- [ ] Output Directory = `dist`
- [ ] Framework Preset = Vite
- [ ] Variável `VITE_API_URL` adicionada
- [ ] Redeploy feito
- [ ] Site abre sem erro 404

---

## 📞 Ainda com Problemas?

Se depois disso ainda não funcionar:

1. **Delete o projeto na Vercel** completamente
2. **Crie um novo projeto do zero**
3. Na hora de criar, já configure o Root Directory
4. Siga os passos acima

**Ou teste localmente primeiro:**
```bash
cd projeto-avaliacao-oab/projeto-completo/avalia+dashboard
npm install
npm run build
npm run preview
```

Se funcionar localmente mas não na Vercel, o problema é de configuração do deploy.
