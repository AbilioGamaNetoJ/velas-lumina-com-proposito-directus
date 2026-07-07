---
name: Lumina Velas Artesanais
description: Boutique showcase for handmade vegetal candles — warm, editorial, WhatsApp-first
colors:
  terracota-queimada: "#904642"
  terracota-queimada-profundo: "#75322f"
  ivory-quente: "#fff8f5"
  tinta-marrom: "#251911"
  marrom-suave: "#544341"
  mel-dourado: "#cca72f"
  blush-suave: "#fff1ea"
  blush-alto: "#fbe4d7"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2.5rem, 6vw, 4.8rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(1.75rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.15
  title:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 700
    letterSpacing: "0.2em"
rounded:
  md: "6px"
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  3xl: "24px"
  full: "9999px"
spacing:
  gap-sm: "12px"
  gap-md: "16px"
  gap-lg: "24px"
  card-padding: "24px"
  card-padding-lg: "32px"
  section-padding: "80px"
components:
  button-primary:
    backgroundColor: "{colors.terracota-queimada}"
    textColor: "#ffffff"
    rounded: "{rounded.xl}"
    padding: "16px 24px"
  button-primary-hover:
    backgroundColor: "{colors.terracota-queimada-profundo}"
    textColor: "#ffffff"
    rounded: "{rounded.xl}"
    padding: "16px 24px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.terracota-queimada}"
    rounded: "{rounded.xl}"
    padding: "12px 16px"
  card-product:
    backgroundColor: "#ffffff"
    rounded: "{rounded.2xl}"
    padding: "{spacing.card-padding}"
  chip-category:
    backgroundColor: "{colors.blush-alto}"
    textColor: "{colors.marrom-suave}"
    rounded: "{rounded.full}"
    padding: "10px 20px"
---

# Design System: Lumina Velas Artesanais

## 1. Overview

**Creative North Star: "A Vitrine Iluminada" (The Lit Storefront)**

Lumina reads like the warm glow of a chandlery shop window at dusk — the kind that makes a passerby slow down and step inside. It's editorial rather than decorative: a confident serif carries the storytelling, a clean sans carries the practical copy, and a single terracotta accent does the work most sites spread across five colors. Nothing here is loud. The site earns its premium feel through restraint, generous whitespace, and unhurried motion, not through ornament.

This system explicitly rejects the **generic marketplace grid** (cold, dense product tiles with no narrative), **cold SaaS/tech minimalism** (sterile, no warmth, no texture), and **exaggerated luxury editorial** (so precious it alienates someone ordering a candle from their phone). Lumina sits deliberately between those poles: sophisticated enough to feel considered, warm enough to feel handmade.

**Key Characteristics:**
- One committed accent (terracota-queimada) carrying navigation, CTAs, links, and icon accents — never diluted with a second competing hue.
- Playfair Display for anything that tells the story (headlines, prices, product names); DM Sans for anything functional (body copy, labels, nav).
- Soft, blurred organic background shapes (`blur-[140px]`, `blur-[160px]`) instead of hard geometric decoration — the site's one recurring "atmosphere" device.
- Every primary CTA lifts and glows on hover (`-translate-y-0.5` to `-translate-y-1` + shadow escalation) — the site's signature tactile confirmation.

## 2. Colors

A single committed accent over a warm, quiet neutral field — Restrained-to-Committed, never Full-palette or Drenched.

### Primary
- **Terracota Queimada** (`#904642`): the one color that matters. Every button, link, active state, icon accent, and category label runs through this hue. Used deliberately, not diluted — this is what "Committed" looks like at ~15-20% surface coverage.
- **Terracota Queimada Profundo** (`#75322f`): the hover/pressed state for Terracota Queimada. Never used as a standalone role; it only exists as the "next state" of Primary.

### Neutral
- **Ivory Quente** (`#fff8f5`): the page background. A true warm off-white, not the saturated cream/sand default — it's paired with a saturated accent rather than carrying warmth on its own.
- **Blush Suave** (`#fff1ea`): soft section/card backgrounds one step warmer than the page (footer, image placeholders, drawer panels).
- **Blush Alto** (`#fbe4d7`): the border and divider color, almost always at reduced opacity (`/20`–`/40`). This is what separates sections and cards instead of hard black borders or shadows.
- **Tinta Marrom** (`#251911`): heading and primary body ink. Near-black but warm, never pure `#000`.
- **Marrom Suave** (`#544341`): secondary body text (descriptions, captions, metadata). Dark enough to clear the 4.5:1 contrast bar on Ivory Quente — do not lighten it further for "elegance."

### Accent (rare, precious)
- **Mel Dourado** (`#cca72f`): a golden-honey accent reserved for a handful of specific moments — the sparkle icon on scent tags, the linen-tag border in the Bespoke Lab preview. It is not a button color and not a background color.

### Named Rules
**The One Accent Rule.** Terracota Queimada is the only color allowed to carry interactive meaning (link, button, active state, focus). Mel Dourado is decorative only — if a new component reaches for gold to signal "clickable," that's a violation.

**The No-Pure-Black Rule.** Every "dark" value in this system (`Tinta Marrom`, `Marrom Suave`) carries the brand's own warm hue. Never introduce `#000`, `#111`, or a cool gray for text or shadows.

## 3. Typography

**Display Font:** Playfair Display (with Georgia, serif fallback)
**Body Font:** DM Sans (with system-ui, sans-serif fallback)

**Character:** A confident editorial serif paired with a clean, quiet sans — the contrast pairing itself is the store's "boutique" signal. Playfair Display never appears below ~1.1rem; DM Sans never carries a headline.

### Hierarchy
- **Display** (700, `clamp(2.5rem, 6vw, 4.8rem)`, line-height 1.05): the hero headline only. Tight tracking (`-0.02em` and tighter at the largest sizes), always in `Tinta Marrom` with the one accented word in italic `Terracota Queimada`.
- **Headline** (700, `clamp(1.75rem, 4vw, 3rem)`, line-height 1.15): section titles ("Nossas Essências Autorais", "Como realizar seu pedido", "Bespoke Lab").
- **Title** (700, `1.25rem`): product names, card titles, modal headings.
- **Body** (400, `1rem`, line-height 1.6): descriptions and paragraph copy in `Marrom Suave`. Cap prose at ~65–75ch.
- **Label** (700, `0.625rem`–`0.75rem`, letter-spacing `0.2em`, uppercase): category tags, eyebrow badges, button text. Always uppercase, always wide-tracked — this is the system's one "shouting" register, used sparingly.

### Named Rules
**The Serif-Tells-The-Story Rule.** If a piece of copy is narrative or emotional (a headline, a product name, a price), it's Playfair Display. If it's functional (a button, a form label, a nav link), it's DM Sans. Never mix the two roles.

## 4. Elevation

Mostly flat at rest, separated by warm-tinted borders rather than shadows; a soft, brand-tinted "ambient glow" shadow appears only on hover as a response to interaction, not as permanent depth.

### Shadow Vocabulary
- **Ambient** (`box-shadow: 0 10px 30px -10px rgba(144, 70, 66, 0.08)`, class `.shadow-ambient`): the system's one systematized shadow — a diffuse, terracotta-tinted glow. Used at rest on the Customizer's preview card and on hover for CTAs and product cards.
- **Ambient Hover** (`box-shadow: 0 20px 40px -10px rgba(144, 70, 66, 0.12)` + `translateY(-2px)`, class `.shadow-ambient-hover:hover`): the escalated state of Ambient, paired with a lift.
- **Border-as-separator** (`border border-blush-alto` at `/20`–`/40` opacity): the far more common depth cue in this system — cards, drawers, and modals are usually separated by a warm hairline border, not a shadow.

### Named Rules
**The Glow-On-Interaction Rule.** Shadows in this system only escalate in response to hover/focus; nothing ships with a heavy shadow at rest. Depth at rest comes from a `blush-alto` border or a tonal background shift (white card on `ivory-quente` page), not from `box-shadow`.

## 5. Components

### Buttons
- **Shape:** `rounded-xl` (12px) is the intended default for solid and ghost buttons; `rounded-full` is reserved for icon-adjacent circular CTAs (icon buttons, the Bespoke Lab's numbered step badges).
- **Primary:** `Terracota Queimada` background, white text, uppercase tracked label, `hover:-translate-y-0.5` to `-1` lift with an Ambient-Hover shadow escalation. This is the system's signature tactile confirmation — every primary action should feel like it responds physically to a hover.
- **Ghost/Outline:** `border-Terracota-Queimada/20` at rest, transitioning to a filled or tinted state on hover.
- **Hover/Focus:** always paired — a lift (`-translate-y`) plus a shadow or fill change, never one without the other.

### Chips
- **Category filter (segmented control):** track in `blush-alto/10`, active pill in white with `shadow-sm` + `ring-1 ring-black/5`, inactive transparent with muted text.
- **Aroma/scent tag:** `rounded-full`, warm-tinted background (`blush-alto` or `soft-blush`), optional `Sparkles` icon in `Mel Dourado`.
- **Featured badge:** the one chip that's `rounded-md` instead of `rounded-full` — a small solid `Terracota Queimada` pill in the top-left corner of a product image.

### Cards
- **Corner Style:** `rounded-2xl` (product cards) to `rounded-3xl` (modals, Customizer panels) — larger surfaces get a larger radius.
- **Background:** white on the `ivory-quente` page, or `blush-suave`/`soft-blush` for a section that wants to read as "inset."
- **Shadow Strategy:** flat at rest, Ambient glow + `-translate-y-1` lift on hover (see Elevation).
- **Border:** `border-Terracota-Queimada/15` or `border-blush-alto/20`–`/40` depending on context.
- **Internal Padding:** 24px (compact cards) to 32px (Customizer panels, modals).

### Inputs
- **Style:** warm-tinted border (`blush-alto/30`–`/40`), white or near-white background, generous rounding (`rounded-full` for the catalog search box, `rounded-xl` for the Bespoke Lab's message field).
- **Focus:** border shifts to `Terracota Queimada` with a soft ring glow (`ring-primary/10`).

### Navigation
- **Header:** sticky, `ivory-quente/85` with `backdrop-blur-md`, a `blush-alto/40` hairline bottom border. Logo left, text links center (muted → primary on hover, no underline), cart + WhatsApp quick-chat + hamburger right.
- **Mobile:** a full-height right-side drawer (`80vw`, max `24rem`) with a backdrop blur, nav links as full-width rows, and a pinned WhatsApp CTA at the bottom.

### Bespoke Lab (signature component)
The Customizer ("Bespoke Lab") is Lumina's most distinctive pattern: a numbered, four-step selection panel (container → scent → decoration → custom message) on the left, paired with a live preview card on the right that renders a simulated candle, a mock linen tag with the customer's message, and a running price ledger. It's the clearest expression of "tátil e confiante" (tactile and confident) in the whole site — every choice visibly updates the preview and the price in real time.

## 6. Do's and Don'ts

### Do:
- **Do** keep Terracota Queimada as the only interactive-meaning color; every button, link, and active state routes through it.
- **Do** use Playfair Display exclusively for narrative/emotional copy (headlines, product names, prices) and DM Sans for everything functional.
- **Do** pair every primary CTA's hover state with both a lift (`-translate-y-0.5`/`-1`) and a shadow escalation — one without the other reads as unfinished.
- **Do** use `.shadow-ambient` / `.shadow-ambient-hover` for any new elevated surface instead of inventing a new `box-shadow` value.
- **Do** default new buttons to `rounded-xl` (12px); reserve `rounded-full` for genuinely circular, icon-only controls.

### Don't:
- **Don't** build another generic marketplace grid, a cold SaaS-flat dashboard look, or an over-the-top luxury-editorial page — these are Lumina's stated anti-references.
- **Don't** invent a new one-off shadow rgba value. Three different ad-hoc shadows already exist in the codebase (`rgba(0,0,0,0.08)` on `ProductCard`, `rgba(113,82,65,0.2)` on the Hero's video frame, plus the real `.shadow-ambient` token) — consolidate toward the Ambient token rather than adding a fourth.
- **Don't** style the same semantic element two different ways on different screens. Scent/aroma tags currently render as `blush-alto` pills on the product detail page but `soft-blush` + `border-primary/15` pills in the product modal — pick one and reuse it.
- **Don't** duplicate the WhatsApp CTA style. Three different treatments exist today: the shared `WhatsAppCTA` component uses generic WhatsApp brand green (`bg-green-600`), while `CartDrawer`/`HowItWorks` use solid `bg-primary`, and `ProductDetailModal` uses an outlined `border-primary` ghost style. Standardize on the solid `bg-primary` treatment (used in two of the three places and consistent with the One Accent Rule) and retire the green variant.
- **Don't** add another tiny-uppercase-tracked eyebrow badge above a section without variation. The badge pattern ("Feito com Propósito", "Seleção Especial", "Processo de Compra", "Atelier Interativo", "Coleção Florescer") already repeats identically above nearly every major section — one more identical instance tips this from "brand cadence" into the generic AI-eyebrow tell. Vary the cadence for any new section instead of reaching for the same badge again.
- **Don't** use Mel Dourado for anything clickable — it's a decorative accent only, never a button or link color.
