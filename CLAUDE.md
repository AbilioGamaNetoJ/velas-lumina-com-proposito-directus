# 🕯️ Velas Lumina com Propósito — Claude Code Guide

> Entry point for Claude Code and other AI assistants working on this project.

---

## Project Context

**[README.md](./README.md)** — Full project overview: artisanal candle showcase site built with Next.js 15, Tailwind CSS v4, and Directus v11 CMS. WhatsApp-based checkout, no online payments.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Directus v11 (self-hosted headless CMS) · @directus/sdk v22

**Key files:**
- `lib/directus.ts` — Directus SDK client + `fileUrl()` helper
- `lib/directus/get-products.ts` — `getProducts()` and `getProductBySlug()` with local fallback
- `lib/data.ts` — Static fallback catalogue (14 products)

---

## AG Kit Architecture

This project uses **AG Kit** — a modular system of agents, skills, and workflows.

**[.agents/ARCHITECTURE.md](./.agents/ARCHITECTURE.md)** — Complete architecture (20 agents, 45 skills, 13 workflows).

---

## Global Rules (READ FIRST)

**[.agents/rules/GEMINI.md](./.agents/rules/GEMINI.md)** — Mandatory rules:
- **TIER 0**: Language, clean code, file dependencies, memory system
- **TIER 1**: Request classification, agent routing, Socratic Gate, final checklist
- **TIER 2**: Design rules (Purple Ban, anti-cliché, deep design thinking)

---

## Project Memory

**[.agents/memory/](./.agents/memory/)**
- `MEMORY.md` — Persistent project memory index
- `project-conventions.md` — Git workflow, branch naming (`feature/[slug]`, `fix/[slug]`)

> Always read `.agents/memory/MEMORY.md` at session start.

---

## Available Agents

**[.agents/agent/](./.agents/agent/)** — 20 specialist agents:
`frontend-specialist`, `backend-specialist`, `database-architect`, `mobile-developer`, `devops-engineer`, `security-auditor`, `penetration-tester`, `test-engineer`, `debugger`, `performance-optimizer`, `seo-specialist`, `orchestrator`, `project-planner`, `documentation-writer`, `product-manager`, `product-owner`, `code-archaeologist`, `explorer-agent`, `qa-automation-engineer`, `game-developer`

---

## Workflows

**[.agents/workflows/](./.agents/workflows/)** — Slash commands: `/brainstorm`, `/coordinate`, `/create`, `/debug`, `/deploy`, `/enhance`, `/orchestrate`, `/plan`, `/preview`, `/remember`, `/status`, `/test`, `/verify`

---

## Quick Start

```bash
npm install
npm run dev    # http://localhost:3001
npm run lint
npm run build
```
