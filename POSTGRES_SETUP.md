# 📝 Como Iniciar PostgreSQL no Windows

## Opção 1: Usando PostgreSQL Local (Recomendado)

### Passo 1: Verificar se PostgreSQL está instalado
Abra o PowerShell e execute:
```powershell
psql --version
```

Se não estiver instalado, baixe em: https://www.postgresql.org/download/windows/

### Passo 2: Iniciar o serviço PostgreSQL
Execute como Administrador:

**Windows 10/11:**
```powershell
# Iniciar o serviço
Get-Service postgresql-x64-* | Start-Service

# Ou manualmente através dos Serviços do Windows:
# 1. Pressione Win + R
# 2. Digite: services.msc
# 3. Procure por "postgresql"
# 4. Clique com botão direito > Iniciar
```

### Passo 3: Conectar ao banco de dados
```powershell
# Conectar como superusuário
psql -U postgres -h localhost

# Dentro do psql, criar o banco de dados (se não existir)
CREATE DATABASE atende_oab;
```

### Passo 4: Verificar a conexão
No terminal, execute:
```powershell
psql -U postgres -h localhost -d atende_oab
```

Se conseguir conectar, está pronto para executar as migrations!

---

## Opção 2: Usando Docker

Se você tem Docker instalado:

```powershell
docker run -d `
  --name postgres-atende-oab `
  -e POSTGRES_USER=postgres `
  -e POSTGRES_PASSWORD=postgres `
  -e POSTGRES_DB=atende_oab `
  -p 5432:5432 `
  postgres:15
```

---

## Próximos Passos

Após iniciar o PostgreSQL, execute no terminal do backend:

```powershell
cd C:\Users\ResTIC16\Desktop\atende-oab\backend
npm run prisma:migrate -- --name init
npm run dev
```

O servidor deve estar rodando em `http://localhost:3001`

