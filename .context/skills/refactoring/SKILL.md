---
type: skill
name: Refactoring
description: Refactor code safely with a step-by-step approach. Use when Improving code structure without changing behavior, Reducing code duplication, or Simplifying complex logic
skillSlug: refactoring
phases: [E]
generated: 2026-07-06
status: filled
scaffoldVersion: "2.0.0"
---
## Important Adaptation For This Repo

The generic rule "never refactor without tests" **cannot be followed literally here** — this repo has 0% automated test coverage (see `testing-strategy.md`) and no test framework installed. Don't block all refactoring on that; instead, substitute a manual verification pass (walk the real user flow before and after) as the safety net until tests exist.

## Workflow

1. Note whether test coverage exists for the area you're touching (currently: none, anywhere)
2. Identify the specific improvement to make
3. Make one type of change at a time
4. **Manually verify** after each change: filter/search → open product (modal + detail page) → add to cart → send via WhatsApp
5. Commit frequently with clear messages (see `commit-message` skill for this repo's actual Portuguese style)
6. Verify no behavior changes occurred

## Examples

**Validating `category` against the Directus `categories` collection (a real, flagged drift):**
```typescript
// Before: types/types.ts's Product.category is a bare `string`, with nothing
// tying it to what actually exists in the Directus `categories` collection —
// a typo in either place silently creates an orphan filter tab or product.

// After: derive the allowed set from getCategories() at the call site instead
// of trusting an unvalidated string, e.g. when rendering filter tabs or
// validating a product form against the current category list.
```

## Quality Bar

- Small steps, frequent commits
- One refactoring type per commit
- If the manually-verified flow breaks, you changed behavior
- Keep the change focused and reviewable — don't mix a refactor with a new feature, given there's no test suite to isolate a regression to one or the other

## Resource Strategy

- Add `scripts/` only when the task is fragile, repetitive, or benefits from deterministic execution.
- Add `references/` only when details are too large or too variant-specific to keep in `SKILL.md`.
- Add `assets/` only for files that will be consumed in the final output.
- Keep extra docs out of the skill folder; prefer `SKILL.md` plus only the resources that materially help.
