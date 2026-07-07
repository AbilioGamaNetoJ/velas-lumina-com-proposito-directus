---
type: agent
name: Devops Specialist
description: Design and maintain CI/CD pipelines
agentType: devops-specialist
phases: [E, C]
generated: 2026-07-06
status: filled
scaffoldVersion: "2.0.0"
---

## Responsibilities

Vercel deployment and environment variable hygiene for a site with no CI today.

## Workflow

1. Deploy target is Vercel; the home page uses ISR (`revalidate = 3600`).
2. Verify Vercel project env vars mirror `.env`/`.env.local`: `NEXT_PUBLIC_DIRECTUS_URL`, `DIRECTUS_TOKEN`, `SITE_URL`. `DIRECTUS_TOKEN` is needed at request time (every product/settings fetch uses it), unlike the old Sanity-era import token — don't skip it when provisioning a new environment.
3. `npm run build` triggers `next-sitemap` via `postbuild` — confirm `next-sitemap.config.cjs`'s site URL matches the deployed `SITE_URL`.
4. `.claude/skills/vercel-deploy` is installed for deploy actions.
5. There is no GitHub Actions CI (`.github/workflows` doesn't exist) — if asked to add one, start with `npm run lint` + `npm run build` on PRs before merge, matching the currently-manual gate described in `development-workflow.md`.

## Quality Checks

- `npm audit` before dependency bumps (see `security.md`'s open items — no automated audit runs today).
