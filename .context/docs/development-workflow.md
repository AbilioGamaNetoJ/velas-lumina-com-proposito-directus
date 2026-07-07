---
type: doc
name: development-workflow
description: Day-to-day engineering processes, branching, and contribution guidelines
category: workflow
generated: 2026-07-06
updated: 2026-07-07
status: filled
scaffoldVersion: "2.0.0"
---

# Development Workflow

## Local Commands

| Command | Does |
|---|---|
| `npm run dev` | `next dev -p 3001` |
| `npm run build` | `next build`, then `postbuild` runs `next-sitemap` |
| `npm run start` | `next start -p 3001` |
| `npm run lint` | `next lint` (ESLint) |
| `node scripts/setup-directus-content.mjs` | Idempotent content provisioning script — creates/updates the `products`, `categories`, `faqs` collections and `site_settings`/`privacy_policy` singletons on a Directus instance, seeded from `lib/data.ts`. Not wired into `package.json` — run directly with Node. Requires `NEXT_PUBLIC_DIRECTUS_URL`/`DIRECTUS_TOKEN` in `.env.local` or `.env`. |

## Environment Files

- `.env.example` — committed template with placeholder values for `NEXT_PUBLIC_DIRECTUS_URL`, `DIRECTUS_TOKEN`, `SITE_URL`. Copy it to `.env.local` and fill in real values (`cp .env.example .env.local`).
- `.env` / `.env.local` — both gitignored (`.gitignore` blocks the literal `.env` filename plus `*.env`, `.env.local`, etc.). `.env.local` is where the real `DIRECTUS_TOKEN` and any local overrides (e.g. `SITE_URL=http://localhost:3001`) live. Note: an earlier version of this doc claimed `.env` was "committed by design" — that was never actually true in this repo's git history (`.env` has never been tracked); `.env.example` is the correct committed artifact.

## Branching & Commits

Single `main` branch, no CI configured (no `.github/workflows`), commits pushed directly — there is no PR-based review process today. Commit messages are informal Conventional-Commits-flavored Portuguese (`feat: modificando a navbar na versão mobile`, `chore: adiciona google site verification`, `fix: resolvendo bugs na animação de entrada`), mixed with plain descriptive messages. Follow that existing style (`tipo: descrição em português`) rather than introducing a new convention.

## Review Expectations

There is no automated gate (no tests, no CI) — `npm run lint` and `npm run build` are the only mechanical checks before shipping. Given the WhatsApp-first, no-backend nature of the app, the highest-value manual check before any commit touching the catalog or cart is walking the real user flow: Home → filter/search → product modal or detail page → add to cart → "Enviar Pedido via WhatsApp" → confirm the generated message is well-formed.

## Known Gap: CHANGELOG.md

`CLAUDE.md`/`AGENTS.md` both instruct updating a `[Não lançado]` section of `CHANGELOG.md` before any visually/architecturally significant commit — but **no `CHANGELOG.md` exists in this repository yet**. Either create one before the next significant change, or treat that instruction as aspirational until it does.
