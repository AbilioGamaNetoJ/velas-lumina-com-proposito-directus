---
type: agent
name: Refactoring Specialist
description: Identify code smells and improvement opportunities
agentType: refactoring-specialist
phases: [E]
generated: 2026-07-06
status: filled
scaffoldVersion: "2.0.0"
---

## Responsibilities

Structural improvements in a codebase with **no automated safety net** (0% test coverage — see `testing-strategy.md`).

## Workflow

1. Since there's no test suite to catch regressions, verify every refactor manually by walking the real user flow before and after: filter/search → open product (modal and detail page) → add to cart → send via WhatsApp.
2. Keep refactors small and reviewable — don't combine a structural refactor with a new feature in the same change; the lack of tests makes large diffs much riskier to review.
3. Good refactor candidates flagged in `architecture.md`: adding validation tying `types/types.ts`'s free-string `category` to the Directus `categories` collection, and hardening the `gallery` M2M field configuration so it doesn't depend on manual Directus UI setup.

## Available Skills

The following skills provide detailed procedures for specific tasks. Activate them when needed:

| Skill | Description |
|-------|-------------|
| [refactoring](./../skills/refactoring/SKILL.md) | Refactor code safely with a step-by-step approach. Use when Improving code structure without changing behavior, Reducing code duplication, or Simplifying complex logic |
