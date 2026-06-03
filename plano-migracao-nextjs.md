# Plano de Migração — Velas Lumina (Vite SPA → Next.js 15 + Sanity)

> **Versão:** 2.0 — Atualizada com decisões do cliente (03/06/2026)

## Objetivo

Migrar o protótipo atual (SPA Vite + React com dados estáticos) para **Next.js 15 (App Router)** com **Sanity CMS progressivo**, mantendo a experiência single-page atual e adicionando páginas individuais de produto para SEO.

---

## Decisões Confirmadas

| Item | Decisão |
|------|---------|
| Framework | Next.js 15 (App Router) |
| Carrinho | ✅ **Mantém** — envio de pedido completo via WhatsApp |
| Bespoke Lab (Customizer) | ✅ **Mantém** — personalização de velas sob encomenda |
| Arquitetura | **Híbrida**: single-page principal + páginas `/produtos/[slug]` para SEO |
| Fontes | DM Sans + Playfair Display (via `next/font`) |
| Tailwind | **v4** (mantém — sem downgrade para v3) |
| Paleta de cores | Atual (`primary: #904642`, `background: #fff8f5`, etc.) |
| WhatsApp | **+55 48 98841-8141** (`5548988418141`) |
| Embla Carousel | ✅ **Sim** — produtos terão múltiplas imagens |
| Framer Motion | ❌ **Remover** — substituir por CSS puro (transitions + IntersectionObserver) |
| Dados | **Estáticos agora** (`data.ts`) → Sanity progressivo com fallback |
| Imagens | URLs atuais por enquanto → Sanity CDN quando populado |
| Textos | Mantém os atuais → substituídos ao popular o Sanity |

---

## Diagnóstico: Estado Atual vs. Estado Final

| Aspecto | Atual (Vite SPA) | Final (Next.js 15) |
|---------|------------------|---------------------|
| Framework | Vite + React 19 (SPA client-side) | Next.js 15 App Router (SSG/ISR) |
| Experiência principal | Single-page scroll | Single-page scroll (mantém) |
| Páginas de produto | Modal overlay | Modal **+** página dedicada `/produtos/[slug]` para SEO |
| CMS | Dados em `data.ts` | Sanity.io v3 (progressivo, com fallback para `data.ts`) |
| Imagens | URLs estáticas Google LH3 | `next/image` + Sanity CDN (quando populado) |
| Carrossel de produto | Imagem única | Embla Carousel (múltiplas imagens) |
| Animações | Framer Motion (~30-40KB) | CSS transitions + IntersectionObserver (~0KB) |
| Fontes | Google Fonts via `<link>` CSS | `next/font` (otimizado, sem FOUT) |
| SEO | `<title>` estático | Metadata dinâmico, OG, JSON-LD, sitemap, robots.txt |
| WhatsApp | Hardcoded `5511999999999` | Centralizado `5548988418141` via `lib/whatsapp.ts` |
| Deploy | Vite dev server | Vercel com ISR |

---

## Mudanças Necessárias

### 1. Migração de Framework: Vite → Next.js 15 (App Router)

- [ ] Criar novo projeto Next.js 15 com App Router
- [ ] Configurar TypeScript 5+, Tailwind CSS v4, e ESLint
- [ ] Remover arquivos Vite: `vite.config.ts`, `index.html`, `src/main.tsx`, `metadata.json`, `assets/`, `.env.example`
- [ ] Configurar `next.config.ts` com domínios de imagem (Google LH3 agora, Sanity CDN depois)
- [ ] Configurar alias `@/*` no `tsconfig.json`

→ **Verificar:** `npm run dev` inicia sem erros; rota `/` renderiza.

---

### 2. Estrutura de Pastas

