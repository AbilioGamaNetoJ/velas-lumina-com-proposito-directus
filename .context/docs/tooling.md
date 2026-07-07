---
type: doc
name: tooling
description: Scripts, IDE settings, automation, and developer productivity tips
category: tooling
generated: 2026-07-06
updated: 2026-07-07
status: filled
scaffoldVersion: "2.0.0"
---

# Tooling

## npm Scripts

See `development-workflow.md` for the full table (`dev`, `build`, `postbuild`, `start`, `lint`). Content provisioning (`scripts/setup-directus-content.mjs`) is run directly with `node`, not through an npm script.

## IDE Setup

`.vscode/settings.json` sets `"css.lint.unknownAtRules": "ignore"` — needed so the editor doesn't flag Tailwind v4's `@theme`/`@import "tailwindcss"` at-rules in `app/globals.css` as errors.

## AI Agent Tooling (installed 2026-07-06)

- **`.context/`** — dotcontext harness: this docs set, 11 agent playbooks (`.context/agents/`), 9 skills including the PREVC workflow skills (`.context/skills/`), `.context/config/sensors.json` (build/lint sensors) and `policy.json` (approval rules for `app/**`, `lib/**`, config files, and secret-like paths). Runtime state (`sessions/`, `runtime/`, `cache/semantic/`) is gitignored.
- **`.claude/skills/`** — 14 Claude Code skills installed from the `@tech-leads-club/agent-skills` registry (`accessibility`, `best-practices`, `core-web-vitals`, `create-adr`, `docs-writer`, `frontend-design`, `perf-lighthouse`, `playwright-skill`, `react-best-practices`, `security-best-practices`, `seo`, `tlc-generative-engine-optimization`, `vercel-deploy`, `web-quality-audit`), plus `impeccable` for structured design work (`PRODUCT.md`/`DESIGN.md`).
- **dotcontext MCP server** — exposes `context`, `harness`, `explore`, `sync`, `agent`, `skill` tools for tools that have it configured; not a project dependency, no entry needed in `package.json`.
- A `directus` MCP server (`mcp__directus__*`: `assets`, `files`, `folders`, `items`, `schema`, `system-prompt`, `trigger-flow`) is configured user-side and does apply to this project — its access token used to live committed in `.agents/mcp_config.json` (see `security.md` for the leak this caused); that file is not the source of truth for whether the MCP is available, since MCP servers are configured per-machine.

## Directus Tooling (correction, 2026-07-07)

> An earlier version of this doc claimed the CMS was Sanity and that Directus was noise from another template — that was backwards. See `architecture.md` for the real, current stack.

- No CMS admin UI is embedded in this Next.js app — the Directus admin panel lives on the Directus instance itself.
- `scripts/setup-directus-content.mjs` — idempotent content-provisioning script (`node scripts/setup-directus-content.mjs`, requires `NEXT_PUBLIC_DIRECTUS_URL`/`DIRECTUS_TOKEN` in `.env.local`), useful for (re)seeding `products`/`categories`/`faqs`/`site_settings`/`privacy_policy` on a fresh or existing Directus instance.
