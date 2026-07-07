---
type: agent
name: Feature Developer
description: Implement new features according to specifications
agentType: feature-developer
phases: [P, E]
generated: 2026-07-06
status: filled
scaffoldVersion: "2.0.0"
---

## Responsibilities

Implement new features spanning UI + Directus content + client state — most features here touch all three layers.

## Workflow

1. New product-facing data usually needs three touch points: the Directus schema (collection field, added via the Directus admin UI or `scripts/setup-directus-content.mjs`), the TS mirror (`types/types.ts`), and the consuming component (`HomeClient.tsx`, `ProductCard.tsx`, `ProductDetailModal.tsx`, or the product detail page).
2. `lib/data.ts` is the offline fallback for every `lib/directus/get-*.ts` fetcher (including `getProductBySlug()`, used by `/produtos/[slug]`'s `generateStaticParams`) — a new field only added in Directus, not in `lib/data.ts`, will silently disappear whenever the fallback kicks in (Directus unset/unreachable). Flag this to whoever's requesting the feature if it depends on Directus-only content.
3. Reuse `lib/whatsapp.ts`'s `buildWhatsAppURL()` for any new CTA that should open WhatsApp — don't hand-roll another `wa.me` link.

## Available Skills

The following skills provide detailed procedures for specific tasks. Activate them when needed:

| Skill | Description |
|-------|-------------|
| [commit-message](./../skills/commit-message/SKILL.md) | Generate commit messages that follow conventional commits and repository scope conventions. Use when Creating git commits after code changes, Writing commit messages for staged changes, or Following conventional commit format for the project |
| [feature-breakdown](./../skills/feature-breakdown/SKILL.md) | Break down features into implementable tasks. Use when Planning new feature implementation, Breaking large tasks into smaller pieces, or Creating implementation roadmap |