```
app/
├── layout.tsx              # Layout raiz (fonte via next/font, metadata global)
├── page.tsx                # Home (single-page: Hero → Sobre → Lab → Produtos → Contato)
├── produtos/
│   └── [slug]/
│       └── page.tsx        # Página individual do produto (SEO)
└── globals.css             # Tailwind v4 + tokens de cor + classes custom

components/
├── ui/                     # Componentes atômicos
│   ├── Button.tsx
│   ├── Badge.tsx
│   └── Tag.tsx
├── product/
│   ├── ProductCard.tsx     # Card para listagem (mantém lógica atual)
│   ├── ProductCarousel.tsx # NOVO — Embla Carousel com next/image
│   ├── ProductDetail.tsx   # Adaptado do modal atual → reutilizado na página de detalhe
│   └── WhatsAppCTA.tsx     # NOVO — Botão CTA centralizado
├── layout/
│   ├── Header.tsx          # Mantém carrinho + Bespoke Lab
│   ├── Footer.tsx
│   └── MobileMenu.tsx
├── home/
│   ├── HeroSection.tsx
│   ├── FeaturedProducts.tsx
│   ├── AboutSection.tsx
│   └── Customizer.tsx      # Bespoke Lab (mantém)
└── cart/
    └── CartDrawer.tsx       # Carrinho com envio WhatsApp (mantém)

lib/
├── sanity/
│   ├── client.ts           # Cliente Sanity (configurável via .env)
│   ├── queries.ts          # GROQ queries
│   └── image.ts            # Helper de URLs de imagem
├── data.ts                 # Dados estáticos (fallback)
├── whatsapp.ts             # Utilitário centralizado (número: 5548988418141)
└── get-products.ts         # Camada de dados: Sanity → fallback data.ts

types/
├── produto.ts              # Tipagem do produto (Sanity + estático)
└── cart.ts                 # Tipagem do carrinho

sanity/                     # Sanity Studio (opcional, pode ser separado)
├── schema/
│   ├── produto.ts
│   ├── categoria.ts
│   └── configuracoes.ts
└── sanity.config.ts
```

→ **Verificar:** Estrutura criada, sem arquivos órfãos do Vite.

---

### 3. Remover Framer Motion → CSS Puro

- [ ] Remover dependência `motion` do `package.json`
- [ ] Substituir em cada componente:

| Componente | Animação Framer Motion | Substituição CSS |
|-----------|----------------------|-----------------|
| `Hero.tsx` | `motion.div` fade-in (opacity + y) | Classe `.animate-fade-up` com `@keyframes` |
| `About.tsx` | `motion.div` slide-in no scroll (x) | `IntersectionObserver` + classe `.animate-slide-in` |
| `App.tsx` (grid produtos) | `motion.div` layout + `AnimatePresence` | `transition: opacity 0.3s, transform 0.3s` nos cards |
| `ProductDetailModal.tsx` | `motion.div` scale + fade no modal | CSS `transition` com `.modal-enter` / `.modal-active` |
| `CartDrawer.tsx` | `motion.div` slide-x do drawer | `transform: translateX(100%)` → `translateX(0)` com `transition` |
| `Customizer.tsx` | `motion` apenas no wrapper | Remover — sem animação necessária |

- [ ] Criar `useIntersectionObserver` hook para animações on-scroll
- [ ] Definir keyframes em `globals.css`:
  - `.animate-fade-up` — fade + translateY
  - `.animate-slide-in-left` / `.animate-slide-in-right` — slide horizontal
  - `.animate-scale-in` — scale para modais

→ **Verificar:** Todas as animações visuais funcionam identicamente sem `motion` no bundle.

---

### 4. WhatsApp Centralizado

- [ ] Criar `lib/whatsapp.ts`:
  - `WHATSAPP_NUMBER = '5548988418141'` (hardcoded agora, Sanity depois)
  - `buildWhatsAppURL({ nomeProduto, preco, mensagemCustom })` → retorna URL `wa.me/...`
  - Mensagem padrão: `"Olá! Tenho interesse no produto: *{nome}* (R$ {preco}). Poderia me dar mais informações?"`
- [ ] Criar `components/product/WhatsAppCTA.tsx` — botão verde reutilizável
- [ ] Atualizar `Header.tsx` — link WhatsApp usa número centralizado
- [ ] Atualizar `Footer.tsx` — telefone e link usam número centralizado
- [ ] Atualizar `ProductDetailModal.tsx` — CTA usa `buildWhatsAppURL`
- [ ] Atualizar `CartDrawer.tsx` — checkout usa número centralizado

→ **Verificar:** Todos os links WhatsApp apontam para `wa.me/5548988418141` com mensagens corretas.

---

### 5. Página Individual de Produto (`app/produtos/[slug]/page.tsx`)

> Página dedicada para SEO — complementa o modal na single-page.

