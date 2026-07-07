# Skills

On-demand expertise for AI agents. Skills are task-specific procedures that get activated when relevant.

> Project: velas-lumina-com-proposito

## How Skills Work

1. **Discovery**: AI agents discover available skills
2. **Matching**: When a task matches a skill's description, it's activated
3. **Execution**: The skill's instructions guide the AI's behavior

## Available Skills

### Built-in Skills

| Skill | Description | Phases |
|-------|-------------|--------|
| [Commit Message](./commit-message/SKILL.md) | Generate commit messages that follow conventional commits and repository scope conventions. Use when Creating git commits after code changes, Writing commit messages for staged changes, or Following conventional commit format for the project | E, C |
| [Pr Review](./pr-review/SKILL.md) | Review pull requests against team standards and best practices. Use when Reviewing a pull request before merge, Providing feedback on proposed changes, or Validating PR meets project standards | R, V |
| [Code Review](./code-review/SKILL.md) | Review code quality, patterns, and best practices. Use when Reviewing code changes for quality, Checking adherence to coding standards, or Identifying potential bugs or issues | R, V |
| [Test Generation](./test-generation/SKILL.md) | Generate comprehensive test cases for code. Use when Writing tests for new functionality, Adding tests for bug fixes (regression tests), or Improving test coverage for existing code | E, V |
| [Documentation](./documentation/SKILL.md) | Generate and update technical documentation. Use when Documenting new features or APIs, Updating docs for code changes, or Creating README or getting started guides | P, C |
| [Refactoring](./refactoring/SKILL.md) | Refactor code safely with a step-by-step approach. Use when Improving code structure without changing behavior, Reducing code duplication, or Simplifying complex logic | E |
| [Bug Investigation](./bug-investigation/SKILL.md) | Investigate bugs systematically and perform root cause analysis. Use when Investigating reported bugs, Diagnosing unexpected behavior, or Finding the root cause of issues | E, V |
| [Feature Breakdown](./feature-breakdown/SKILL.md) | Break down features into implementable tasks. Use when Planning new feature implementation, Breaking large tasks into smaller pieces, or Creating implementation roadmap | P |
| [api-design](./api-design/SKILL.md) | Design RESTful APIs following best practices. Use when Designing new API endpoints, Restructuring existing APIs, or Planning API versioning strategy | P, R |
| [Security Audit](./security-audit/SKILL.md) | Review code and infrastructure for security weaknesses. Use when Reviewing code for security vulnerabilities, Assessing authentication/authorization, or Checking for OWASP top 10 issues | R, V |
| [dotcontext-workflow](./dotcontext-workflow/SKILL.md) | Operate PREVC workflow through any adapter (MCP, CLI, hooks, Pi) | P, R, E, V, C |
| [dotcontext-tooling](./dotcontext-tooling/SKILL.md) | When to use harness actions (init, guide, advance, manage, sensors) across any adapter | P, R, E, V, C |
| [dotcontext-workflow-p](./dotcontext-workflow-p/SKILL.md) | PREVC phase P (Planning) checklist for harness-backed work | P |
| [dotcontext-workflow-r](./dotcontext-workflow-r/SKILL.md) | PREVC phase R (Review) checklist for harness-backed work | R |
| [dotcontext-workflow-e](./dotcontext-workflow-e/SKILL.md) | PREVC phase E (Execution) checklist for harness-backed work | E |
| [dotcontext-workflow-v](./dotcontext-workflow-v/SKILL.md) | PREVC phase V (Validation) checklist for harness-backed work | V |
| [dotcontext-workflow-c](./dotcontext-workflow-c/SKILL.md) | PREVC phase C (Confirmation) checklist for harness-backed work | C |

### Custom Skills

