---
type: doc
name: architecture
description: System architecture, layers, patterns, and design decisions
category: architecture
generated: 2026-07-06
updated: 2026-07-07
status: filled
scaffoldVersion: "2.0.0"
---

# Architecture

## Layers

**Presentation (`app/`)** — Next.js App Router. `app/page.tsx` is a Server Component that fetches products, categories, FAQs and site settings in parallel and hands them to a single client orchestrator. `app/produtos/[slug]/page.tsx` is statically generated (`generateStaticParams`) per product for SEO. `app/privacidade/page.tsx` renders the `privacy_policy` singleton. There is no CMS admin route mounted in this app — Directus's own admin UI lives on the Directus instance.

**Client orchestration (`components/HomeClient.tsx`)** — The whole one-page experience (Hero → Featured → Catalog/Filters/Search → How it Works → FAQ → Footer) is composed here. All cart/filter/modal state lives in this one component and is threaded down as props; there is no global state library (Redux/Zustand) beyond `SiteSettingsContext` (a thin `React.Context` for CMS-driven settings) — the tree is shallow enough that prop drilling is otherwise the deliberate, simplest choice.

**Data access (`lib/directus.ts` + `lib/directus/`)** — `lib/directus.ts` creates a `@directus/sdk` client (`createDirectus(NEXT_PUBLIC_DIRECTUS_URL).with(rest())`) plus a `fileUrl()` helper for asset URLs. `staticToken(DIRECTUS_TOKEN)` is only attached when `DIRECTUS_TOKEN` is set — with it unset, requests go out with no `Authorization` header and depend on the Directus `Public` role having read permission on the queried collections (confirmed working in production: `products`, `categories`, `site_settings`, `faqs`, `privacy_policy`, `directus_files` all have Public read access, per `scripts/setup-directus-content.mjs`'s provisioning). Each `lib/directus/get-*.ts` module is a single-purpose fetcher with the same fallback shape: return static/local data immediately if `NEXT_PUBLIC_DIRECTUS_URL` is unset, otherwise call Directus and fall back to static data on empty results or thrown errors:
- `get-products.ts` — `getProducts()` / `getProductBySlug(slug)`, `products` collection, falls back to `lib/data.ts`
- `get-categories.ts` — `getCategories()`, `categories` collection, falls back to a static `velas`/`arranjos`/`kits` list
- `get-site-settings.ts` — `getSiteSettings()`, `site_settings` singleton (`readSingleton`), falls back to hardcoded brand constants
- `get-faqs.ts` — `getFaqs()`, `faqs` collection limited to 4, falls back to a static list
- `get-privacy.ts` — `getPrivacyPolicy()`, `privacy_policy` singleton, nullable (no static fallback — page renders nothing if absent)

**CMS schema (Directus instance, not code-defined in this repo)** — `products` collection: `slug`, `name`, `subtitle`, `description`, `price`, `category` (`velas`/`arranjos`/`kits`, string), `featured`, `in_stock`, `scents` (JSON array), `weight`, `burn_time`, `dimensions`, `essence_strength`, `image` (M2O → `directus_files`), `gallery` (M2M → `directus_files` via junction). Schema lives in the Directus database itself and is provisioned/idempotently re-applied by `scripts/setup-directus-content.mjs`, not by a schema file in this repo (see `README.md` for the full field table).

**WhatsApp integration (`lib/whatsapp.ts`)** — the only "backend": `buildWhatsAppURL()` builds a `wa.me` deep link with an encoded message, accepting an optional `number`/`defaultMessage` override (sourced from Directus `site_settings` via `SiteSettingsContext`) and falling back to hardcoded constants otherwise. Used by `Header`, `WhatsAppCTA`, and `CartDrawer.handleCheckout` (itemized cart → formatted message with subtotal).

**Types (`types/types.ts`)** — `Product`, `Category`, `SiteSettings`, `Faq`, `PrivacyPolicy`, `CartItem` interfaces. `Product.category` is a plain `string` (no longer a closed TS union) since categories are now dynamic, CMS-managed data.

**Static fallback + bespoke builder (`lib/data.ts`)** — 14 hardcoded products plus `CUSTOMIZER_CONTAINERS`/`CUSTOMIZER_SCENTS`/`CUSTOMIZER_FLOWERS`, consumed by `components/Customizer.tsx` ("Laboratório Bespoke") and as the fallback source for every `lib/directus/get-*.ts` module.

**Content provisioning (`scripts/setup-directus-content.mjs`)** — idempotent Node script (`node scripts/setup-directus-content.mjs`, reads `.env.local`/`.env` manually) that creates/updates the `products`, `categories`, `faqs` collections and the `site_settings`/`privacy_policy` singletons on a Directus instance via its REST API, using the admin `DIRECTUS_TOKEN`, and seeds them from `lib/data.ts` plus hardcoded copy. Server-side only, never bundled; not wired into any `npm run` script.

## ADR History

None recorded yet. Use the `create-adr` skill (`.claude/skills/create-adr/`) or `mcp__dotcontext__context` `scaffoldPlan` for future architectural decisions; there is no `.context/plans/` history to inherit from (plans are gitignored local artifacts). The Sanity → Directus migration (2026-06-27/28) predates this doc set and has no ADR recorded — worth backfilling if the rationale needs to survive.

## External Dependencies

| Dependency | Role |
|---|---|
| Directus v11 (self-hosted, `directus.luminacomproposito.com.br`) | Headless CMS, read via `@directus/sdk` with a static token; own admin UI/auth, not embedded in this app |
| Vercel | Hosting, ISR (`revalidate = 3600` on the home page) |
| WhatsApp (`wa.me`) | The entire "checkout" — no API integration, just a deep link |
| Google Fonts (`next/font/google`) | DM Sans + Playfair Display |
| `next-sitemap` | `postbuild` sitemap/robots generation |
| Embla Carousel | Product carousel (`ProductCarousel.tsx`) |
| `lucide-react` | Icon set |

## Known Risks / Drift

1. **`WHATSAPP_NUMBER` still has a hardcoded fallback** in `lib/whatsapp.ts` — Directus `site_settings.whatsapp_number` overrides it when present, but the constant must still be kept correct as the last-resort value.
2. **`category` is now a free-form string**, not a validated union — a typo in the Directus `categories` collection (or in a product's `category` field) silently creates an orphan filter tab or an uncategorized product, with no compile-time or runtime check tying the two together.
3. **`in_stock` exists only in the Directus schema**, not in `lib/data.ts` — the static fallback products are always implicitly in stock (same caveat as before the migration, just with a renamed field).
4. **The Directus `gallery` M2M alias field** needed manual UI configuration in Directus v11.17.4 to avoid a 500 on query — if a Directus instance is rebuilt from scratch via `setup-directus-content.mjs` alone, verify `gallery.directus_files_id` still resolves before assuming it works.
5. Zero automated test coverage (see `testing-strategy.md`).
