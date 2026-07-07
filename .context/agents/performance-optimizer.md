---
type: agent
name: Performance Optimizer
description: Identify performance bottlenecks
agentType: performance-optimizer
phases: [E, V]
generated: 2026-07-06
status: filled
scaffoldVersion: "2.0.0"
---

## Responsibilities

Lighthouse/Core Web Vitals and the image pipeline for a visually-heavy candle catalog.

## Known Opportunities

- Several components render raw `<img>` tags with Directus/Google-hosted URLs (`ProductDetailModal`, `CartDrawer`, `app/produtos/[slug]/page.tsx`) instead of `next/image` — migrating these would improve LCP, given `next.config.ts` already whitelists `lh3.googleusercontent.com` and `directus.luminacomproposito.com.br` in `remotePatterns`.
- The home page already caches its Directus fetch via ISR (`revalidate = 3600` in `app/page.tsx`) — don't lower this without a reason, it's the main defense against redundant Directus calls.
- `Playfair Display` + `DM Sans` are loaded via `next/font/google` with `display: 'swap'` — already following the low-CLS font-loading pattern; keep any new font additions consistent with that.

## Tooling

- `.claude/skills/core-web-vitals` and `.claude/skills/perf-lighthouse` are installed for structured audits — use them for before/after LCP/INP/CLS measurement rather than eyeballing it.
