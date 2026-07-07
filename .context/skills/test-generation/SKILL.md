---
type: skill
name: Test Generation
description: Generate comprehensive test cases for code. Use when Writing tests for new functionality, Adding tests for bug fixes (regression tests), or Improving test coverage for existing code
skillSlug: test-generation
phases: [E, V]
generated: 2026-07-06
status: filled
scaffoldVersion: "2.0.0"
---
## Project-Specific Note

No test framework is installed yet (`testing-strategy.md`: 0% coverage, `testFrameworks: []`). The first "test generation" task on this repo is bootstrapping Vitest (unit) and/or Playwright (`.claude/skills/playwright-skill/` already installed) — don't assume a runner exists. Follow the priority order in `testing-strategy.md`: E2E checkout flow first, then `buildWhatsAppURL`, then `getProducts()` fallback branches, then cart quantity math.

## Workflow

1. Identify the function/component to test
2. List the behaviors that need testing
3. Write tests for happy path scenarios
4. Add tests for edge cases and boundaries
5. Include error handling tests
6. Mock external dependencies appropriately (e.g. the `directus.request()` call in each `lib/directus/get-*.ts`)
7. Verify tests are deterministic and isolated

## Examples

**Unit test example, using a real function in this repo (`lib/whatsapp.ts`):**
```typescript
import { buildWhatsAppURL, WHATSAPP_NUMBER } from '@/lib/whatsapp';

describe('buildWhatsAppURL', () => {
  it('uses the default greeting with no params', () => {
    const url = buildWhatsAppURL();
    expect(url).toContain(`wa.me/${WHATSAPP_NUMBER}`);
    expect(decodeURIComponent(url)).toContain('Gostaria de mais informações');
  });

  it('builds a product-interest message when name+price are given', () => {
    const url = buildWhatsAppURL({ productName: 'Vela Margarida Amarela', price: 38 });
    expect(decodeURIComponent(url)).toContain('Vela Margarida Amarela');
    expect(decodeURIComponent(url)).toContain('R$ 38.00');
  });

  it('prefers customMessage over productName/price when both are given', () => {
    const url = buildWhatsAppURL({ customMessage: 'Pedido especial', productName: 'X', price: 1 });
    expect(decodeURIComponent(url)).toContain('Pedido especial');
  });
});
```

**Fallback-branching test, using `getProducts()`:**
```typescript
it('returns local PRODUCTS when NEXT_PUBLIC_DIRECTUS_URL is unset', async () => {
  delete process.env.NEXT_PUBLIC_DIRECTUS_URL;
  const products = await getProducts();
  expect(products).toEqual(localProducts);
});
```

## Quality Bar

- Test behavior, not implementation
- Use descriptive test names that explain what and why
- Follow Arrange-Act-Assert pattern
- Keep tests independent and isolated
- Mock the Directus client boundary, not internal logic
- Aim for fast, reliable tests — no network calls to a real Directus instance in unit tests

## Resource Strategy

- Add `scripts/` only when the task is fragile, repetitive, or benefits from deterministic execution.
- Add `references/` only when details are too large or too variant-specific to keep in `SKILL.md`.
- Add `assets/` only for files that will be consumed in the final output.
- Keep extra docs out of the skill folder; prefer `SKILL.md` plus only the resources that materially help.
