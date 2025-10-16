Projeto Avaliação OAB – Atende OAB (versão completa)


Uma plataforma para coletar, gerenciar e analisar avaliações de atendimento em setores da OAB/MA, com interfaces para advogados e painel administrativo.

1. Visão Geral

O Projeto Avaliação OAB — parte do sistema Atende OAB — tem por objetivo central permitir que advogados classifiquem serviços e setores (Tesouraria, TI, TED, etc.) por meio de questionários, e que gestores internos possam visualizar estatísticas, relatórios e dados analíticos dessas avaliações.

Ele busca:

Dar voz aos usuários (advogados) para apontar melhorias

Automatizar a coleta de dados de satisfação

Prover dashboards úteis para tomada de decisão

Promover transparência e monitoramento dentro da instituição

2. Recursos Principais

Aqui estão os módulos/funcionalidades esperadas (ou já implementadas):

Módulo / Área	Funcionalidade	Descrição
Avaliação pública	Formulário de avaliação	Advogados preenchem um formulário estruturado, escolhendo setor e respondendo perguntas de satisfação
Autenticação / controle	Login / Permissões	Backend gerencia quem pode acessar painel administrativo, quem pode enviar avaliação etc.
Painel administrativo	Dashboard / Gráficos	Exibição de métricas (média de notas, número de avaliações, evolução ao longo do tempo)
Filtragem / Segmentação	Filtros por setor, data, tipo	Permite cruzar avaliações por critérios específicos
Exportação / Relatórios	Exportar dados	Gerar relatórios (CSV, Excel, PDF) para análises externas
Gerenciamento de setores / perguntas	CRUD	Administradores podem criar / editar / remover setores, perguntas e escalas de resposta
Interface responsiva	Compatível com mobile	As telas devem adaptar-se bem a dispositivos de diferentes tamanhos
3. Arquitetura & Tecnologias Utilizadas (exemplo)

Ajuste conforme o que realmente está usado no projeto

Frontend: React, Vue, Angular (ou framework escolhido) + TypeScript / JavaScript

Backend / API: Node.js + Express / Nest.js, ou outro framework de sua escolha

Banco de Dados: PostgreSQL / MySQL / outro relacional

Autenticação / Autorização: JWT, middleware de controle de permissões

Bibliotecas auxiliares: Gráficos (Chart.js, D3, etc.), bibliotecas de formulários, utilitários de validação

Deploy / Infraestrutura: Docker, servidor VPS / nuvem, CI/CD

Testes: Testes unitários, testes de integração (opcional)

Segurança / boas práticas: Validação de entrada, sanitização, controle de CORS, uso de variáveis de ambiente

4. Estrutura do Projeto (Exemplo de Pastas)

Uma sugestão de organização:

/projeto-completo
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── models / entities
│   │   ├── services
│   │   ├── routes
│   │   └── middlewares
│   ├── migrations
│   ├── config
│   └── index.ts (ou server.js)
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services / api
│   │   ├── assets
│   │   └── styles
│   └── public
│
├── scripts (scripts de automação, seeders, etc.)
├── .env.example
├── README.md
└── package.json (frontend e backend ou mono‐repo)

5. Instalação & Configuração
Pré-requisitos

Node.js (versão mínima recomendada, ex: 16+)

NPM ou Yarn

Banco de dados instalado (ex: PostgreSQL)

Git

Passos para rodar localmente

Clone o repositório

git clone https://github.com/andrelima-dev/atende-oab.git
cd atende-oab/projeto-avaliacao-oab/projeto-completo


Configurar variáveis de ambiente

Copie o arquivo de exemplo:

cp .env.example .env


Edite .env com os parâmetros reais (host, porta, usuário, senha, secret, etc.).

Instalar dependências (backend e frontend)

No backend:

cd backend
npm install


No frontend:

cd ../frontend
npm install


Rodar migrações / seeds (caso existam)

No backend:

npm run migrate
npm run seed   # opcional, se houver dados iniciais


Iniciar servidores

Backend:

npm run dev


Frontend:

npm run dev


Acessar via navegador

Vá para http://localhost:3000 (ou porta configurada) para ver a aplicação em funcionamento.
