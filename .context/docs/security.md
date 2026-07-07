---
type: doc
name: security
description: Security policies, authentication, secrets management, and compliance requirements
category: security
generated: 2026-07-06
updated: 2026-07-07
status: filled
scaffoldVersion: "2.0.0"
---

# Security

## Auth Model

**There is none, by design.** No user accounts, no login, no session, no payment gateway. The site is a public showcase; the only "transaction" is a WhatsApp deep link the visitor opens themselves.

## Secret Scoping

- `NEXT_PUBLIC_DIRECTUS_URL` — public base URL of the self-hosted Directus instance, safe in the client bundle. Only its placeholder lives in the committed `.env.example`; the real value is set in the gitignored `.env.local`.
- `DIRECTUS_TOKEN` — a static access token consumed server-side by `lib/directus.ts` (`staticToken()`) and by `scripts/setup-directus-content.mjs`. Must never be renamed with a `NEXT_PUBLIC_` prefix or imported into client code. **Do not assume it's read-only** — the same variable name is used for both the app's read token and, per project memory, an admin-scoped token during content provisioning; confirm which token is in `.env.local` before treating it as low-privilege.
- `SITE_URL` — public base URL, used for `metadataBase` and canonical/OG URLs.

## Directus Admin Exposure

There is no CMS admin route mounted inside this Next.js app (the old `/studio` route was removed with the Sanity migration). The Directus admin panel lives on the Directus instance itself (`directus.luminacomproposito.com.br`), outside this repo's deploy — its exposure and access control are the Directus instance's responsibility, not this app's.

## Known Open Items

- No security headers / CSP configured in `next.config.ts`.
- `WHATSAPP_NUMBER` (a public business phone number, low sensitivity) is still hardcoded in `lib/whatsapp.ts` as the fallback when Directus `site_settings.whatsapp_number` is absent.
- No rate limiting or bot protection — acceptable given there are no forms or mutating API routes in the app itself.
- No dependency audit is run in CI (there is no CI). Run `npm audit` manually before dependency bumps — see `devops-specialist` agent playbook.
- **Historical secret leak:** commit `e5aeb54` ("chore: save MCP directus configuration") committed a Directus MCP access token in plaintext in `.agents/mcp_config.json`. A later uncommitted edit removes it from the working tree, but the token remains in git history. Rotate that token and, if this repo has a remote, consider scrubbing history before treating it as resolved.
