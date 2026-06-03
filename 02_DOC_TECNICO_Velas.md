# Documento Técnico Interno — Site Vitrine Loja de Velas
**Empresa:** Codex Create  
**Projeto:** Site Vitrine — Loja de Velas Decorativas e Personalizadas  
**Versão:** 1.0  
**Data:** Maio / 2025  
**Dev Responsável:** **[A DEFINIR]**  
**Status:** 🟡 Em elaboração

> ⚙️ **Uso interno** — Referência técnica completa para desenvolvimento. Não compartilhar com o cliente.

---

## 1. Identificação do Projeto

| Campo | Valor |
|-------|-------|
| Nome do Projeto | Site Vitrine — Loja de Velas |
| Cliente | **[A DEFINIR]** |
| Tipo | Site Vitrine / Institucional com CMS |
| Prazo estimado | **[A DEFINIR]** |
| Repositório | **[A DEFINIR]** — GitHub |
| Ambiente de Deploy | Vercel |
| Branch principal | `main` |
| Branch de desenvolvimento | `dev` |

---

## 2. Stack Tecnológica

### Front-end

| Tecnologia | Versão | Finalidade |
|-----------|--------|-----------|
| Next.js | 14+ (App Router) | Framework React com SSG/SSR e roteamento |
| React | 18+ | Biblioteca de UI |
| TypeScript | 5+ | Tipagem estática |
| Tailwind CSS | 3+ | Estilização utility-first |
| next/image | — | Otimização automática de imagens |
| next/font | — | Carregamento otimizado de fontes |

### CMS

| Tecnologia | Versão | Finalidade |
|-----------|--------|-----------|
| Sanity.io | v3 | Headless CMS para gerenciamento de conteúdo |
| @sanity/client | — | Cliente para queries GROQ no front-end |
| @sanity/image-url | — | Geração de URLs otimizadas para imagens do Sanity |
| GROQ | — | Query language do Sanity para busca de conteúdo |

### Infraestrutura

| Tecnologia | Finalidade |
|-----------|-----------|
| Vercel | Deploy contínuo, CDN, Serverless Functions |
| Sanity CDN | Entrega de assets e imagens via CDN global |
| GitHub Actions | CI — lint e type-check em PRs |

---

## 3. Arquitetura do Sistema

### Tipo de Arquitetura
- [x] Jamstack (SSG com revalidação ISR)
- [x] Headless CMS integrado
- [ ] Microserviços
- [ ] API própria (não necessária nesta versão)

### Diagrama de Fluxo de Dados

```
[Sanity Studio (Admin)]
        |
        | Conteúdo salvo via Sanity API
        v
[Sanity CDN / API]
        |
        | GROQ queries (via @sanity/client)
        v
[Next.js (SSG / ISR)]
        |
        | HTML + JS estático gerado e servido
        v
[Vercel CDN] ──────► [Visitante (Browser)]
                              |
                              | Clique em "Comprar via WhatsApp"
                              v
                    [WhatsApp Web/App]
                    (com mensagem pré-preenchida)
```

### Estratégia de Renderização

| Página | Estratégia | Justificativa |
|--------|-----------|---------------|
| Home | SSG + ISR (60s) | Conteúdo semi-estático, SEO crítico |
| Listagem de Produtos | SSG + ISR (60s) | Alta frequência de acesso, SEO importante |
| Detalhe do Produto | SSG + ISR (60s) | Conteúdo por slug, SEO por produto |
| Sobre / Contato | SSG | Conteúdo raramente alterado |

---

## 4. Estrutura de Pastas

