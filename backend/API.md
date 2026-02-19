# 📚 Documentação da API - Atende OAB

## 🔐 Autenticação

Todas as rotas protegidas requerem um token JWT no header:
```
Authorization: Bearer {token}
```

---

## 🔑 Auth Routes (`/api/auth`)

### 1. Login
**POST** `/api/auth/login`

Autentica um usuário e retorna um token JWT.

**Body:**
```json
{
  "email": "admin@oab.ma.gov.br",
  "senha": "oab@2026"
}
```

**Response 200:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "email": "admin@oab.ma.gov.br",
    "nome": "Administrador OAB"
  }
}
```

---

### 2. Verificar Token
**GET** `/api/auth/verificar` 🔒

Verifica se o token JWT é válido.

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "valido": true,
  "usuario": {
    "id": 1,
    "email": "admin@oab.ma.gov.br",
    "nome": "Administrador OAB"
  }
}
```

---

## 👥 Usuários (`/api/auth/usuarios`)

### 3. Listar Usuários
**GET** `/api/auth/usuarios` 🔒

Lista todos os usuários cadastrados.

**Response 200:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "email": "admin@oab.ma.gov.br",
      "nome": "Administrador OAB",
      "ativo": true,
      "created_at": "2026-02-10T12:00:00.000Z",
      "updated_at": "2026-02-10T12:00:00.000Z"
    }
  ]
}
```

---

### 4. Buscar Usuário por ID
**GET** `/api/auth/usuarios/:id` 🔒

Busca um usuário específico.

**Response 200:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "admin@oab.ma.gov.br",
    "nome": "Administrador OAB",
    "ativo": true,
    "created_at": "2026-02-10T12:00:00.000Z",
    "updated_at": "2026-02-10T12:00:00.000Z"
  }
}
```

---

### 5. Criar Usuário
**POST** `/api/auth/usuarios` 🔒

Cria um novo usuário.

**Body:**
```json
{
  "email": "novo@oab.ma.gov.br",
  "senha": "senha123",
  "nome": "João Silva"
}
```

**Response 201:**
```json
{
  "id": 2,
  "email": "novo@oab.ma.gov.br",
  "nome": "João Silva",
  "ativo": true,
  "created_at": "2026-02-19T10:00:00.000Z"
}
```

---

### 6. Atualizar Usuário
**PUT** `/api/auth/usuarios/:id` 🔒

Atualiza dados de um usuário.

**Body (todos os campos são opcionais):**
```json
{
  "email": "novoemail@oab.ma.gov.br",
  "nome": "João Silva Santos",
  "senha": "novaSenha123",
  "ativo": true
}
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "email": "novoemail@oab.ma.gov.br",
    "nome": "João Silva Santos",
    "ativo": true,
    "created_at": "2026-02-19T10:00:00.000Z",
    "updated_at": "2026-02-19T11:30:00.000Z"
  }
}
```

---

### 7. Deletar Usuário
**DELETE** `/api/auth/usuarios/:id` 🔒

Remove um usuário do sistema.

**Response 200:**
```json
{
  "success": true,
  "message": "Usuário deletado com sucesso"
}
```

---

### 8. Ativar/Desativar Usuário
**PATCH** `/api/auth/usuarios/:id/toggle-status` 🔒

Alterna o status ativo/inativo de um usuário.

**Response 200:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "email": "usuario@oab.ma.gov.br",
    "nome": "João Silva",
    "ativo": false,
    "created_at": "2026-02-19T10:00:00.000Z",
    "updated_at": "2026-02-19T12:00:00.000Z"
  },
  "message": "Usuário desativado com sucesso"
}
```

---

## 📊 Avaliações (`/api/avaliacoes`)

### 9. Criar Avaliação
**POST** `/api/avaliacoes` ✅ Público

Cria uma nova avaliação (formulário público).

**Body:**
```json
{
  "nome_advogado": "Maria Silva",
  "numero_ordem": "12345/MA",
  "processo": "0001234-56.2026.8.10.0001",
  "setor": "Protocolo",
  "nota_atendimento": 5,
  "nota_clareza": 4,
  "nota_agilidade": 5,
  "nota_cordialidade": 5,
  "nota_eficiencia": 4,
  "comentario": "Excelente atendimento!"
}
```

**Campos obrigatórios:** `nome_advogado`, `numero_ordem`, `setor`

**Response 201:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nome_advogado": "Maria Silva",
    "numero_ordem": "12345/MA",
    "processo": "0001234-56.2026.8.10.0001",
    "setor_id": 1,
    "nota_atendimento": 5,
    "nota_clareza": 4,
    "nota_agilidade": 5,
    "nota_cordialidade": 5,
    "nota_eficiencia": 4,
    "comentario": "Excelente atendimento!",
    "created_at": "2026-02-19T14:30:00.000Z",
    "setor": {
      "id": 1,
      "nome": "Protocolo"
    }
  }
}
```

---

### 10. Listar Avaliações
**GET** `/api/avaliacoes` 🔒

Lista todas as avaliações com paginação e filtros.

**Query Parameters:**
- `page` (default: 1) - Número da página
- `limit` (default: 50) - Itens por página
- `setor` - Filtrar por setor específico
- `dataInicio` - Data inicial (YYYY-MM-DD)
- `dataFim` - Data final (YYYY-MM-DD)
- `busca` - Buscar por nome, OAB ou processo

**Exemplo:**
```
GET /api/avaliacoes?page=1&limit=20&setor=Protocolo&dataInicio=2026-02-01&dataFim=2026-02-28
```

