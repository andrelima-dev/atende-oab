# 👥 Como Liberar Novos Usuários para o Dashboard

Este guia mostra como adicionar novos usuários que terão acesso ao dashboard administrativo da OAB.

---

## 🎯 Métodos Disponíveis

Existem **4 formas** de criar novos usuários. Escolha a que prefere:

---

## 1️⃣ Script Automático (Mais Rápido)

Cria automaticamente o usuário admin padrão:

```bash
cd backend
npm run seed-admin
```

**Credenciais criadas:**
- Email: `admin@oab.ma.gov.br`
- Senha: `oab@2026`

> ⚠️ Este comando só funciona uma vez. Se o usuário já existir, você verá uma mensagem informando.

---

## 2️⃣ Script Interativo (Recomendado)

Permite criar usuários personalizados via terminal:

```bash
cd backend
npm run criar-usuario
```

**O script perguntará:**
1. Nome completo do usuário
2. Email (será usado para login)
3. Senha

**Exemplo de uso:**
```
==============================================
🔐 Criação de Usuário Admin - Sistema OAB
==============================================

Nome completo: Maria da Silva
Email: maria.silva@oab.ma.gov.br
Senha: maria@2026

✅ Usuário criado com sucesso!
```

---

## 3️⃣ Interface Gráfica - Prisma Studio (Mais Visual)

Gerencia usuários através de uma interface web bonita:

### Passo a Passo:

**1. Inicie o Prisma Studio:**
```bash
cd backend
npm run prisma:studio
```

**2. Abra no navegador:**
```
http://localhost:5555
```

**3. No menu lateral, clique em `Usuario`**

**4. Clique no botão `Add record`**

**5. Preencha os campos:**
- `nome`: Nome completo do usuário
- `email`: Email para login (ex: joao@oab.ma.gov.br)
- `senha`: **⚠️ ATENÇÃO:** Não coloque a senha em texto simples!
- `ativo`: true

### ⚠️ Como Gerar a Senha Hasheada:

A senha precisa ser hasheada antes de inserir no banco. Use este método:

**Opção A - Node.js (Terminal):**
```bash
cd backend
node -e "console.log(require('bcryptjs').hashSync('SUA_SENHA_AQUI', 10))"
```

**Exemplo:**
```bash
node -e "console.log(require('bcryptjs').hashSync('joao@2026', 10))"
```

**Retorno (copie e cole no campo senha):**
```
$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
```

**Opção B - Python:**
```bash
python -c "import bcrypt; print(bcrypt.hashpw('SUA_SENHA'.encode(), bcrypt.gensalt()).decode())"
```

**6. Clique em `Save 1 change`**

---

## 4️⃣ Via API (Para Automatizar)

Cria usuários programaticamente usando a API (requer estar logado):

### Passo a Passo:

**1. Faça login para obter o token:**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@oab.ma.gov.br",
    "senha": "oab@2026"
  }'
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": { ... }
}
```

**2. Use o token para criar novo usuário:**
```bash
curl -X POST http://localhost:3001/api/auth/usuario \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Santos",
    "email": "joao.santos@oab.ma.gov.br",
    "senha": "joao@2026"
  }'
