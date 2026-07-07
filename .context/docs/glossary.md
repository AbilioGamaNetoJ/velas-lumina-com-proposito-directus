---
type: doc
name: glossary
description: Project terminology, type definitions, domain entities, and business rules
category: glossary
generated: 2026-07-06
updated: 2026-07-07
status: filled
scaffoldVersion: "2.0.0"
---

# Glossary

> Correction (2026-07-07): an earlier version of this file claimed the opposite of the truth — that this project's CMS was Sanity and the Directus references elsewhere were noise from another template. That was backwards. The project migrated from Sanity to **Directus v11** on 2026-06-27/28 (see `architecture.md` and `AGENTS.md`); the glossary below reflects the current, real stack.

## Domain Types

- **`Product`** (`types/types.ts`) — `id`, `name`, `subtitle`, `description`, `scents: string[]`, `price`, `image`, `gallery?: string[]`, `category: string`, `details?`, `featured?`. Sourced from the Directus `products` collection (see `architecture.md`), which additionally has `in_stock`.
- **`Category`** (`types/types.ts`) — `id`, `name`, `slug`, `sort`. Sourced from the Directus `categories` collection; drives the home page's dynamic filter tabs.
- **`SiteSettings`** (`types/types.ts`) — `brand_name`, `tagline`, `whatsapp_number`, `whatsapp_default_message`, `instagram_url`, `contact_email`, `seo_title`, `seo_description`, `og_image`, `footer_note`. Sourced from the Directus `site_settings` singleton, consumed app-wide via `SiteSettingsContext`/`useSiteSettings()`.
- **`Faq`** (`types/types.ts`) — `id`, `question`, `answer`, `sort`. Sourced from the Directus `faqs` collection (limited to 4 on the home page).
- **`PrivacyPolicy`** (`types/types.ts`) — `title`, `last_updated`, `body` (HTML). Sourced from the Directus `privacy_policy` singleton, rendered at `/privacidade` via `dangerouslySetInnerHTML`.
- **`CartItem`** (`types/types.ts`) — `id` (synthetic, `standard-{productId}-{timestamp}`), `product`, `quantity`, `priceAtAddition` (price snapshot at add-time, so later price edits in Directus don't retroactively change an open cart).
- **`category`** — dynamic set seeded as `velas` (candles), `arranjos` (gift baskets/arrangements), `kits` (multi-item sets), but no longer a closed TS union — it's whatever exists in the Directus `categories` collection. Drives both the home page filter tabs and each product's `category` field.
- **`scents`** (aromas/essências) — free-text array shown as pills on the product detail page and searchable in the catalog search box.
- **`essenceStrength`** — `Suave` (mild) | `Média` (medium) | `Intensa` (intense) fragrance strength, shown in the product details grid.
- **`featured`** — boolean flag that puts a product into the home page's `FeaturedSection` carousel.
- **`in_stock`** — Directus-only field; unchecking it excludes the product from `getProducts()`'s query filter (`filter: { in_stock: { _eq: true } }`). Not modeled in `types/types.ts` or `lib/data.ts`, so static-fallback products are always implicitly in stock.

## Business Concepts

- **"Laboratório Bespoke" / Customizer** (`components/Customizer.tsx`) — lets a visitor assemble a custom candle from a container (`CUSTOMIZER_CONTAINERS`), a scent (`CUSTOMIZER_SCENTS`), and a decoration (`CUSTOMIZER_FLOWERS`), all defined in `lib/data.ts`. Not imported by any page as of 2026-07-06 — verify it's wired up before assuming it's a live feature.
- **Cart / "Minha Cesta"** — client-only, `localStorage`-persisted (`lumina-velas-cart`), never sent to any server; it exists purely to build the WhatsApp order message.
- **Checkout** — clicking "Enviar Pedido via WhatsApp" in `CartDrawer` opens a pre-filled `wa.me` chat with an itemized list and `*Valor Total Estimado*`; there is no payment step and no order record — the "order" is whatever the shopkeeper receives in WhatsApp.
- **"Coleção Florescer"** — the marketing name for the main product catalog/carousel section on the home page.

## Technical Vocabulary

- **ISR** — Incremental Static Regeneration; `app/page.tsx` sets `revalidate = 3600`, so the home page's Directus-sourced data refreshes at most hourly.
- **Directus SDK** — `@directus/sdk`'s `readItems`/`readSingleton` + `rest()`/`staticToken()` composables, used across every `lib/directus/get-*.ts` module.
- **Fallback data** — the hardcoded `PRODUCTS` array (and sibling constants) in `lib/data.ts`, used by every `lib/directus/get-*.ts` fetcher whenever Directus is unconfigured, errors, or returns zero/null results.