**Response 200:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nome_advogado": "Maria Silva",
      "numero_ordem": "12345/MA",
      "processo": "0001234-56.2026.8.10.0001",
      "setor": "Protocolo",
      "nota_atendimento": 5,
      "nota_clareza": 4,
      "nota_agilidade": 5,
      "nota_cordialidade": 5,
      "nota_eficiencia": 4,
      "comentario": "Excelente atendimento!",
      "created_at": "2026-02-19T14:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

---

### 11. Buscar Avaliação por ID
**GET** `/api/avaliacoes/:id` 🔒

Busca uma avaliação específica.

**Response 200:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nome_advogado": "Maria Silva",
    "numero_ordem": "12345/MA",
    "processo": "0001234-56.2026.8.10.0001",
    "setor": "Protocolo",
    "nota_atendimento": 5,
    "nota_clareza": 4,
    "nota_agilidade": 5,
    "nota_cordialidade": 5,
    "nota_eficiencia": 4,
    "comentario": "Excelente atendimento!",
    "created_at": "2026-02-19T14:30:00.000Z"
  }
}
```

---

### 12. Atualizar Avaliação
**PUT** `/api/avaliacoes/:id` 🔒

Atualiza uma avaliação existente.

**Body (todos os campos são opcionais):**
```json
{
  "nome_advogado": "Maria Silva Santos",
  "numero_ordem": "12345/MA",
  "processo": "0001234-56.2026.8.10.0001",
  "setor": "Atendimento",
  "nota_atendimento": 5,
  "nota_clareza": 5,
  "nota_agilidade": 5,
  "nota_cordialidade": 5,
  "nota_eficiencia": 5,
  "comentario": "Atendimento perfeito!"
}
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nome_advogado": "Maria Silva Santos",
    "setor": "Atendimento",
    ...
  }
}
```

---

### 13. Deletar Avaliação
**DELETE** `/api/avaliacoes/:id` 🔒

Remove uma avaliação.

**Response 200:**
```json
{
  "success": true,
  "message": "Avaliação deletada com sucesso"
}
```

---

### 14. Estatísticas
**GET** `/api/avaliacoes/estatisticas` 🔒

Retorna estatísticas completas para o dashboard.

**Query Parameters:**
- `dataInicio` - Data inicial (YYYY-MM-DD)
- `dataFim` - Data final (YYYY-MM-DD)

**Exemplo:**
```
GET /api/avaliacoes/estatisticas?dataInicio=2026-02-01&dataFim=2026-02-28
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "totalAvaliacoes": 150,
    "mediaGeral": 4.35,
    "mediasGerais": {
      "atendimento": 4.5,
      "clareza": 4.3,
      "agilidade": 4.2,
      "cordialidade": 4.6,
      "eficiencia": 4.15
    },
    "estatisticasPorSetor": [
      {
        "setor": "Protocolo",
        "total": 75,
        "mediaGeral": 4.5,
        "medias": {
          "atendimento": 4.6,
          "clareza": 4.4,
          "agilidade": 4.3,
          "cordialidade": 4.7,
          "eficiencia": 4.5
        }
      },
      {
        "setor": "Atendimento",
        "total": 50,
        "mediaGeral": 4.2,
        "medias": {
          "atendimento": 4.3,
          "clareza": 4.1,
          "agilidade": 4.0,
          "cordialidade": 4.5,
          "eficiencia": 4.1
        }
      }
    ],
    "avaliacoesPorDia": {
      "2026-02-01": 5,
      "2026-02-02": 8,
      "2026-02-03": 12,
      ...
    }
  }
}
```

---

### 15. Listar Setores
**GET** `/api/avaliacoes/setores` 🔒

Lista todos os setores com contagem de avaliações.

**Response 200:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nome": "Protocolo",
      "totalAvaliacoes": 75
    },
    {
      "id": 2,
      "nome": "Atendimento",
      "totalAvaliacoes": 50
    },
    {
      "id": 3,
      "nome": "Financeiro",
      "totalAvaliacoes": 25
    }
  ]
}
```

---

## 🚨 Códigos de Erro

- **400** - Bad Request (dados inválidos)
- **401** - Unauthorized (não autenticado)
- **403** - Forbidden (token inválido/expirado)
- **404** - Not Found (recurso não encontrado)
- **500** - Internal Server Error (erro no servidor)

---

## 📝 Notas Importantes

1. **Rotas Públicas (✅)**: Não requerem autenticação
2. **Rotas Protegidas (🔒)**: Requerem token JWT no header
3. **Notas**: Devem estar entre 1 e 5
4. **Paginação**: Padrão é 50 itens por página
5. **Filtros**: Podem ser combinados
6. **Datas**: Formato ISO 8601 (YYYY-MM-DD)

---

## 🔧 Melhorias Implementadas

✅ Autenticação JWT completa  
✅ CRUD completo de avaliações  
✅ CRUD completo de usuários  
✅ Paginação e filtros avançados  
✅ Estatísticas detalhadas por setor  
✅ Validações robustas  
✅ Proteção de rotas sensíveis  
✅ Gestão de usuários (ativar/desativar)  
✅ Busca por múltiplos campos  
✅ Contagem de avaliações por setor  

---

## 🔜 Próximas Melhorias Sugeridas

- [ ] Rate limiting
- [ ] Logging com Winston
- [ ] Exportação para CSV/Excel
- [ ] Recuperação de senha
- [ ] Refresh tokens
- [ ] Testes automatizados
- [ ] Documentação Swagger/OpenAPI