```

**Resposta de sucesso:**
```json
{
  "id": 2,
  "email": "joao.santos@oab.ma.gov.br",
  "nome": "João Santos",
  "ativo": true,
  "created_at": "2026-02-10T14:45:00.000Z"
}
```

---

## 🔐 Boas Práticas de Senha

Ao criar usuários, siga estas recomendações:

✅ **Senhas Fortes:**
- Mínimo 8 caracteres
- Misture letras e números
- Use caracteres especiais
- Exemplo: `@dmin2026!`

✅ **Padrão Sugerido:**
```
nome.sobrenome@2026
maria.silva@2026
joao.santos@2026
```

❌ **Evite:**
- Senhas muito curtas (123, senha)
- Dados pessoais óbvios (data de nascimento)
- Mesma senha para todos

---

## 📋 Lista de Usuários Comuns

Você pode criar usuários para diferentes funções:

| Nome | Email | Função |
|------|-------|--------|
| Administrador Geral | admin@oab.ma.gov.br | Super admin |
| Coordenador Atendimento | coordenador@oab.ma.gov.br | Gerente |
| Analista Dashboard | analista@oab.ma.gov.br | Visualizador |

---

## 🔧 Gerenciar Usuários Existentes

### Ver Todos os Usuários

**Opção 1 - Prisma Studio:**
```bash
cd backend
npm run prisma:studio
```
Acesse http://localhost:5555

**Opção 2 - SQL Direto:**
```bash
cd backend
npx prisma db execute --stdin <<EOF
SELECT id, nome, email, ativo, created_at FROM usuarios;
EOF
```

### Desativar um Usuário

Em vez de deletar, desative o usuário (ele não poderá mais fazer login):

**Via Prisma Studio:**
1. Acesse http://localhost:5555
2. Clique em `Usuario`
3. Encontre o usuário
4. Mude o campo `ativo` para `false`
5. Salve

**Via SQL:**
```sql
UPDATE usuarios SET ativo = false WHERE email = 'usuario@oab.ma.gov.br';
```

### Reativar um Usuário

```sql
UPDATE usuarios SET ativo = true WHERE email = 'usuario@oab.ma.gov.br';
```

### Redefinir Senha

**Método 1 - Gerar novo hash:**
```bash
cd backend
node -e "console.log(require('bcryptjs').hashSync('nova_senha_2026', 10))"
```

**Método 2 - Usar Prisma Studio:**
1. Gere o hash da nova senha (comando acima)
2. Acesse Prisma Studio
3. Edite o campo `senha` do usuário
4. Cole o hash gerado
5. Salve

### Deletar um Usuário (Cuidado!)

```sql
DELETE FROM usuarios WHERE email = 'usuario@oab.ma.gov.br';
```

> ⚠️ **Atenção:** Deletar é permanente. Prefira desativar!

---

## 📊 Monitorar Acessos

Para ver quando os usuários foram criados:

```sql
SELECT 
  id,
  nome,
  email,
  ativo,
  created_at as "Criado em"
FROM usuarios
ORDER BY created_at DESC;
```

---

## 🔒 Segurança

### ✅ Checklist de Segurança:

- [ ] Todas as senhas são fortes
- [ ] Não compartilhe senhas por email/chat
- [ ] Desative usuários inativos
- [ ] Revise a lista de usuários periodicamente
- [ ] Use senhas únicas para cada usuário
- [ ] Documente quem tem acesso ao dashboard

### 🚨 Em Caso de Comprometimento:

Se uma senha foi exposta:

1. **Desative o usuário imediatamente:**
   ```sql
   UPDATE usuarios SET ativo = false WHERE email = 'comprometido@oab.ma.gov.br';
   ```

2. **Crie um novo usuário** com credenciais diferentes

3. **Investigue** se houve acesso não autorizado

---

## 📧 Informar Credenciais ao Usuário

Quando criar um novo usuário, envie as credenciais de forma segura:

### Modelo de Email:

```
Assunto: Acesso ao Dashboard OAB Maranhão

Olá [NOME],

Você recebeu acesso ao Dashboard Administrativo de Avaliações da OAB-MA.

🔗 Link de acesso: http://[SEU_DOMINIO]/login

📧 Email: [EMAIL]
🔑 Senha: [SENHA_TEMPORARIA]

⚠️ IMPORTANTE:
- Guarde estas credenciais em local seguro
- Não compartilhe sua senha
- O sistema expira sessões após 24h de inatividade

Em caso de dúvidas, entre em contato com a equipe de TI.

Atenciosamente,
Equipe OAB Maranhão
```

---

## ❓ Perguntas Frequentes

### P: Quantos usuários posso criar?
**R:** Não há limite. Crie quantos forem necessários.

### P: O usuário pode trocar a própria senha?
**R:** Atualmente não (futuro recurso). A senha deve ser redefinida por um admin.

### P: Posso usar o mesmo email duas vezes?
**R:** Não. Cada email deve ser único no sistema.

### P: Como saber se um usuário está logado agora?
**R:** O sistema usa tokens JWT. Tokens expiram em 24h. Não há listagem de usuários online.

### P: Posso criar usuários em lote?
**R:** Sim, use a API ou crie um script personalizado.

---

## 🎯 Próximos Passos Recomendados

1. ✅ Criar usuário admin principal
2. ✅ Testar login e acesso
3. ✅ Criar usuários para sua equipe
4. ✅ Documentar quem tem acesso
5. ✅ Estabelecer política de senhas
6. ✅ Revisar usuários mensalmente

---

## 📞 Suporte

Para questões técnicas sobre gerenciamento de usuários:
- Acesse a documentação completa: [LOGIN-IMPLEMENTADO.md](./LOGIN-IMPLEMENTADO.md)
- Veja o guia de autenticação: [AUTENTICACAO.md](./AUTENTICACAO.md)

---

**Sistema de Gerenciamento de Usuários - OAB Maranhão** 🏛️  
*Dashboard Administrativo de Avaliações*
