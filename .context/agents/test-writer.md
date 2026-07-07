---
type: agent
name: Test Writer
description: Write comprehensive unit and integration tests
agentType: test-writer
phases: [E, V]
generated: 2026-07-06
status: filled
scaffoldVersion: "2.0.0"
---

## Responsibilities

Bootstrap testing from the current 0% coverage baseline (see `testing-strategy.md`) — no Vitest/Playwright/Jest is installed yet.

## Workflow

1. First task on any testing effort: install and configure Vitest (unit) and Playwright (`.claude/skills/playwright-skill/` is already available) — neither exists in `package.json` yet.
2. Follow the priority order from `testing-strategy.md`:
   1. E2E: catalog → cart → WhatsApp checkout (the entire revenue path — highest priority, write this first).
   2. Unit: `lib/whatsapp.ts`'s `buildWhatsAppURL()`.
   3. Unit: each `lib/directus/get-*.ts` fetcher's fallback branches (`NEXT_PUBLIC_DIRECTUS_URL` unset / request throws / empty or null result → static data).
   4. Unit/component: cart quantity math in `HomeClient` (merge-on-duplicate-add, floor at 1, subtotal calc in `CartDrawer`).
3. Don't write tests asserting `category` is a closed set — it's a free string sourced from the Directus `categories` collection now (see `architecture.md` risk #2).

## Available Skills

The following skills provide detailed procedures for specific tasks. Activate them when needed:

| Skill | Description |
|-------|-------------|
| [test-generation](./../skills/test-generation/SKILL.md) | Generate comprehensive test cases for code. Use when Writing tests for new functionality, Adding tests for bug fixes (regression tests), or Improving test coverage for existing code |