- [ ] Criar `app/produtos/[slug]/page.tsx` com renderização SSG + ISR (60s)
- [ ] `generateStaticParams` — gerar páginas para todos os slugs de `data.ts` (depois, do Sanity)
- [ ] `generateMetadata` — título, descrição e OG image dinâmicos por produto
- [ ] **ProductCarousel** com Embla — exibir array de imagens do produto
- [ ] Exibir: nome, descrição, preço, categoria, tags, detalhes físicos (peso, queima, etc.)
- [ ] WhatsAppCTA como botão principal
- [ ] Botão "Adicionar ao Carrinho" (compartilha estado com a página principal)
- [ ] Guia de cuidados (accordion) — reutilizar do modal
- [ ] Schema.org `Product` em JSON-LD
- [ ] Link de retorno para a Home (seção de produtos)

→ **Verificar:** `/produtos/vela-margarida-amarela` renderiza com SEO completo; `view-source` mostra meta tags e JSON-LD.

---

### 6. Embla Carousel (Produto com Múltiplas Imagens)

- [ ] Instalar `embla-carousel-react`
- [ ] Criar `components/product/ProductCarousel.tsx`:
  - Navegação por setas (anterior/próxima)
  - Dots indicadores da imagem ativa
  - Suporte a swipe em mobile (touch events nativos do Embla)
  - Transição suave (slide)
  - `next/image` em cada slide para otimização
  - Loop infinito (`loop: true`)
- [ ] Usar no `ProductDetailModal.tsx` (modal na single-page)
- [ ] Usar no `app/produtos/[slug]/page.tsx` (página dedicada)
- [ ] Atualizar tipo `Product` em `types.ts` para suportar array de imagens:
  ```typescript
  image: string;       // mantém como imagem principal (retrocompatível)
  images?: string[];   // array de imagens adicionais (quando disponível)
  ```

→ **Verificar:** Carrossel funciona com swipe mobile, setas e dots; fallback para imagem única se `images` vazio.

---

### 7. Dados: Estáticos Agora → Sanity Progressivo

- [ ] Manter `data.ts` com todos os produtos e dados do customizer (como está)
- [ ] Criar camada de abstração `lib/get-products.ts`:
  ```
  Sanity configurado E com dados? → Usa Sanity
  Sanity não configurado OU vazio? → Usa data.ts
  ```
- [ ] Criar `lib/sanity/client.ts` com configuração condicional (só conecta se env vars existem)
- [ ] Criar `lib/sanity/queries.ts` com as 5 queries GROQ do doc técnico
- [ ] Criar schemas Sanity (para quando o Studio for configurado):
  - `produto.ts` — conforme doc técnico seção 5
  - `categoria.ts`
  - `configuracoes.ts` — inclui `whatsappNumero` para substituir hardcoded
- [ ] Configurar `.env.local.example` com:
  ```
  NEXT_PUBLIC_SANITY_PROJECT_ID=
  NEXT_PUBLIC_SANITY_DATASET=production
  ```

→ **Verificar:** Sem Sanity configurado: site funciona 100% com dados estáticos. Com Sanity populado: dados vêm do CMS.

---

### 8. SEO Completo

- [ ] `app/layout.tsx` — metadata global:
  - Título padrão: "Lumina | Velas Artesanais & Botânicas"
  - Descrição padrão do site
  - Open Graph defaults
  - `lang="pt-BR"`
- [ ] `app/produtos/[slug]/page.tsx` — metadata dinâmico por produto:
  - `generateMetadata` com título, descrição e OG image do produto
- [ ] Schema.org `Product` em JSON-LD nas páginas de detalhe
- [ ] Instalar e configurar `next-sitemap`:
  - `sitemap.xml` gerado automaticamente
  - `robots.txt` configurado
- [ ] Alt text em todas as imagens
- [ ] Canonical URLs configuradas

→ **Verificar:** Lighthouse SEO > 90; todas as páginas com title + description + OG.

---

### 9. Migração de Componentes

| Componente | Ação | Mudanças |
|-----------|------|----------|
| `Header.tsx` | **MIGRAR** | Carrinho ✅, Bespoke ✅, WhatsApp centralizado, links `next/link` |
| `Hero.tsx` → `HeroSection.tsx` | **MIGRAR** | Remover framer-motion → CSS. CTA secundário mantém link para Lab |
| `About.tsx` → `AboutSection.tsx` | **MIGRAR** | Remover framer-motion → CSS + IntersectionObserver |
| `Customizer.tsx` | **MIGRAR** | Remover framer-motion. Manter 100% da funcionalidade |
| `ProductCard.tsx` | **MIGRAR** | Remover framer-motion. Adicionar link para `/produtos/[slug]`. Manter `onAddToCart` |
| `ProductDetailModal.tsx` | **MIGRAR** | Remover framer-motion → CSS transitions. Integrar Embla Carousel |
| `CartDrawer.tsx` | **MIGRAR** | Remover framer-motion → CSS transitions. WhatsApp centralizado |
| `Footer.tsx` | **MIGRAR** | WhatsApp centralizado. Número real |
| `WhatsAppCTA.tsx` | **CRIAR** | Botão CTA verde reutilizável |
| `ProductCarousel.tsx` | **CRIAR** | Embla Carousel com `next/image` |
| `MobileMenu.tsx` | **CRIAR** | Extrair do Header para componente separado |

