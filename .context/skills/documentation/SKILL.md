---
type: skill
name: Documentation
description: Generate and update technical documentation. Use when Documenting new features or APIs, Updating docs for code changes, or Creating README or getting started guides
skillSlug: documentation
phases: [P, C]
generated: 2026-07-06
status: filled
scaffoldVersion: "2.0.0"
---
## Workflow

1. Identify the target audience
2. Determine what needs to be documented
3. Write clear, concise explanations
4. Include working code examples
5. Add any necessary diagrams or visuals
6. Review for clarity and completeness
7. Verify examples work with current code

## Where Things Live In This Repo

- Human-facing docs: root `README.md` (in Portuguese).
- AI-facing canonical docs: `.context/docs/*.md` (in English) — update the matching file after any structural change (see `.context/docs/tooling.md` for the full index).
- `CHANGELOG.md` doesn't exist yet despite `CLAUDE.md`/`AGENTS.md` requiring a `[Não lançado]` entry before significant commits — create it before the next significant change.

## Examples

**Function documentation, using a real function in this repo:**
```typescript
/**
 * Builds a wa.me deep link for the store's WhatsApp number.
 * Falls back to a generic greeting if no product or custom message is given.
 *
 * @example
 * buildWhatsAppURL({ productName: 'Vela Margarida Amarela', price: 38 })
 * // => "https://wa.me/5548988418141?text=Ol%C3%A1%21%20Tenho..."
 */
export function buildWhatsAppURL(params?: WhatsAppMessageParams): string
```

## Quality Bar

- Write for your audience's knowledge level
- Lead with the most important information
- Include working, copy-pasteable examples
- Keep documentation close to the code
- Update `.context/docs/` in the same change as the code it describes
- Use consistent formatting and terminology (English for `.context/docs/`, Portuguese for `README.md` and UI copy)

## Resource Strategy

- Add `scripts/` only when the task is fragile, repetitive, or benefits from deterministic execution.
- Add `references/` only when details are too large or too variant-specific to keep in `SKILL.md`.
- Add `assets/` only for files that will be consumed in the final output.
- Keep extra docs out of the skill folder; prefer `SKILL.md` plus only the resources that materially help.
