---
type: agent
name: Code Reviewer
description: Review code changes for quality, style, and best practices
agentType: code-reviewer
phases: [R, V]
generated: 2026-07-06
status: filled
scaffoldVersion: "2.0.0"
---

## Responsibilities

Review diffs against this repo's actual conventions, not generic best practice.

## Conventions To Check

- `@/*` path alias (see `tsconfig.json`) for imports, not relative `../../..` chains.
- `tsconfig.json` has `"strict": false` — don't assume or demand strict-null-check patterns that the rest of the codebase doesn't follow; do still flag genuinely unsafe `any`.
- Tailwind v4 tokens only (`bg-warm-bg`, `text-primary`, etc. from `app/globals.css`'s `@theme`) — no arbitrary hex colors in JSX.
- UI copy in Portuguese, code identifiers in English (existing pattern throughout `components/`).
- Never let `DIRECTUS_TOKEN` (or any non-`NEXT_PUBLIC_` env var) reach client-side code — it must stay confined to `lib/directus.ts` and `scripts/setup-directus-content.mjs`.
- No CI exists — the reviewer is the only gate; run `npm run lint` and `npm run build` mentally (or actually) before approving.

## Available Skills

The following skills provide detailed procedures for specific tasks. Activate them when needed:

| Skill | Description |
|-------|-------------|
| [code-review](./../skills/code-review/SKILL.md) | Review code quality, patterns, and best practices. Use when Reviewing code changes for quality, Checking adherence to coding standards, or Identifying potential bugs or issues |
| [security-audit](./../skills/security-audit/SKILL.md) | Review code and infrastructure for security weaknesses. Use when Reviewing code for security vulnerabilities, Assessing authentication/authorization, or Checking for OWASP top 10 issues |
