---
type: doc
name: project-overview
description: High-level overview of the project, its purpose, and key components
category: overview
generated: 2026-07-06
updated: 2026-07-07
status: filled
scaffoldVersion: "2.0.0"
---

# Project Overview

## Vision

**Velas Lumina com Propósito** is a showcase (vitrine) website for a handmade, 100% vegetal candle brand. It replaces a social-media-only presence with an indexable, professional site that drives qualified organic traffic straight into a WhatsApp conversation — there is no online payment, no cart checkout, no user accounts. The "product" being sold by the software is trust and discoverability; the actual transaction always closes on WhatsApp.

## Quick Facts

| | |
|---|---|
| **Framework** | Next.js 16 (App Router), TypeScript, React 19 |
| **Styling** | Tailwind CSS v4 (CSS-first `@theme` tokens in `app/globals.css`) |
| **CMS** | Directus v11, self-hosted, headless, read via `@directus/sdk` (REST) — admin panel lives on the Directus instance itself, not inside this app |
| **Content fallback** | `lib/data.ts` — 14 hardcoded products used when `NEXT_PUBLIC_DIRECTUS_URL` isn't configured or the request fails |
| **Checkout** | WhatsApp deep link (`wa.me`) — no payment gateway, no backend order storage |
| **Hosting** | Vercel, ISR on the home page (`revalidate = 3600`) |
| **Dev port** | 3001 (`npm run dev` → http://localhost:3001) |
| **Fonts** | DM Sans (body) + Playfair Display (`.font-editorial`, headings) |

## Entry Points

- `app/page.tsx` — Server Component. Fetches products, categories, FAQs and site settings from Directus in parallel, then renders `HomeClient` wrapped in `SiteSettingsProvider`. This is the entire one-page site (Hero, Featured, Catalog, How-it-Works, FAQ, Footer).
- `components/HomeClient.tsx` — `'use client'`. Owns all interactive state: cart (persisted to `localStorage` under `lumina-velas-cart`), category filter, search query, selected product modal, cart drawer open/closed.
- `app/produtos/[slug]/page.tsx` — Statically generated product detail page (SEO, JSON-LD `Product` schema, breadcrumbs), sourced via `getProductBySlug()` from `lib/directus/get-products.ts` (falls back to `lib/data.ts` if Directus is unset or fails).
- `app/privacidade/page.tsx` — Server page rendering the `privacy_policy` singleton's HTML body from Directus.
- `lib/whatsapp.ts` — `buildWhatsAppURL()` builds the deep link; accepts an optional number/message override sourced from Directus `site_settings`, falling back to hardcoded constants.

## Getting Started Checklist

1. `npm install`
2. `cp .env.example .env.local` and fill in `NEXT_PUBLIC_DIRECTUS_URL`, `DIRECTUS_TOKEN`, `SITE_URL` (the site works with the local fallback catalog even without these — see README.md).
3. To (re)seed a Directus instance with the local catalog/content, run `node scripts/setup-directus-content.mjs` (idempotent; reads `NEXT_PUBLIC_DIRECTUS_URL`/`DIRECTUS_TOKEN` from `.env.local`/`.env`).
4. Confirm/change `WHATSAPP_NUMBER` in `lib/whatsapp.ts` for the target store number (used only when Directus `site_settings.whatsapp_number` is absent).
5. `npm run dev` → http://localhost:3001
6. `npm run lint` before committing; `npm run build` runs `next build` + `next-sitemap` via `postbuild`.

## Not In Scope

- User accounts, authentication, online payment — intentionally absent (see `security.md`).
- Automated tests — currently 0% coverage (see `testing-strategy.md`).
