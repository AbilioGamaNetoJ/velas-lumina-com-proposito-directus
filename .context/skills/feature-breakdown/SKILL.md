---
type: skill
name: Feature Breakdown
description: Break down features into implementable tasks. Use when Planning new feature implementation, Breaking large tasks into smaller pieces, or Creating implementation roadmap
skillSlug: feature-breakdown
phases: [P]
generated: 2026-07-06
status: filled
scaffoldVersion: "2.0.0"
---
## Workflow

1. Understand the full feature requirements
2. Identify the main components needed
3. Break into independent, testable tasks
4. Identify dependencies between tasks
5. Order tasks by dependency and priority
6. Add acceptance criteria to each task
7. Flag any unknowns or risks

## Examples

**Feature breakdown example, using this repo's real layers:**
```
## Feature: Product reviews (star rating + comment)

### Task 1: Directus schema
- Add a `reviews` collection (rating, comment, product relation, approved bool)
  via the Directus admin UI or scripts/setup-directus-content.mjs
- Acceptance: collection visible and creatable in the Directus admin panel

### Task 2: Data layer
- Add lib/directus/get-reviews.ts (getReviews(productSlug)) following the
  same fetch-with-fallback shape as the other lib/directus/get-*.ts modules
- Decide: does lib/data.ts (fallback) also need mock reviews, or is this
  Directus-only? (affects whether it works before Directus is configured)
- Acceptance: getReviews(productId) returns an array, empty when none exist

### Task 3: UI
- Render average rating + review list on app/produtos/[slug]/page.tsx
- Acceptance: matches DESIGN.md tokens, responsive mobile/desktop

### Dependencies:
Task 2 requires Task 1. Task 3 requires Task 2.

### Risk flagged:
No test suite exists (testing-strategy.md) — plan manual verification
steps per task instead of assuming automated coverage.
```

## Quality Bar

- Each task should be independently testable (manually, given no test suite — see `testing-strategy.md`)
- Tasks should be small enough to complete in a day
- Clearly state acceptance criteria
- Identify and document dependencies
- Flag technical risks or unknowns early — especially whether a new field needs to exist in the Directus schema, `types/types.ts`, and `lib/data.ts` simultaneously (see `architecture.md`)
- Consider parallel work opportunities

## Resource Strategy

- Add `scripts/` only when the task is fragile, repetitive, or benefits from deterministic execution.
- Add `references/` only when details are too large or too variant-specific to keep in `SKILL.md`.
- Add `assets/` only for files that will be consumed in the final output.
- Keep extra docs out of the skill folder; prefer `SKILL.md` plus only the resources that materially help.
