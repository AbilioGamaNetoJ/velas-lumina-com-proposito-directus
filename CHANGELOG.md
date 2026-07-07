# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).

## [Não lançado]

### Corrigido

- Documentação para IA (`.context/docs/*.md`, `.context/agents/*.md`, `.context/skills/*/SKILL.md`, `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`) atualizada para refletir a migração do CMS de Sanity para Directus v11, concluída em 2026-06-27/28 mas nunca reconciliada nesses arquivos (alguns chegavam a afirmar o oposto da realidade). Detalhes: env vars (`NEXT_PUBLIC_DIRECTUS_URL`/`DIRECTUS_TOKEN` em vez de `SANITY_*`), camada de dados (`lib/directus/get-*.ts`), schema (collections/singletons Directus em vez de `sanity/schemaTypes/`), remoção de referências à rota `/studio` (não existe mais), e correção do risco #1 do `architecture.md` (produto detail já lê do CMS via `getProductBySlug()`).
- `README.md`: framework corrigido de "Next.js 15" para "Next.js 16" (`package.json` já usava `^16.2.7`); estrutura de pastas, seção "CMS Directus" (antes só documentava `products`, agora cobre `categories`/`site_settings`/`faqs`/`privacy_policy`) e passos de setup atualizados para refletir o estado real do projeto (rota `/privacidade`, `scripts/setup-directus-content.mjs`, componentes novos como `Faq`/`SiteSettingsContext`/`PrivacyConsent`).
- `.context/docs/README.md`: "Repository Snapshot" atualizado (removidos `sanity/`/`sanity.config.ts`, inexistentes; adicionados `DESIGN.md`/`PRODUCT.md`).
- Documentação de variáveis de ambiente (`README.md`, `CLAUDE.md`, `GEMINI.md`, `.context/docs/development-workflow.md`, `security.md`, `project-overview.md`) corrigida: a afirmação de que `.env` era "commitado por design" nunca foi verdade neste repo (nunca esteve no git; `.gitignore` sempre bloqueou o nome literal `.env`). Criado `.env.example` (template versionado, sem segredos) como o artefato correto a ser commitado.

### Adicionado

- `.env.example` — template versionado das variáveis de ambiente (`NEXT_PUBLIC_DIRECTUS_URL`, `DIRECTUS_TOKEN`, `SITE_URL`), para substituir a ausência de qualquer baseline commitado.

### Segurança

- Identificado (não corrigido neste commit) vazamento de um access token do Directus MCP em texto puro no histórico do git, commit `e5aeb54` (`.agents/mcp_config.json`). Decisão: rotacionar o token no painel do Directus, sem reescrever o histórico do git (repo privado). O token vazado também está hoje em `~/.claude.json` (config local do usuário, não versionada) — atualizar lá após a rotação.
- `.gitignore` atualizado para bloquear `.mcp.json` e qualquer `**/mcp_config.json`/`**/mcp-config.json`, evitando repetição do vazamento acima. **Atenção:** `.agents/mcp_config.json` já está rastreado pelo git desde antes dessa regra — o `.gitignore` sozinho não impede que ele continue sendo versionado; para isso é preciso `git rm --cached .agents/mcp_config.json` também.