```
/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Layout raiz (fonte, metadata global)
│   ├── page.tsx                # Home
│   ├── produtos/
│   │   ├── page.tsx            # Listagem de produtos
│   │   └── [slug]/
│   │       └── page.tsx        # Detalhe do produto
│   ├── sobre/
│   │   └── page.tsx
│   └── contato/
│       └── page.tsx
│
├── components/
│   ├── ui/                     # Componentes atômicos reutilizáveis
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   └── Tag.tsx
│   ├── product/
│   │   ├── ProductCard.tsx     # Card de produto para listagem
│   │   ├── ProductCarousel.tsx # Carrossel de imagens do produto
│   │   ├── ProductDetail.tsx   # Página de detalhe
│   │   └── WhatsAppCTA.tsx     # Botão de CTA com redirect WhatsApp
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MobileMenu.tsx
│   └── home/
│       ├── HeroSection.tsx
│       ├── FeaturedProducts.tsx
│       └── AboutSection.tsx
│
├── lib/
│   ├── sanity/
│   │   ├── client.ts           # Configuração do cliente Sanity
│   │   ├── queries.ts          # GROQ queries centralizadas
│   │   └── image.ts            # Helper para URLs de imagem
│   └── whatsapp.ts             # Utilitário para montar URLs do WhatsApp
│
├── sanity/                     # Sanity Studio embutido (opcional /studio)
│   ├── schema/
│   │   ├── produto.ts
│   │   ├── categoria.ts
│   │   └── configuracoes.ts
│   └── sanity.config.ts
│
├── types/
│   └── produto.ts              # Tipagens TypeScript do modelo de dados
│
├── public/
│   └── og-image.jpg            # Imagem OG padrão do site
│
├── styles/
│   └── globals.css             # Reset + variáveis CSS customizadas
│
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 5. Modelo de Dados — Sanity Schema

### Schema: `produto`

```typescript
// sanity/schema/produto.ts
export default {
  name: 'produto',
  title: 'Produto',
  type: 'document',
  fields: [
    { name: 'nome',         title: 'Nome do Produto',    type: 'string',   validation: R => R.required() },
    { name: 'slug',         title: 'Slug (URL)',         type: 'slug',     options: { source: 'nome' }, validation: R => R.required() },
    { name: 'descricao',    title: 'Descrição Curta',    type: 'text',     rows: 3 },
    { name: 'descricaoLonga', title: 'Descrição Detalhada', type: 'array', of: [{ type: 'block' }] },
    { name: 'preco',        title: 'Preço (R$)',         type: 'number',   validation: R => R.required().positive() },
    { name: 'imagens',      title: 'Imagens do Produto', type: 'array',    of: [{ type: 'image', options: { hotspot: true } }], validation: R => R.min(1) },
    { name: 'categoria',    title: 'Categoria',          type: 'reference', to: [{ type: 'categoria' }] },
    { name: 'tags',         title: 'Tags',               type: 'array',    of: [{ type: 'string' }] },
    { name: 'destaque',     title: 'Produto em Destaque?', type: 'boolean', initialValue: false },
    { name: 'disponivel',   title: 'Disponível para Venda?', type: 'boolean', initialValue: true },
    { name: 'mensagemWhatsApp', title: 'Mensagem WhatsApp (pré-preenchida)', type: 'text', rows: 2,
      description: 'Deixe vazio para usar a mensagem padrão gerada automaticamente' },
    { name: 'seoTitulo',    title: 'SEO: Título Meta',   type: 'string' },
    { name: 'seoDescricao', title: 'SEO: Descrição Meta', type: 'text',   rows: 2 },
  ],
  preview: {
    select: { title: 'nome', media: 'imagens.0', subtitle: 'preco' },
    prepare({ title, media, subtitle }) {
      return { title, media, subtitle: subtitle ? `R$ ${subtitle.toFixed(2)}` : '' }
    }
  }
}
```

### Schema: `categoria`

```typescript
// sanity/schema/categoria.ts
export default {
  name: 'categoria',
  title: 'Categoria',
  type: 'document',
  fields: [
    { name: 'nome',    title: 'Nome da Categoria', type: 'string', validation: R => R.required() },
    { name: 'slug',    title: 'Slug',              type: 'slug',   options: { source: 'nome' } },
    { name: 'ordem',   title: 'Ordem de exibição', type: 'number' },
  ]
}
```

### Schema: `configuracoes`

```typescript
// sanity/schema/configuracoes.ts
// Documento singleton — configurações globais do site
export default {
  name: 'configuracoes',
  title: 'Configurações do Site',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    { name: 'nomeLoja',       title: 'Nome da Loja',         type: 'string' },
    { name: 'whatsappNumero', title: 'Número WhatsApp',      type: 'string', description: 'Somente dígitos, com DDD e código do país. Ex: 5548999999999' },
    { name: 'mensagemPadrao', title: 'Mensagem Padrão WhatsApp', type: 'text', rows: 2 },
    { name: 'logoClaro',      title: 'Logo (tema claro)',    type: 'image' },
    { name: 'logoDark',       title: 'Logo (tema escuro)',   type: 'image' },
    { name: 'instagramUrl',   title: 'Instagram URL',        type: 'url' },
    { name: 'seoTituloPadrao', title: 'SEO: Título padrão do site', type: 'string' },
    { name: 'seoDescricaoPadrao', title: 'SEO: Descrição padrão', type: 'text', rows: 2 },
  ]
}
```

---

## 6. GROQ Queries Centralizadas

```typescript
// lib/sanity/queries.ts

