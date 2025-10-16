Atende OAB


Atende OAB é um sistema web criado para a Ordem dos Advogados do Brasil — Seccional Maranhão (OAB/MA), com o propósito de coletar feedback estruturado dos advogados sobre os serviços e atendimentos oferecidos por setores internos (Tesouraria, TI, TED, entre outros). 
GitHub

Índice

Visão Geral

Funcionalidades

Arquitetura e Tecnologias

Instalação

Configuração

Como usar / fluxo de uso

Contribuição

Roadmap / Próximos passos

Licença

Créditos / Agradecimentos

Visão Geral

O Atende OAB visa tornar mais transparente e eficiente o processo de avaliação interna de serviços oferecidos pela OAB/MA, dando voz aos advogados para que possam manifestar sua opinião de forma estruturada. A plataforma permite:

Enviar feedback para diferentes setores da OAB/MA

Organizar e categorizar avaliações por tipo de serviço

Gerar relatórios com satisfação, métricas e índices

Permitir que gestores vejam estatísticas e análises

Esse feedback ajuda a identificar pontos de melhoria operacionais e promover uma cultura de qualidade no atendimento aos profissionais.

Funcionalidades

Aqui estão algumas das funcionalidades previstas ou já implementadas:

Formulários de avaliação para advogados

Interface de administração para gerenciamento de setores e questionários

Estatísticas e dashboards para análise de feedback

Filtragem e categorização por setor, data, tipo de atendimento

Controle de permissões (quem pode acessar relatórios, etc.)

Responsividade — uso em dispositivos móveis e desktop

Arquitetura & Tecnologias

O projeto está estruturado utilizando as seguintes tecnologias:

Camada / Componente	Tecnologia / Ferramenta	Observações
Frontend	TypeScript, CSS, HTML, (framework / biblioteca usada)	Desenvolvimento de interfaces reativas
Backend / API	(indique framework ou linguagem usada)	Lógica de negócio e persistência de dados
Banco de dados	(ex: PostgreSQL, MySQL, MongoDB)	Armazenamento de feedback, usuários, setores etc.
Autenticação / Autorização	(ex: JWT, OAuth, session)	Controle de acesso à parte administrativa
Infraestrutura / Deploy	(ex: Docker, Heroku, AWS, Netlify)	Estratégia de hospedagem / deploy
Testes	(unitários, integração)	Garantia de qualidade do software
Outras bibliotecas / utilitários	(ex: bibliotecas de gráficos, formulários, validação)	Para suporte à interface e lógica

Nota: adapte esta tabela conforme a real estrutura do seu projeto (se você usa React, Vue, Node.js, Django, etc.).

Instalação

Estas instruções permitirão que você configure uma cópia local do projeto para desenvolvimento e testes.

Pré-requisitos

Node.js (versão mínima recomendada)

NPM ou Yarn

Banco de dados (ex: PostgreSQL / MySQL / outro)

Git

Passos
# Clone o repositório
git clone https://github.com/andrelima-dev/atende-oab.git
cd atende-oab

# Instale dependências
npm install
# ou
yarn install

# Crie arquivo de variáveis de ambiente
cp .env.example .env
# e ajuste com suas credenciais de banco, chaves, URLs etc.

# Executar migrações / setup do banco (se houver)
npm run migrate
# ou comando equivalente

# Iniciar aplicação em modo de desenvolvimento
npm run dev


Depois disso, abra no navegador o endereço (ex: http://localhost:3000) para ver a aplicação rodando localmente.

Configuração / Variáveis de ambiente

No arquivo .env você deve definir variáveis como:

DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME — dados do banco

JWT_SECRET ou chave para autenticação

PORT — porta em que o servidor vai escutar

Outras variáveis específicas do projeto (endpoints externos, chaves de API, domínio, etc.)

Assegure-se de não versionar o arquivo .env com dados sensíveis.

Como usar / Fluxo de uso

Usuário advogado acessa formulário para avaliar um serviço/setor

Seleciona setor (Tesouraria, TI, TED etc.)

Preenche perguntas / escalas de satisfação

Submete avaliação

Administrador / gestor acessa painel de controle

Visualiza métricas, gráficos, filtragens e exporta relatórios

Você pode incluir capturas de tela (screenshots) ou GIFs para ilustrar essas etapas.

Contribuição

Solicitações de issues e pull requests são bem-vindas! Aqui estão algumas diretrizes:

Faça um fork do repositório

Crie uma branch para sua feature ou correção (git checkout -b feature/nova-funcionalidade)

Faça commits claros e bem documentados

Envie pull request com descrição das mudanças

Antes de contribuir, consulte Issues abertas para evitar duplicação de esforços.

Roadmap / Próximos passos

Aqui estão algumas ideias para evoluções futuras:

Integração com sistemas internos da OAB/MA

Envio de notificações (e-mail, SMS) para advogados que avaliarem

Dashboard mais interativo com gráficos dinâmicos

Exportação de relatórios em PDF / Excel

Sistema de autenticação via conta institucional da OAB

Interface multilíngue / acessibilidade

Versão mobile (app ou PWA)

Você pode adicionar uma seção Milestones ou Releases planejadas.

Licença

Este projeto está licenciado sob a Licença MIT — veja o arquivo LICENSE
 para mais detalhes.
