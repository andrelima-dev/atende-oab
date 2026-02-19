# 📝 Como Renomear os Setores

## 📍 Localização do Arquivo

O arquivo que contém a lista de setores é:

```
projeto-avaliacao-oab/projeto-completo/avalia+dashboard/src/pages/FormularioPublico.tsx
```

## ✏️ Como Editar

Abra o arquivo e procure pela **linha 17-23** (aproximadamente):

```typescript
// Setores disponíveis para avaliação
// ⚠️ Edite os nomes abaixo quando os setores forem definidos
const setores = [
  "Setor 1",              // ← Renomeie para o nome real do setor
  "Setor 2",              // ← Renomeie para o nome real do setor
  "Setor 3",              // ← Renomeie para o nome real do setor
  "Tecnologia da Informação"
];
```

### Exemplo de Renomeação:

**Antes:**
```typescript
const setores = [
  "Setor 1",
  "Setor 2",
  "Setor 3",
  "Tecnologia da Informação"
];
```

**Depois:**
```typescript
const setores = [
  "Protocolo",
  "Atendimento ao Advogado",
  "Financeiro",
  "Tecnologia da Informação"
];
```

## 📌 Observações

1. ✅ **Você pode adicionar quantos setores quiser:**
   ```typescript
   const setores = [
     "Setor 1",
     "Setor 2",
     "Setor 3",
     "Setor 4",
     "Setor 5",
     "Tecnologia da Informação",
     "Setor 7"
   ];
   ```

2. ✅ **Você pode remover setores** (exceto se precisar de pelo menos 1):
   ```typescript
   const setores = [
     "Protocolo",
     "Tecnologia da Informação"
   ];
   ```

3. ✅ **Use nomes descritivos e claros**

4. ⚠️ **Sempre mantenha a estrutura do array** (vírgulas entre os itens)

5. ⚠️ **Use aspas duplas** `"Nome do Setor"`

## 🔄 Após Editar

Depois de editar o arquivo:

```bash
# 1. Salvar o arquivo (Ctrl + S)

# 2. Fazer commit (se estiver usando Git)
git add .
git commit -m "feat: Atualizar nomes dos setores"
git push origin main

# 3. Recompilar/reiniciar o frontend
cd projeto-avaliacao-oab/projeto-completo/avalia+dashboard
npm run dev
```

## 🎯 Resultado

Os setores atualizados aparecerão automaticamente na **Etapa 2** do formulário de avaliação:

```
┌──────────────────────────────────────┐
│  Seleção do Setor                    │
├──────────────────────────────────────┤
│  [ Protocolo ]                       │
│  Clique para selecionar              │
│                                      │
│  [ Atendimento ao Advogado ]         │
│  Clique para selecionar              │
│                                      │
│  [ Financeiro ]                      │
│  Clique para selecionar              │
│                                      │
│  [ Tecnologia da Informação ]        │
│  Clique para selecionar              │
└──────────────────────────────────────┘
```

## 🤝 Precisa de Ajuda?

Se tiver dúvidas ou problemas ao editar, entre em contato!

---

**Última atualização:** 19/02/2026
