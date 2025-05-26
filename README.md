# 🧠 Tektus.OS

![status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow) ![license](https://img.shields.io/badge/license-MIT-green) ![nextjs](https://img.shields.io/badge/made%20with-Next.js-blue)

Tektus.OS é um sistema modular de gestão criado especialmente para agências de marketing digital e growth. Centraliza operações essenciais como gestão de clientes, tarefas, funil de vendas, conteúdo, automações, financeiro e muito mais — inspirado na experiência fluida e personalizável do Notion, mas com foco em performance, automação e growth.

Desenvolvido por [Tektus Publicidade](https://tektus.com.br).

---

## 🚧 Em desenvolvimento
Este projeto está em fase ativa de desenvolvimento. Funcionalidades, estrutura e documentação podem mudar com frequência.

Versão atual: `v0.1-alpha`

---

## 🚀 Tecnologias
- Next.js 14 + TypeScript
- TailwindCSS
- Prisma ORM
- PostgreSQL
- React Query
- Zustand
- Shadcn/ui
- i18next (tradução)
- Vercel (deploy)
- Railway (banco)

---

## ⚡ Instalação Local
```bash
# Clone o projeto
git clone https://github.com/Agenciatektus/Tektus-OS.git
cd Tektus-OS

# Instale dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com sua conexão PostgreSQL

# Execute as migrações
yarn prisma migrate dev

# Inicie o servidor
yarn dev
```

---

## 📁 Estrutura de Pastas
```
Tektus-OS/
├── app/                # Frontend Next.js
│   ├── modules/        # Módulos (tarefas, vendas, clientes, etc)
│   ├── components/     # Componentes visuais reutilizáveis
│   └── ...
├── prisma/             # Schema + migrações
├── lib/                # Hooks, stores, helpers
├── public/             # Assets públicos
├── docs/               # Documentação e wikis
└── ...
```

---

## ✨ Funcionalidades
- Dashboard geral e por setor
- CRM de vendas com funis, leads, CAC, automação de conversão
- Cadastro e gestão de clientes com rastreabilidade de origem
- Tabela de tarefas estilo Notion com prioridades e filtros
- Central de conteúdo, campanhas e assets
- Central de tráfego e distribuição de demandas
- Central financeira (receitas, despesas, contratos)
- Central de RH (colaboradores, férias, avaliações)
- Central de relatórios customizáveis
- Automação de onboarding e integrações externas
- Interface traduzida (pt-BR)
- Sessões autenticadas com permissões

---

## 📚 Documentação e Wikis
A documentação detalhada dos módulos, estrutura de banco de dados, planejamento e fluxos está disponível na pasta `asset-criacao/planejamento-tektus-os/`.

- [Planejamento Detalhado](asset-criacao/planejamento-tektus-os/planejamento-detalhado.md)
- [Estrutura de Banco de Dados](asset-criacao/planejamento-tektus-os/estrutura-database.md)
- [Wikis dos Módulos](asset-criacao/planejamento-tektus-os/)

---

## 🤝 Contribuição
Contribuições são bem-vindas! Recomenda-se acompanhar os commits e issues para evitar conflitos com alterações recentes.

---

## 📝 Licença

Este projeto está sob licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

Desenvolvido por Agência Tektus.
