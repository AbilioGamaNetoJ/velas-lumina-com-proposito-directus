# 🤖 AGENTS.md — Catálogo de Agentes

> Este projeto utiliza o **AG Kit** com 20 agentes especialistas. Consulte a documentação completa em **[.agents/ARCHITECTURE.md](./.agents/ARCHITECTURE.md)**.

---

## 📖 Contexto

**[README.md](./README.md)** — Site vitrine de velas artesanais (Next.js 15 + Tailwind CSS v4 + Sanity CMS).

---

## 🗂️ Diretórios de Agentes

| Diretório | Descrição |
|-----------|-----------|
| **[.agents/agent/](./.agents/agent/)** | 20 agentes especialistas |
| **[.agents/memory/](./.agents/memory/)** | Memória persistente do projeto |
| **[.agents/rules/GEMINI.md](./.agents/rules/GEMINI.md)** | Regras globais (TIER 0/1/2) |
| **[.agents/workflows/](./.agents/workflows/)** | 13 slash commands |
| **[.agents/ARCHITECTURE.md](./.agents/ARCHITECTURE.md)** | Arquitetura completa do AG Kit |

---

## 🤖 Agentes por Domínio

### Desenvolvimento
| Agente | Quando usar |
|--------|-------------|
| `frontend-specialist` | UI/UX web, React, Next.js, Tailwind |
| `backend-specialist` | APIs, lógica de negócio, Node.js |
| `database-architect` | Schema, migrations, queries SQL |
| `mobile-developer` | Apps iOS/Android, React Native, Flutter |
| `game-developer` | Jogos 2D/3D, mecânicas |

### Qualidade
| Agente | Quando usar |
|--------|-------------|
| `test-engineer` | Estratégias de teste, unitários, integração |
| `qa-automation-engineer` | E2E, pipelines CI, automação |
| `debugger` | Debugging, root cause analysis |
| `performance-optimizer` | Core Web Vitals, bundle size |
| `code-archaeologist` | Código legado, refatoração |

### Infraestrutura & Segurança
| Agente | Quando usar |
|--------|-------------|
| `devops-engineer` | CI/CD, Docker, deploy |
| `security-auditor` | Auditoria, compliance, OWASP |
| `penetration-tester` | Testes de intrusão ofensivos |

### Estratégia & Orquestração
| Agente | Quando usar |
|--------|-------------|
| `orchestrator` | Tarefas multi-agente complexas |
| `project-planner` | Discovery, planejamento, task breakdown |
| `product-manager` | Requisitos, user stories, PRD |
| `product-owner` | Estratégia de produto, backlog, MVP |
| `seo-specialist` | SEO técnico, indexação, sitemap |
| `documentation-writer` | Manuais, docs, READMEs |
| `explorer-agent` | Análise e exploração de codebase |

---

## 🔄 Como invocar

Os agentes são ativados automaticamente pelo protocolo de roteamento em **[.agents/rules/GEMINI.md](./.agents/rules/GEMINI.md)**. Para invocar manualmente:

```
@frontend-specialist refatore o componente Hero
@security-auditor audite as variáveis de ambiente
@orchestrator coordene a migração do banco
```

---

## 🧠 Memória do Projeto

📂 **[.agents/memory/](./.agents/memory/)**
- `MEMORY.md` — Índice de decisões e convenções
- `project-conventions.md` — Padrões de branch (`feature/[slug]`, `fix/[slug]`)