// Todos os produtos disponíveis
export const PRODUCTS_QUERY = `
  *[_type == "produto" && disponivel == true] | order(_createdAt desc) {
    _id, nome, slug, descricao, preco,
    "imagens": imagens[].asset->url,
    "categoria": categoria->nome,
    destaque
  }
`

// Produtos em destaque (para a Home)
export const FEATURED_PRODUCTS_QUERY = `
  *[_type == "produto" && disponivel == true && destaque == true][0..5] {
    _id, nome, slug, descricao, preco,
    "imagemPrincipal": imagens[0].asset->url,
    "categoria": categoria->nome
  }
`

// Produto por slug (para a página de detalhe)
export const PRODUCT_BY_SLUG_QUERY = `
  *[_type == "produto" && slug.current == $slug][0] {
    _id, nome, slug, descricao, descricaoLonga, preco,
    "imagens": imagens[]{
      "url": asset->url,
      "alt": alt
    },
    "categoria": categoria->{ nome, slug },
    tags, mensagemWhatsApp,
    seoTitulo, seoDescricao
  }
`

// Slugs de produtos (para generateStaticParams)
export const PRODUCT_SLUGS_QUERY = `
  *[_type == "produto" && defined(slug.current)][].slug.current
`

// Configurações globais do site
export const SITE_CONFIG_QUERY = `
  *[_type == "configuracoes"][0] {
    nomeLoja, whatsappNumero, mensagemPadrao,
    instagramUrl, seoTituloPadrao, seoDescricaoPadrao
  }
`
```

---

## 7. Integração com WhatsApp

### Utilitário de montagem de URL

```typescript
// lib/whatsapp.ts

interface WhatsAppParams {
  numero: string          // Ex: "5548999999999"
  nomeProduto: string
  preco: number
  mensagemCustom?: string // Override opcional da mensagem
}

export function buildWhatsAppURL({ numero, nomeProduto, preco, mensagemCustom }: WhatsAppParams): string {
  const mensagem = mensagemCustom
    ?? `Olá! Tenho interesse no produto: *${nomeProduto}* (R$ ${preco.toFixed(2)}). Poderia me dar mais informações?`

  const encoded = encodeURIComponent(mensagem)
  return `https://wa.me/${numero}?text=${encoded}`
}
```

### Regras da mensagem pré-preenchida

| Campo | Comportamento |
|-------|--------------|
| Número | Buscado das `configuracoes` do Sanity (campo `whatsappNumero`) |
| Mensagem padrão | `"Olá! Tenho interesse no produto: *{nome}* (R$ {preco}). Poderia me dar mais informações?"` |
| Mensagem custom | Se o campo `mensagemWhatsApp` do produto estiver preenchido no Sanity, tem prioridade |
| Formato do número | Somente dígitos, com código do país: `5548999999999` |

---

## 8. Componente: Carrossel de Imagens

### Especificação

- Exibir todas as imagens do array `imagens` do produto
- Navegação por setas (anterior / próxima) e por dots indicadores
- Suporte a swipe em mobile (touch events)
- A imagem ativa deve ter transição suave (fade ou slide — a definir com o cliente)
- Lazy loading nas imagens fora da viewport
- Usar `next/image` para otimização automática

### Implementação sugerida

```typescript
// components/product/ProductCarousel.tsx
// Usar biblioteca: embla-carousel-react (leve, sem dependência de jQuery)
// npm install embla-carousel-react

import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

interface CarouselProps {
  imagens: { url: string; alt?: string }[]
  nomeProduto: string
}

export function ProductCarousel({ imagens, nomeProduto }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  // ... implementação de dots e setas
}
```

---

## 9. Componente: WhatsApp CTA

```typescript
// components/product/WhatsAppCTA.tsx
import { buildWhatsAppURL } from '@/lib/whatsapp'

interface CTAProps {
  numero: string
  nomeProduto: string
  preco: number
  mensagemCustom?: string
  className?: string
}

