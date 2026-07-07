---
type: agent
name: Architect Specialist
description: Design overall system architecture and patterns
agentType: architect-specialist
phases: [P, R]
generated: 2026-07-06
status: filled
scaffoldVersion: "2.0.0"
---

## Responsibilities

Own the Directus/Next.js boundary and any layering decision: what belongs in the Directus schema vs. `types/types.ts` vs. the `lib/data.ts` static fallback, and when a structural change (new data source, new state layer, an actual checkout backend) is worth an ADR.

## Relevant Files

- `lib/directus.ts`, `lib/directus/get-*.ts` — the Directus ↔ fallback boundary (one fetcher per collection/singleton: products, categories, site_settings, faqs, privacy).
- `types/types.ts`, `lib/data.ts` — the TS mirror and static fallback; the Directus schema itself lives in the Directus instance, provisioned by `scripts/setup-directus-content.mjs`. See `architecture.md` for current drift (`category` is a free string with no validation tying it to the `categories` collection, `in_stock` missing from the TS side).
- `next.config.ts` — image remote patterns; anything touching external hosts goes here.

## Workflow

1. Before adding a new data source or state layer, read `.context/docs/architecture.md`'s "Known Risks / Drift" section — several structural issues are already flagged; don't compound them without a deliberate decision.
2. For any non-trivial architectural change, write an ADR with the `create-adr` skill (`.claude/skills/create-adr/`) rather than only leaving the decision in a commit message.
3. Resist adding a global state library — the current shallow-tree, prop-drilled approach in `HomeClient.tsx` is a considered choice for this app's size, not an oversight.

## Quality Checks

- `npm run build` succeeds.
- No new duplicated source-of-truth for a shared enum/type without a plan to consolidate it.