| Skill | Description | Phases |
|-------|-------------|--------|
| [api-patterns](./api-patterns/SKILL.md) | API design principles and decision-making. REST vs GraphQL vs tRPC selection, response formats, versioning, pagination. | - |
| [app-builder](./app-builder/SKILL.md) | Main application building orchestrator. Creates full-stack applications from natural language requests. Determines project type, selects tech stack, coordinates agents. | - |
| [architecture](./architecture/SKILL.md) | Architectural decision-making framework. Requirements analysis, trade-off evaluation, ADR documentation. Use when making architecture decisions or analyzing system design. | - |
| [bash-linux](./bash-linux/SKILL.md) | Bash/Linux terminal patterns. Critical commands, piping, error handling, scripting. Use when working on macOS or Linux systems. | - |
| [batch-operations](./batch-operations/SKILL.md) | Apply operations across multiple files simultaneously. Pattern-based bulk modifications, search-and-replace across codebases, consistent changes to many files at once. | - |
| [behavioral-modes](./behavioral-modes/SKILL.md) | AI operational modes (brainstorm, implement, debug, review, teach, ship, orchestrate). Use to adapt behavior based on task type. | - |
| [brainstorming](./brainstorming/SKILL.md) | Socratic questioning protocol + user communication. MANDATORY for complex requests, new features, or unclear requirements. Includes progress reporting and error handling. | - |
| [clean-code](./clean-code/SKILL.md) | Pragmatic coding standards - concise, direct, no over-engineering, no unnecessary comments | - |
| [code-review-checklist](./code-review-checklist/SKILL.md) | Code review guidelines covering code quality, security, and best practices. | - |
| [code-review-graph](./code-review-graph/SKILL.md) | Token-efficient code review using Tree-sitter AST graphs and MCP. Cuts AI token usage on large codebases by computing the blast radius of changes instead of reading entire codebases. Uses a SQLite graph database for structural analysis. | - |
| [context-compression](./context-compression/SKILL.md) | Manage and compress conversation context in long sessions. Detect when context is growing large, summarize completed work phases, archive old findings while preserving key decisions. Prevents context degradation. | - |
| [coordinator-mode](./coordinator-mode/SKILL.md) | Advanced multi-agent orchestration with parallel workers, synthesis protocols, and coordinator lifecycle. Use when complex tasks require multiple agents working in parallel with intelligent result synthesis. | - |
| [database-design](./database-design/SKILL.md) | Database design principles and decision-making. Schema design, indexing strategy, ORM selection, serverless databases. | - |
| [deployment-procedures](./deployment-procedures/SKILL.md) | Production deployment principles and decision-making. Safe deployment workflows, rollback strategies, and verification. Teaches thinking, not scripts. | - |
| [documentation-templates](./documentation-templates/SKILL.md) | Documentation templates and structure guidelines. README, API docs, code comments, and AI-friendly documentation. | - |
| [frontend-design](./frontend-design/SKILL.md) | Design thinking and decision-making for web UI. Use when designing components, layouts, color schemes, typography, or creating aesthetic interfaces. Teaches principles, not fixed values. | - |
| [game-development](./game-development/SKILL.md) | Game development orchestrator. Routes to platform-specific skills based on project needs. | - |
| [geo-fundamentals](./geo-fundamentals/SKILL.md) | Generative Engine Optimization for AI search engines (ChatGPT, Claude, Perplexity). | - |
| [i18n-localization](./i18n-localization/SKILL.md) | Internationalization and localization patterns. Detecting hardcoded strings, managing translations, locale files, RTL support. | - |
| [intelligent-routing](./intelligent-routing/SKILL.md) | Automatic agent selection and intelligent task routing. Analyzes user requests and automatically selects the best specialist agent(s) without requiring explicit user mentions. | - |
| [lint-and-validate](./lint-and-validate/SKILL.md) | Automatic quality control, linting, and static analysis procedures. Use after every code modification to ensure syntax correctness and project standards. Triggers onKeywords: lint, format, check, validate, types, static analysis. | - |
| [mcp-builder](./mcp-builder/SKILL.md) | MCP (Model Context Protocol) server building principles. Tool design, resource patterns, best practices. | - |
| [memory-system](./memory-system/SKILL.md) | Persistent cross-session memory management. Enables agents to remember user preferences, project conventions, and past decisions across different sessions using a structured MEMORY.md index and topic files. | - |
| [mobile-design](./mobile-design/SKILL.md) | Mobile-first design thinking and decision-making for iOS and Android apps. Touch interaction, performance patterns, platform conventions. Teaches principles, not fixed values. Use when building React Native, Flutter, or native mobile apps. | - |
| [nextjs-react-expert](./nextjs-react-expert/SKILL.md) | React and Next.js performance optimization from Vercel Engineering. Use when building React components, optimizing performance, eliminating waterfalls, reducing bundle size, reviewing code for performance issues, or implementing server/client-side optimizations. | - |
| [nodejs-best-practices](./nodejs-best-practices/SKILL.md) | Node.js development principles and decision-making. Framework selection, async patterns, security, and architecture. Teaches thinking, not copying. | - |
| [parallel-agents](./parallel-agents/SKILL.md) | Multi-agent orchestration patterns. Use when multiple independent tasks can run with different domain expertise or when comprehensive analysis requires multiple perspectives. | - |
| [performance-profiling](./performance-profiling/SKILL.md) | Performance profiling principles. Measurement, analysis, and optimization techniques. | - |
| [plan-writing](./plan-writing/SKILL.md) | Structured task planning with clear breakdowns, dependencies, and verification criteria. Use when implementing features, refactoring, or any multi-step work. | - |
| [powershell-windows](./powershell-windows/SKILL.md) | PowerShell Windows patterns. Critical pitfalls, operator syntax, error handling. | - |
| [python-patterns](./python-patterns/SKILL.md) | Python development principles and decision-making. Framework selection, async patterns, type hints, project structure. Teaches thinking, not copying. | - |
| [red-team-tactics](./red-team-tactics/SKILL.md) | Red team tactics principles based on MITRE ATT&CK. Attack phases, detection evasion, reporting. | - |
| [rust-pro](./rust-pro/SKILL.md) | Master modern Rust (2024 edition) with async patterns, advanced type system features, and production-ready systems programming. Expert in the current Rust ecosystem including Tokio, axum, and modern crates. Use PROACTIVELY for Rust development, performance optimization, or systems programming. | - |
| [seo-fundamentals](./seo-fundamentals/SKILL.md) | SEO fundamentals, E-E-A-T, Core Web Vitals, and Google algorithm principles. | - |
| [server-management](./server-management/SKILL.md) | Server management principles and decision-making. Process management, monitoring strategy, and scaling decisions. Teaches thinking, not commands. | - |
| [simplify-code](./simplify-code/SKILL.md) | Reduce complexity of over-engineered code. Identify unnecessary abstractions, remove dead code, flatten deep nesting, and simplify logic while preserving behavior. | - |
| [skillify](./skillify/SKILL.md) | Auto-create new skills from repetitive workflows. When you notice yourself doing the same multi-step process repeatedly, extract it into a reusable SKILL.md that any agent can use. | - |
| [systematic-debugging](./systematic-debugging/SKILL.md) | 4-phase systematic debugging methodology with root cause analysis and evidence-based verification. Use when debugging complex issues. | - |
| [tailwind-patterns](./tailwind-patterns/SKILL.md) | Tailwind CSS v4 principles. CSS-first configuration, container queries, modern patterns, design token architecture. | - |
| [tdd-workflow](./tdd-workflow/SKILL.md) | Test-Driven Development workflow principles. RED-GREEN-REFACTOR cycle. | - |
| [testing-patterns](./testing-patterns/SKILL.md) | Testing patterns and principles. Unit, integration, mocking strategies. | - |
| [verify-changes](./verify-changes/SKILL.md) | Prove code works by running it, not just checking it exists. Verification through execution rather than inspection. Use after writing or modifying code to ensure it actually functions correctly. | - |
| [vulnerability-scanner](./vulnerability-scanner/SKILL.md) | Advanced vulnerability analysis principles. OWASP 2025, Supply Chain Security, attack surface mapping, risk prioritization. | - |
| [web-design-guidelines](./web-design-guidelines/SKILL.md) | Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices". | - |
| [webapp-testing](./webapp-testing/SKILL.md) | Web application testing principles. E2E, Playwright, deep audit strategies. | - |

