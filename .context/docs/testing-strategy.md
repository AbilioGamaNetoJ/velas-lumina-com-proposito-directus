---
type: doc
name: testing-strategy
description: Test frameworks, patterns, coverage requirements, and quality gates
category: testing
generated: 2026-07-06
updated: 2026-07-07
status: filled
scaffoldVersion: "2.0.0"
---

# Testing Strategy

## Current State

**0% automated coverage.** No test framework is installed (`package.json` has no `vitest`/`jest`/`playwright` dependency; `.context/config/sensors.json` reports `testFrameworks: []`). Quality control today is `npm run lint` + `npm run build` + manual click-through.

## Planned Setup (not yet implemented)

- **Vitest** for unit tests — pure logic first: `lib/whatsapp.ts` (`buildWhatsAppURL`), each `lib/directus/get-*.ts` fetcher (Directus → fallback branching), the cart reducers inside `HomeClient` (add/update-quantity/remove, including the "existing item increments quantity" merge logic).
- **Playwright** (`.claude/skills/playwright-skill/` is already installed) for the one critical end-to-end path: Home → filter/search → open product → add to cart → open cart drawer → click "Enviar Pedido via WhatsApp" → assert the `wa.me` URL and message content are correct. This flow *is* the business — it's the highest-priority test to write first, ahead of any unit test.

## Priority Order

1. E2E: catalog → cart → WhatsApp checkout (the entire revenue path).
2. Unit: `buildWhatsAppURL()` message formatting (with/without price, custom multi-item message, with/without Directus `site_settings` overrides).
3. Unit: `getProducts()`/`getProductBySlug()` fallback behavior (no `NEXT_PUBLIC_DIRECTUS_URL` → static data; Directus throws → static data; Directus returns `[]`/`null` → static data).
4. Unit/component: cart quantity math in `HomeClient` (merge on duplicate add, floor at quantity 1, subtotal calculation in `CartDrawer`).
5. Regression test for the `category`-as-free-string drift noted in `architecture.md` (risk #2) once it's addressed.

## Known Flaky/Fragile Areas

None yet observed (no tests exist to be flaky). The most fragile *code* path, if tests are added, will be the Directus `readItems`/`readSingleton` calls across `lib/directus/get-*.ts` — there is no schema validation on the response, so a Directus field rename silently falls through to the static fallback (or produces `undefined` fields) rather than failing loudly.
