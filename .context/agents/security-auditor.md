---
type: agent
name: Security Auditor
description: Identify security vulnerabilities
agentType: security-auditor
phases: [R, V]
generated: 2026-07-06
status: filled
scaffoldVersion: "2.0.0"
---

## Responsibilities

Secret scoping and trusted-HTML rendering review — see `.context/docs/security.md` for the full model (no auth, no payments, by design).

## Focus Areas

- **Secret scoping**: confirm `DIRECTUS_TOKEN` never leaves `.env.local`/`lib/directus.ts`/`scripts/setup-directus-content.mjs` and is never renamed with a `NEXT_PUBLIC_` prefix or imported into `app/`/`components/`. Also check MCP config files (`.agents/mcp_config.json`) for committed tokens — one leaked there in commit `e5aeb54`; see `security.md`.
- **`dangerouslySetInnerHTML` usage**: `app/produtos/[slug]/page.tsx` injects JSON-LD (`__html: JSON.stringify(jsonLd)`) — currently safe because the payload is fully server-constructed from typed product data, not user input. `app/privacidade/page.tsx` also renders the Directus `privacy_policy.body` HTML via `dangerouslySetInnerHTML` — that content comes from whoever has Directus write access, not end users, but treat any expansion of who can edit it as a risk to re-flag.
- **CMS admin exposure**: no CMS admin route is mounted inside this Next.js app — the Directus admin panel lives on the Directus instance itself, outside this app's deploy/auth surface (see `security.md`).

## Available Skills

The following skills provide detailed procedures for specific tasks. Activate them when needed:

| Skill | Description |
|-------|-------------|
| [security-audit](./../skills/security-audit/SKILL.md) | Review code and infrastructure for security weaknesses. Use when Reviewing code for security vulnerabilities, Assessing authentication/authorization, or Checking for OWASP top 10 issues |
