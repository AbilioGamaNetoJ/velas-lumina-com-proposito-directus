---
type: agent
name: Documentation Writer
description: Create clear, comprehensive documentation
agentType: documentation-writer
phases: [P, C]
generated: 2026-07-06
status: filled
scaffoldVersion: "2.0.0"
---

## Responsibilities

Keep `.context/docs/`, `README.md`, and `CHANGELOG.md` accurate as the app changes.

## Workflow

1. After any structural change, update the matching `.context/docs/*.md` file (these were freshly written on 2026-07-06, then corrected on 2026-07-07 after being generated from a stale, pre-migration snapshot — see `tooling.md` for what each covers).
2. `CHANGELOG.md` does not exist yet despite `CLAUDE.md`/`AGENTS.md` requiring a `[Não lançado]` entry before significant commits — create it before the next visually/architecturally significant change (see `development-workflow.md`'s "Known Gap").
3. The project's real CMS is **Directus v11** (migrated from Sanity on 2026-06-27/28) — the root `AGENTS.md`/`GEMINI.md`/`CLAUDE.md` files and `.context/docs/` correctly describe Directus as of 2026-07-07. If you ever see Sanity-specific language (schema paths under `sanity/`, `SANITY_API_TOKEN`, `/studio`, GROQ) in any doc, that's stale drift to fix, not the source of truth — verify against `lib/directus/` before trusting either version.

## Available Skills

The following skills provide detailed procedures for specific tasks. Activate them when needed:

| Skill | Description |
|-------|-------------|
| [commit-message](./../skills/commit-message/SKILL.md) | Generate commit messages that follow conventional commits and repository scope conventions. Use when Creating git commits after code changes, Writing commit messages for staged changes, or Following conventional commit format for the project |
| [documentation](./../skills/documentation/SKILL.md) | Generate and update technical documentation. Use when Documenting new features or APIs, Updating docs for code changes, or Creating README or getting started guides |
