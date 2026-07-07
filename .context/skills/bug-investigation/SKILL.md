---
type: skill
name: Bug Investigation
description: Investigate bugs systematically and perform root cause analysis. Use when Investigating reported bugs, Diagnosing unexpected behavior, or Finding the root cause of issues
skillSlug: bug-investigation
phases: [E, V]
generated: 2026-07-06
status: filled
scaffoldVersion: "2.0.0"
---
## Workflow

1. Reproduce the bug consistently
2. Gather information (logs, stack traces, steps)
3. Identify when the bug was introduced (git bisect)
4. Form a hypothesis about the cause
5. Verify hypothesis with debugging
6. Document the root cause
7. Plan the fix approach

## Project-Specific Notes

- **Check Directus content before code.** Given there's no backend and no auth, a large share of "bugs" here are content issues in the Directus admin panel (missing `in_stock`, empty `gallery`, wrong `category`) rather than defects.
- **Two data paths can diverge.** Each `lib/directus/get-*.ts` fetcher returns Directus data or falls back to static data (`lib/data.ts` for products) — reproduce against both paths (e.g. with and without `NEXT_PUBLIC_DIRECTUS_URL` set) before concluding a fix is complete.
- No test suite exists (`testing-strategy.md`), so "verify hypothesis" means walking the real flow in the browser at http://localhost:3001, not running a regression test.

## Examples

**Bug investigation notes:**
```
## Bug: Product gallery images return 500 on the detail page

### Reproduction:
1. Open /produtos/<slug> for a product with more than one gallery image
2. Request errors with a 500 instead of rendering the gallery

### Investigation:
- lib/directus/get-products.ts queries gallery.directus_files_id via the
  `gallery` M2M alias field
- architecture.md (risk #4) already flags that this alias field needs manual
  UI configuration in Directus v11.17.4 to avoid a 500

### Root cause:
The Directus instance's `gallery` field wasn't (re)configured after being
rebuilt/reset — a known Directus-side setup gap, not a code defect.

### Fix approach:
Reconfigure the `gallery` alias field in the Directus admin UI; consider
scripting this into scripts/setup-directus-content.mjs if it's not already
covered there.
```

## Quality Bar

- Always reproduce before investigating
- Check recent changes that might relate
- Use debugger and logging strategically
- Document your findings
- Consider if bug exists elsewhere
- Since there's no test suite yet, write down the manual verification steps you used — they're the closest thing to a regression test until `testing-strategy.md`'s plan is implemented

## Resource Strategy

- Add `scripts/` only when the task is fragile, repetitive, or benefits from deterministic execution.
- Add `references/` only when details are too large or too variant-specific to keep in `SKILL.md`.
- Add `assets/` only for files that will be consumed in the final output.
- Keep extra docs out of the skill folder; prefer `SKILL.md` plus only the resources that materially help.
