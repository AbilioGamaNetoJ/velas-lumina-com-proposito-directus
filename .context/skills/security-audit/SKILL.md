---
type: skill
name: Security Audit
description: Review code and infrastructure for security weaknesses. Use when Reviewing code for security vulnerabilities, Assessing authentication/authorization, or Checking for OWASP top 10 issues
skillSlug: security-audit
phases: [R, V]
generated: 2026-07-06
status: filled
scaffoldVersion: "2.0.0"
---
## Project-Specific Scope

This is a public, no-auth, no-payment showcase site (see `.context/docs/security.md`) — most OWASP Top 10 categories about authentication/authorization/session management **don't apply** because there's no auth surface at all. Focus the audit instead on:

1. **Secret scoping** — `DIRECTUS_TOKEN` must stay confined to `.env.local` + `lib/directus.ts` + `scripts/setup-directus-content.mjs`; never `NEXT_PUBLIC_`-prefixed, never imported into `app/`/`components/`. Also check MCP config files (`.agents/mcp_config.json`) — a Directus MCP token leaked there in commit `e5aeb54`.
2. **`dangerouslySetInnerHTML` usage** — one use in `app/produtos/[slug]/page.tsx` (server-constructed JSON-LD) and one in `app/privacidade/page.tsx` (Directus `privacy_policy.body` HTML). Any *new* use of it, especially with data that could ever include free-text user input rendered unescaped, needs scrutiny.
3. **CMS admin exposure** — no CMS admin route is mounted inside this Next.js app; the Directus admin panel lives on the Directus instance itself, so its access control is out of this repo's scope but worth confirming isn't assumed to be covered here.
4. **Dependency audit** — no CI runs `npm audit`; do it manually before dependency bumps.

## Workflow

1. Review authentication implementation — confirm none is expected; flag if one is silently added without a decision
2. Check authorization on all endpoints — there are no API routes in this app today
3. Look for injection vulnerabilities — primarily `dangerouslySetInnerHTML` and any future dynamic HTML/URL construction
4. Verify input validation and sanitization — mostly relevant to the Directus `products` collection schema and the `readItems`/`readSingleton` calls in `lib/directus/get-*.ts`
5. Check for sensitive data exposure — env var scoping (and git history for leaked tokens) is the main vector here
6. Review dependency security — `npm audit`
7. Document findings with severity

## Examples

**Security audit findings (project-realistic):**
```
## Security Audit Report

### High
1. Directus MCP access token committed in plaintext in .agents/mcp_config.json
   (commit e5aeb54) — token remains in git history even after a later
   working-tree edit removes it. Rotate the token; consider history scrub.

### Low
2. WHATSAPP_NUMBER hardcoded in lib/whatsapp.ts
   - Low sensitivity (it's a public business number), but changing it
     requires a code deploy rather than an env var update when Directus
     site_settings.whatsapp_number is also absent

### Recommendations
- Confirm DIRECTUS_TOKEN is never committed anywhere (env files, MCP
  configs, scripts) — only ever loaded from an untracked .env.local
- Run `npm audit` before the next dependency bump
```

## Quality Bar

- Don't apply generic OWASP auth/session checklist items to a site that has no auth by design — call that out explicitly rather than flagging it as a gap
- Never trust CMS/user-suppliable content that reaches `dangerouslySetInnerHTML`
- Check for sensitive data exposure in env var scoping first — it's the highest-likelihood real issue in this codebase
- Document findings with clear severity levels, calibrated to this app's actual risk profile (no PII, no payments, no auth)

## Resource Strategy

- Add `scripts/` only when the task is fragile, repetitive, or benefits from deterministic execution.
- Add `references/` only when details are too large or too variant-specific to keep in `SKILL.md`.
- Add `assets/` only for files that will be consumed in the final output.
- Keep extra docs out of the skill folder; prefer `SKILL.md` plus only the resources that materially help.
