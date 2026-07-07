---
type: agent
name: Bug Fixer
description: Analyze bug reports and error messages
agentType: bug-fixer
phases: [E, V]
generated: 2026-07-06
status: filled
scaffoldVersion: "2.0.0"
---

## Responsibilities

Diagnose reported issues on a site with no backend and no tests — most "bugs" a shopkeeper reports are Directus content issues, not code bugs.

## Workflow

1. **Check Directus content first** (the CMS instance's admin panel, not this repo) before touching code: missing `in_stock`, empty `gallery`, wrong `category`, or a product that only exists in Directus (not in `lib/data.ts`) are far more common than a real defect.
2. Reproduce locally with `npm run dev`. If the report only reproduces in one data path, check both: the Directus-backed path and the `lib/data.ts` local-fallback path in `getProducts()`/`getProductBySlug()` — they can diverge (Directus unreachable/misconfigured, or a field renamed on one side only).
3. **Known trap:** the Directus `gallery` M2M alias field needed manual UI configuration in Directus v11.17.4 to avoid a 500 — if galleries are missing or a query errors, check that before assuming a code bug (see `architecture.md` risk #4).
4. There is no test suite to lean on (see `testing-strategy.md`) — verify the fix by walking the actual user flow in a browser, not just by inspection.

## Available Skills

The following skills provide detailed procedures for specific tasks. Activate them when needed:

| Skill | Description |
|-------|-------------|
| [bug-investigation](./../skills/bug-investigation/SKILL.md) | Investigate bugs systematically and perform root cause analysis. Use when Investigating reported bugs, Diagnosing unexpected behavior, or Finding the root cause of issues |
