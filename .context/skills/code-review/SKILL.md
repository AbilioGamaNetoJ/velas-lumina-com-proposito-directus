---
type: skill
name: Code Review
description: Review code quality, patterns, and best practices. Use when Reviewing code changes for quality, Checking adherence to coding standards, or Identifying potential bugs or issues
skillSlug: code-review
phases: [R, V]
generated: 2026-07-06
status: filled
scaffoldVersion: "2.0.0"
---
## Workflow

1. Understand the context and purpose of the code
2. Check for correctness and logic errors
3. Evaluate code structure and organization
4. Look for potential performance issues
5. Check for security vulnerabilities
6. Verify error handling is appropriate
7. Assess readability and maintainability

## Project-Specific Conventions To Enforce

- `@/*` import alias (`tsconfig.json`), not relative `../../..` chains.
- Tailwind v4 tokens from `app/globals.css`'s `@theme` (`bg-warm-bg`, `text-primary`, `shadow-ambient`, etc.) — no arbitrary hex colors in JSX.
- `tsconfig.json` has `"strict": false` — don't demand strict-null patterns the rest of the codebase doesn't use, but do flag genuinely unsafe `any`.
- Any new env var: confirm it's prefixed `NEXT_PUBLIC_` only if it's meant to reach the client; `DIRECTUS_TOKEN`-style secrets must stay server-only (`lib/directus.ts`, `scripts/setup-directus-content.mjs` are the current consumers).
- No CI exists — this review is the only gate; mentally run `npm run lint` / `npm run build`.

## Examples

**Data-fetch fallback feedback (real pattern in every `lib/directus/get-*.ts`):**
```typescript
// Existing pattern — intentional resilience, not an anti-pattern:
try {
  if (!process.env.NEXT_PUBLIC_DIRECTUS_URL) return localProducts;
  const items = await directus.request(readItems('products', { ... }));
  return items.length > 0 ? items.map(mapItem) : localProducts;
} catch (error) {
  console.warn('Falha ao buscar do Directus, usando fallback local:', error);
  return localProducts;
}
```
Flag it if a PR *removes* this fallback without discussion — it's how the site stays demoable without Directus configured.

**Unvalidated-category feedback (real drift, see `architecture.md` risk #2):**
```typescript
// types/types.ts
category: string; // no longer a closed union — sourced from Directus `categories`
```
If a PR adds a hardcoded category union back, or filters/renders `category` without going through `getCategories()`, flag the inconsistency.

## Quality Bar

- Focus on the most impactful issues first
- Explain why something is a problem
- Provide concrete suggestions for improvement
- Consider the developer's experience level
- Balance thoroughness with pragmatism
- Praise good patterns when you see them

## Resource Strategy

- Add `scripts/` only when the task is fragile, repetitive, or benefits from deterministic execution.
- Add `references/` only when details are too large or too variant-specific to keep in `SKILL.md`.
- Add `assets/` only for files that will be consumed in the final output.
- Keep extra docs out of the skill folder; prefer `SKILL.md` plus only the resources that materially help.