export function WhatsAppCTA({ numero, nomeProduto, preco, mensagemCustom, className }: CTAProps) {
  const url = buildWhatsAppURL({ numero, nomeProduto, preco, mensagemCustom })

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 
                  text-white font-semibold px-6 py-3 rounded-full transition-colors ${className}`}
      aria-label={`Comprar ${nomeProduto} via WhatsApp`}
    >
      {/* Ícone WhatsApp SVG inline */}
      Comprar via WhatsApp
    </a>
  )
}
```

---

## 10. SEO e Metadados

### Estratégia

```typescript
// app/produtos/[slug]/page.tsx — Exemplo de metadados dinâmicos por produto

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const produto = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug: params.slug })
  return {
    title: produto.seoTitulo ?? `${produto.nome} — [Nome da Loja]`,
    description: produto.seoDescricao ?? produto.descricao,
    openGraph: {
      title: produto.nome,
      description: produto.descricao,
      images: [{ url: produto.imagens[0]?.url }],
    },
  }
}
```

### Checklist de SEO

- [ ] `next/metadata` com título e descrição dinâmicos por página
- [ ] Open Graph tags (título, descrição, imagem) em todas as páginas
- [ ] Schema.org `Product` em JSON-LD nas páginas de detalhe
- [ ] `sitemap.xml` gerado automaticamente com `next-sitemap`
- [ ] `robots.txt` configurado
- [ ] Slug de produto amigável (ex: `/produtos/vela-aromatica-lavanda`)
- [ ] `alt` text em todas as imagens
- [ ] `canonical` URLs configuradas

---

## 11. Design System

### Paleta de Cores (Proposta — pendente aprovação do cliente)

| Token | Hex | Uso |
|-------|-----|-----|
| `primary` | **[A DEFINIR]** | Botões principais, CTAs, destaques |
| `primary-dark` | **[A DEFINIR]** | Hover de elementos primários |
| `secondary` | **[A DEFINIR]** | Elementos de apoio |
| `background` | `#FAFAF8` (sugestão) | Fundo geral — branco quente |
| `surface` | `#FFFFFF` | Cards, modais |
| `text-primary` | `#1A1A1A` | Textos principais |
| `text-muted` | `#6B7280` | Subtítulos, descrições |
| `border` | `#E5E7EB` | Bordas de componentes |
| `success` | `#22C55E` | Confirmações |
| `whatsapp` | `#25D366` | Botão WhatsApp |

> 🎨 Paleta final depende de aprovação da identidade visual do cliente.

### Tipografia (Sugestão — pendente aprovação)

| Tipo | Fonte | Peso | Uso |
|------|-------|------|-----|
| Display | Playfair Display | 700 | Títulos, hero sections |
| Body | Inter | 400 / 500 | Textos gerais |
| Code | — | — | Não aplicável |

### Padrões de Componentes

- **Border Radius:** `sm: 4px / md: 8px / lg: 16px / full: 9999px`
- **Espaçamento base:** Grid de 4px (Tailwind padrão)
- **Ícones:** Lucide React
- **Modo escuro:** Não previsto nesta versão

---

## 12. Requisitos Funcionais

| Código | Descrição | Prioridade | Módulo | Status |
|--------|-----------|------------|--------|--------|
| RF01 | Exibir listagem de todos os produtos disponíveis | Must Have | Produtos | 🔲 Pendente |
| RF02 | Exibir página de detalhe do produto com carrossel de imagens | Must Have | Produtos | 🔲 Pendente |
| RF03 | Exibir nome, descrição, preço e informações complementares do produto | Must Have | Produtos | 🔲 Pendente |
| RF04 | Botão CTA redireciona ao WhatsApp com mensagem pré-preenchida | Must Have | WhatsApp | 🔲 Pendente |
| RF05 | Filtro por categoria na listagem de produtos | Should Have | Produtos | 🔲 Pendente |
| RF06 | Seção de produtos em destaque na Home | Must Have | Home | 🔲 Pendente |
| RF07 | Página "Sobre" com informações da loja | Should Have | Institucional | 🔲 Pendente |
| RF08 | Gerenciamento de produtos via Sanity Studio | Must Have | CMS | 🔲 Pendente |
| RF09 | Gerenciamento de configurações (WhatsApp, textos) via Sanity | Must Have | CMS | 🔲 Pendente |
| RF10 | Sitemap e robots.txt gerados automaticamente | Must Have | SEO | 🔲 Pendente |
| RF11 | Metadados SEO por produto gerenciáveis via Sanity | Should Have | SEO / CMS | 🔲 Pendente |

---

## 13. Requisitos Não Funcionais

| Código | Categoria | Descrição | Critério Mensurável |
|--------|-----------|-----------|---------------------|
| RNF01 | Performance | Carregamento rápido em mobile e desktop | LCP < 2.5s (Core Web Vitals) |
| RNF02 | Performance | Imagens otimizadas automaticamente | Uso de `next/image` com lazy loading |
| RNF03 | SEO | Metadados completos em todas as páginas | 100% das páginas com title + description + OG |
| RNF04 | Responsividade | Interface funcional em qualquer dispositivo | Funcional em 375px a 2560px |
| RNF05 | Disponibilidade | Site no ar continuamente | Uptime > 99.9% (garantido pela Vercel) |
| RNF06 | Manutenibilidade | Conteúdo gerenciável sem acesso ao código | 100% do conteúdo de produtos via Sanity |
| RNF07 | Manutenibilidade | Código versionado e documentado | Git + README + comentários em funções críticas |
| RNF08 | Acessibilidade | Acessibilidade básica garantida | Alt text em imagens, contraste AA, semântica HTML |
| RNF09 | Escalabilidade | Suporta novos produtos sem alteração de código | Estrutura dinâmica via CMS |

---

## 14. Regras de Negócio

| Código | Nome | Descrição | Módulo | Exceções |
|--------|------|-----------|--------|----------|
| RN01 | Exibição de disponibilidade | Apenas produtos com `disponivel == true` são exibidos no site | Produtos | Nenhuma |
| RN02 | Mensagem WhatsApp | A mensagem é gerada automaticamente com nome e preço do produto | WhatsApp | Se `mensagemWhatsApp` estiver preenchido no Sanity, usa o campo customizado |
| RN03 | Número WhatsApp | O número para contato é definido nas configurações globais (Sanity) | WhatsApp | Nenhuma |
| RN04 | Slug único | Cada produto possui um slug único, derivado do nome | CMS | Duplicatas rejeitadas pelo Sanity com erro de validação |
| RN05 | Imagem obrigatória | Todo produto deve ter pelo menos 1 imagem cadastrada | CMS | Validação no schema do Sanity |
| RN06 | Destaque na Home | Somente produtos com `destaque == true` aparecem na seção de destaques | Home | Máximo de 6 produtos em destaque exibidos simultaneamente |

---

## 15. Fluxo Técnico — Jornada do Visitante

```
1. Visitante acessa o site (Home)
2. Next.js serve página pré-gerada (SSG) com produtos em destaque do Sanity
3. Visitante navega para "Produtos" (/produtos)
4. Listagem exibe todos produtos disponíveis (SSG/ISR, dados do Sanity)
5. Visitante clica em um produto
6. Next.js serve página de detalhe (/produtos/[slug]) com carrossel + info
7. Visitante clica em "Comprar via WhatsApp"
8. lib/whatsapp.ts monta a URL: wa.me/{numero}?text={mensagem_encoded}
9. Navegador abre WhatsApp (web ou app) com mensagem pré-preenchida
10. Visitante envia a mensagem — conversão realizada fora do site
```

---

## 16. Checklist de Entrega

### Desenvolvimento
- [ ] Schemas do Sanity criados e publicados
- [ ] Queries GROQ implementadas e tipadas
- [ ] Componentes: Header, Footer, ProductCard, ProductCarousel, WhatsAppCTA
- [ ] Páginas: Home, Listagem, Detalhe, Sobre, Contato
- [ ] Integração WhatsApp testada com número real
- [ ] ISR configurado nas páginas dinâmicas

### SEO
- [ ] Metadados dinâmicos por página
- [ ] Open Graph em todas as rotas
- [ ] Schema.org Product em JSON-LD
- [ ] Sitemap.xml gerado
- [ ] Robots.txt configurado
- [ ] Imagens com alt text

### Deploy
- [ ] Projeto conectado à Vercel
- [ ] Variáveis de ambiente configuradas no Vercel (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`)
- [ ] Domínio customizado configurado com SSL
- [ ] Sanity CORS liberado para o domínio de produção
- [ ] Webhook Sanity → Vercel configurado para revalidação ISR

### Qualidade
- [ ] Testes de responsividade (375px, 768px, 1280px, 1920px)
- [ ] Teste de performance (Lighthouse Score > 90 em mobile)
- [ ] Teste do fluxo WhatsApp (mensagem gerada corretamente)
- [ ] Revisão de acessibilidade (axe DevTools)

---

## ⚠️ Pontos de Atenção Técnicos

- [ ] **[A DEFINIR]** — Paleta de cores e fonte definitivas (bloqueia início do front-end)
- [ ] **[A DEFINIR]** — Número WhatsApp e mensagem padrão para configurar no Sanity
- [ ] **[A DEFINIR]** — Biblioteca de carrossel a confirmar (Embla recomendada, mas avaliar Swiper se o cliente já tiver preferência)
- [ ] **[A VALIDAR]** — Cliente precisará de acesso ao Sanity Studio — planejar onboarding básico
- [ ] **[A DEFINIR]** — Nome do projeto no Sanity (usado no Project ID e dataset)
- [ ] **[RISCO TÉCNICO]** — ISR com Sanity requer configuração de Webhook para invalidação de cache; documentar e testar em staging antes do go-live

---

_Documento interno · Codex Create · codexcreate.com.br_
