---
type: skill
name: Commit Message
description: Generate commit messages that follow conventional commits and repository scope conventions. Use when Creating git commits after code changes, Writing commit messages for staged changes, or Following conventional commit format for the project
skillSlug: commit-message
phases: [E, C]
generated: 2026-07-06
status: filled
scaffoldVersion: "2.0.0"
---
## Workflow

1. Review the staged changes using `git diff --staged`
2. Identify the type of change (feat, fix, docs, style, refactor, test, chore)
3. Determine the scope (component, module, or area affected)
4. Write a concise subject line in **Brazilian Portuguese**, imperative/gerund mood matching this repo's history
5. Add body if needed to explain "why" not "what"
6. Reference issue numbers if applicable (not used so far in this repo's history)

## Project-Specific Convention

This repo's actual `git log` does **not** use the `type(scope): subject` format with English bodies — it uses a simpler `tipo: descrição em português` style, sometimes without a `tipo:` prefix at all:

```
feat: modificando a navbar na versão mobile
adicionando o icon da lumina
trocando a foto do opengraph
chore: adiciona google site verification
feat: adicionando og image e melhorando o seo
fix: resolvendo bugs na animação de entrada
```

Match this style — short, Portuguese, present continuous or infinitive, `tipo:` prefix when the change is clearly a `feat`/`fix`/`chore`. Don't introduce English or `(scope)` parentheses; it would be inconsistent with every prior commit in this repo.

## Examples

**Feature commit (matching this repo's style):**
```
feat: adiciona filtro por aroma no catálogo de produtos
```

**Bug fix commit:**
```
fix: corrige 500 na galeria de imagens do Directus
```

## Quality Bar

- Match the repo's existing Portuguese, prefix-optional style — don't impose a stricter Conventional Commits format than what's already there
- Keep the subject line short and specific about what changed
- One logical change per commit
- Don't end the subject line with a period
- Before committing any visually/architecturally significant change, check whether `CHANGELOG.md` needs a `[Não lançado]` entry (see `.context/docs/development-workflow.md` — note the file doesn't exist yet)

## Resource Strategy

- Add `scripts/` only when the task is fragile, repetitive, or benefits from deterministic execution.
- Add `references/` only when details are too large or too variant-specific to keep in `SKILL.md`.
- Add `assets/` only for files that will be consumed in the final output.
- Keep extra docs out of the skill folder; prefer `SKILL.md` plus only the resources that materially help.