## Creating Custom Skills

Create a new skill by adding a directory with a `SKILL.md` file:

```
.context/skills/
└── my-skill/
    ├── SKILL.md          # Required: source skill definition
    ├── scripts/          # Optional: deterministic helpers
    ├── references/       # Optional: load-on-demand details
    └── assets/           # Optional: output resources
```

### Skill Anatomy

```md
The source file under `.context/skills/` keeps internal scaffold metadata so dotcontext can track fill status.
When exported to AI-tool skill directories, the portable frontmatter should keep only:

---
name: my-skill
description: Describe what the skill does and the concrete triggers for when to use it
---

## Workflow
1. Step one
2. Step two

## Examples
```
[Short example]
```

## Quality Bar
- List the checks and constraints that keep the skill reliable

## Resource Strategy
- Explain when to add `scripts/`, `references/`, or `assets/`
```

Keep activation language in the description frontmatter, keep the body concise, and avoid extra docs such as `README.md` or `CHANGELOG.md` inside the skill folder.

## PREVC Phase Mapping

| Phase | Name | Skills |
|-------|------|--------|
| P | Planning | feature-breakdown, documentation, api-design |
| R | Review | pr-review, code-review, api-design, security-audit |
| E | Execution | commit-message, test-generation, refactoring, bug-investigation |
| V | Validation | pr-review, code-review, test-generation, security-audit |
| C | Confirmation | commit-message, documentation |