---

### 10. Migração de Fontes para `next/font`

- [ ] Remover `@import url(...)` do CSS (Google Fonts link externo)
- [ ] Configurar em `app/layout.tsx`:
  ```typescript
  import { DM_Sans, Playfair_Display } from 'next/font/google'
  ```
- [ ] Aplicar variáveis CSS (`--font-sans`, `--font-serif`) via className no `<body>`

→ **Verificar:** Fontes carregam sem FOUT; sem requests externos para Google Fonts.

---

### 11. Performance e Imagens

- [ ] Usar `next/image` em todas as imagens (otimização automática WebP, lazy loading)
- [ ] Configurar `next.config.ts` para permitir domínios de imagem:
  - `lh3.googleusercontent.com` (imagens atuais)
  - `cdn.sanity.io` (quando Sanity integrado)
- [ ] ISR configurado com `revalidate: 60` nas páginas de produto
- [ ] Testar responsividade: 375px, 768px, 1280px, 1920px

→ **Verificar:** Lighthouse Performance > 90 em mobile; imagens servidas em WebP.

---

## Dependências Finais

### Adicionar
```
next@15
@sanity/client
@sanity/image-url
next-sanity
embla-carousel-react
next-sitemap
```

### Manter
```
react, react-dom
tailwindcss@4 + @tailwindcss/vite (ou adaptação para Next.js + PostCSS)
lucide-react
```

### Remover
```
motion (framer-motion) → substituído por CSS
@google/genai → não utilizada
@vitejs/plugin-react → Vite-specific
vite → substituído por Next.js
express → não necessário
dotenv → Next.js built-in
esbuild → bundling pelo Next.js
tsx → não necessário
```

> **Nota sobre Tailwind v4 + Next.js:** O Tailwind v4 usa `@tailwindcss/vite` no projeto atual. No Next.js, será necessário usar `@tailwindcss/postcss` (plugin PostCSS do Tailwind v4) em vez do plugin Vite. A configuração via `@theme` no CSS se mantém idêntica.

---

## Ordem de Execução

| # | Tarefa | Tipo |
|---|--------|------|
| 1 | Criar projeto Next.js 15 e estrutura de pastas | Infraestrutura |
| 2 | Configurar Tailwind v4 (PostCSS) + fontes (`next/font`) + paleta | Design System |
| 3 | Migrar componentes de layout (Header, Footer, MobileMenu) | Componentes |
| 4 | Migrar página Home (Hero, About, Customizer, Produtos, Footer) | Página |
| 5 | Remover Framer Motion → implementar animações CSS | Refactor |
| 6 | Centralizar WhatsApp (`lib/whatsapp.ts`, número real) | Lógica |
| 7 | Criar ProductCarousel com Embla | Componente |
| 8 | Criar página `/produtos/[slug]` com SEO + JSON-LD | Página + SEO |
| 9 | Preparar camada Sanity (client, schemas, queries, fallback) | CMS |
| 10 | Implementar SEO global (metadata, sitemap, robots.txt) | SEO |
| 11 | Testes de responsividade e performance | QA |

---

## Pontos de Atenção

> [!WARNING]
> **Tailwind v4 + Next.js:** Requer `@tailwindcss/postcss` em vez de `@tailwindcss/vite`. A configuração `@theme {}` no CSS se mantém igual.

> [!NOTE]
> **Sanity:** O projeto funcionará 100% sem Sanity configurado. Os schemas ficam prontos para quando o Studio for criado e populado.

> [!NOTE]
> **Imagens:** As URLs atuais do Google LH3 serão mantidas. Quando os produtos forem cadastrados no Sanity com fotos reais, o fallback é substituído automaticamente.

---

_Plano v2.0 — Decisões do cliente incorporadas. Pronto para execução mediante aprovação._
