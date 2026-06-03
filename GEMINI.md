# 🕯️ Velas Lumina com Propósito — Guia da IA

> **Pare aqui e leia antes de qualquer ação.** Este é o ponto de entrada para todas as IAs que trabalham neste projeto.

---

## 📖 Contexto do Projeto

Consulte **[README.md](./README.md)** para entender:
- O que é o projeto (site vitrine de velas artesanais)
- Stack tecnológica (Next.js 15, Tailwind CSS v4, Sanity CMS)
- Estrutura de diretórios (`app/`, `components/`, `lib/`, `sanity/`, `types/`)
- Como rodar localmente e configurar `.env.local`

---

## 🧠 AG Kit — Regras e Agentes

Este projeto utiliza o **AG Kit**, um sistema modular de agentes, skills e workflows. Consulte a arquitetura completa em:

📄 **[.agents/ARCHITECTURE.md](./.agents/ARCHITECTURE.md)**

### Regras Globais (PRIORIDADE MÁXIMA)

📄 **[.agents/rules/GEMINI.md](./.agents/rules/GEMINI.md)**

- **TIER 0**: Regras universais — idioma, clean code, dependências, memória
- **TIER 1**: Regras de código — classificação de requisições, roteamento de agentes, Socratic Gate
- **TIER 2**: Regras de design — UX/UI, Purple Ban, anti-clichê

> 🔴 **MANDATÓRIO:** Leia `.agents/rules/GEMINI.md` antes de qualquer implementação.

---

## 🤖 Agentes Especialistas (20)

📂 **[.agents/agent/](./.agents/agent/)**

| Agente | Domínio |
|--------|---------|
| `frontend-specialist` | Web UI/UX, React, Next.js |
| `backend-specialist` | API, lógica de negócio |
| `database-architect` | Schema, SQL |
| `mobile-developer` | iOS, Android, React Native |
| `devops-engineer` | CI/CD, deploy |
| `security-auditor` | Segurança, vulnerabilidades |
| `test-engineer` | Testes, QA |
| `debugger` | Debugging sistemático |
| `performance-optimizer` | Performance, Core Web Vitals |
| `seo-specialist` | SEO, indexação |
| `orchestrator` | Coordenação multi-agente |
| `project-planner` | Planejamento, discovery |
| `documentation-writer` | Documentação |
| `product-manager` | Requisitos, user stories |
| `product-owner` | Estratégia, backlog, MVP |
| `code-archaeologist` | Código legado, refatoração |
| `explorer-agent` | Análise de codebase |
| `penetration-tester` | Testes de intrusão |
| `qa-automation-engineer` | E2E, pipelines CI |
| `game-developer` | Jogos |

> O agente correto é selecionado automaticamente pelo protocolo de roteamento em `.agents/rules/GEMINI.md`.

---

## 🧩 Memória Persistente

📂 **[.agents/memory/](./.agents/memory/)**

| Arquivo | Conteúdo |
|---------|----------|
| [MEMORY.md](./.agents/memory/MEMORY.md) | Índice de memórias do projeto |
| [project-conventions.md](./.agents/memory/project-conventions.md) | Convenções (branches, commits, padrões) |

> 🔴 **MANDATÓRIO:** Leia `.agents/memory/MEMORY.md` ao iniciar cada sessão.

---

## 🔄 Workflows (13 Slash Commands)

📂 **[.agents/workflows/](./.agents/workflows/)**

| Comando | Propósito |
|---------|-----------|
| `/brainstorm` | Discovery socrático |
| `/coordinate` | Coordenação multi-agente avançada |
| `/create` | Criar novas features |
| `/debug` | Depurar problemas |
| `/deploy` | Deploy da aplicação |
| `/enhance` | Melhorar código existente |
| `/orchestrate` | Orquestração multi-agente |
| `/plan` | Planejamento de tarefas |
| `/preview` | Preview de alterações |
| `/remember` | Salvar na memória persistente |
| `/status` | Verificar status do projeto |
| `/test` | Executar testes |
| `/verify` | Verificar alterações em execução |

---

## 🚀 Início Rápido

```bash
npm install
# Configure .env.local com seu projeto Sanity
npm run dev        # http://localhost:3001
npm run lint       # Verificação de código
```
