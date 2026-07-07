---
type: skill
name: Pr Review
description: Review pull requests against team standards and best practices. Use when Reviewing a pull request before merge, Providing feedback on proposed changes, or Validating PR meets project standards
skillSlug: pr-review
phases: [R, V]
generated: 2026-07-06
status: filled
scaffoldVersion: "2.0.0"
---
## Project-Specific Note

This repo currently has **no PR-based workflow** — a single `main` branch with commits pushed directly, no `.github/workflows` CI (see `development-workflow.md`). Apply this skill if/when a PR is opened (e.g. via `gh pr create`); until then, treat "PR review" as reviewing a diff before it's committed to `main`, since there's no CI gate to fall back on.

## Workflow

1. Read the PR description (or the diff itself, if there's no PR) to understand the goal
2. Review the linked issue(s) for context, if any
3. Check that manual verification was done — there are no automated tests to check as "included and passing" (0% coverage, see `testing-strategy.md`)
4. Review code changes file by file
5. Verify `.context/docs/*.md` is updated if the change is structural, and whether `CHANGELOG.md` needs a `[Não lançado]` entry
6. Leave constructive feedback with specific suggestions
7. Approve, request changes, or comment based on findings

## Examples

**Approval comment:**
```
Confere! Fluxo de carrinho → WhatsApp testado manualmente em mobile e desktop.

Sugestão menor: extrair a lógica de mensagem em CartDrawer.handleCheckout
para lib/whatsapp.ts, já que ela duplica parte do formato usado em
buildWhatsAppURL.

Aprovado ✅
```

**Request changes:**
```
Bom progresso, mas falta:

1. O novo campo do produto foi adicionado só no Directus — sem entrada
   correspondente em lib/data.ts, o fallback local vai ficar sem esse dado
   (ver architecture.md)
2. Faltou testar o fluxo completo no mobile
3. Considerar adicionar o campo `in_stock` também no fallback local, se fizer
   sentido para esse caso
```

## Quality Bar

- Start with understanding the change's goal
- Be constructive and specific in feedback
- Distinguish between required changes and suggestions
- Test the changes locally (`npm run dev`) — there's no CI to catch regressions
- Check for security implications (env var scoping, `dangerouslySetInnerHTML` usage)
- Approve only when confident, given the lack of an automated safety net

## Resource Strategy

- Add `scripts/` only when the task is fragile, repetitive, or benefits from deterministic execution.
- Add `references/` only when details are too large or too variant-specific to keep in `SKILL.md`.
- Add `assets/` only for files that will be consumed in the final output.
- Keep extra docs out of the skill folder; prefer `SKILL.md` plus only the resources that materially help.
