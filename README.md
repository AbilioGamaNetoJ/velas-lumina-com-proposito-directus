# 🕯️ Velas Lumina com Propósito

> Site vitrine moderno para loja de velas artesanais, decorativas e personalizadas — do catálogo ao pedido, tudo com um toque no WhatsApp.

---

## 📋 Sobre o Projeto

O **Velas Lumina com Propósito** é um **site vitrine institucional** desenvolvido para apresentar um catálogo de velas artesanais 100% vegetais de forma visualmente atraente. O objetivo é proporcionar aos visitantes uma experiência de descoberta rica e intuitiva, facilitando o contato direto com a loja via WhatsApp — sem a complexidade de um e-commerce tradicional com pagamento online.

Cada vela carrega um propósito: mais que decoração, é um convite à conexão com momentos, aromas e intenções.

### 🎯 Por que um site vitrine?

| Problema | Solução |
|----------|---------|
| Dependência exclusiva de redes sociais como vitrine | Presença digital própria, profissional e indexável |
| Baixa credibilidade percebida sem site próprio | Marca consolidada com domínio e catálogo organizado |
| Dificuldade de descoberta orgânica por buscadores | SEO completo: metadados, Schema.org, sitemap, Open Graph |
| Leads não qualificados nas redes sociais | Tráfego orgânico qualificado direcionado ao WhatsApp |

---

## ✨ Funcionalidades

- 🏠 **Home completa** — Hero, Sobre, Laboratório Personalizado, Catálogo de Produtos e Contato em uma única página fluida
- 🛍️ **Catálogo de produtos** com imagens de alta qualidade, categorias e preços
- 🔍 **Busca e filtros** por nome, descrição, aroma e categoria (Velas, Cestas, Kits)
- 🧪 **Laboratório Bespoke** — Monte sua vela personalizada escolhendo recipiente, essência, decoração e mensagem
- 📱 **Carrinho + WhatsApp** — Adicione produtos ao carrinho e finalize pedidos com mensagem formatada automática no WhatsApp
- 📄 **Páginas de produto** individuais com SEO otimizado, breadcrumbs, schema JSON-LD e guia de cuidados
- 🎨 **Design responsivo** — Experiência fluida do mobile ao desktop
- 🧠 **CMS Sanity** — Gerenciamento completo de produtos sem tocar em código

---

## 🛠️ Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Linguagem** | TypeScript |
| **Estilização** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **CMS** | [Sanity.io](https://www.sanity.io/) (headless CMS) |
| **Carrossel** | [Embla Carousel](https://www.embla-carousel.com/) |
| **Ícones** | [Lucide React](https://lucide.dev/) |
| **SEO** | next-sitemap, JSON-LD, Open Graph dinâmico |
| **Fontes** | DM Sans + Playfair Display (Google Fonts) |
| **Deploy** | Vercel (ISR com revalidate de 3600s) |

---

## 📁 Estrutura do Projeto

```
├── app/                      # Rotas e páginas (Next.js App Router)
│   ├── layout.tsx            # Layout raiz com fontes e metadados globais
│   ├── page.tsx              # Home — produto servidor com dados do Sanity
│   ├── globals.css           # Tokens Tailwind v4 e estilos globais
│   ├── produtos/
│   │   └── [slug]/page.tsx   # Página de detalhe do produto (SSG + SEO)
│   └── studio/               # Sanity Studio embutido (/studio)
├── components/               # Componentes React
│   ├── Header.tsx            # Navegação fixa com carrinho e menu mobile
│   ├── Hero.tsx              # Seção principal com CTA
│   ├── About.tsx             # História e pilares da marca
│   ├── Customizer.tsx        # Laboratório Bespoke — monte sua vela
│   ├── HomeClient.tsx        # Orquestrador da Home (carrinho, busca, filtros)
│   ├── ProductCard.tsx       # Card de produto com CTA rápido
│   ├── ProductCarousel.tsx   # Grid de produtos com carrossel Embla
│   ├── ProductDetailModal.tsx# Modal com detalhes e guia de cuidados
│   ├── CartDrawer.tsx        # Gaveta do carrinho com envio via WhatsApp
│   ├── WhatsAppCTA.tsx       # Botão reutilizável de WhatsApp
│   ├── Footer.tsx            # Rodapé com links e contato
│   └── MobileMenu.tsx        # Menu mobile tipo hamburguer
├── lib/                      # Utilitários e lógica de negócio
│   ├── data.ts               # Dados estáticos (fallback de 13 produtos)
│   ├── whatsapp.ts           # Centralizador de mensagens WhatsApp
│   └── sanity/               # Cliente Sanity + abstração de dados
├── sanity/
│   └── schemaTypes/
│       └── productType.ts    # Schema Sanity para produtos
├── types/
│   └── types.ts              # Interfaces TypeScript (Product, CartItem)
├── public/                   # Arquivos estáticos (robots.txt, sitemap)
├── .env.local                # Variáveis de ambiente locais (não versionado)
├── .env                      # Variáveis de ambiente padrão (versionado)
├── next.config.ts            # Configuração do Next.js 15
└── package.json              # Dependências e scripts
```

---

## 🚀 Rodando Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior)
- Uma conta no [Sanity.io](https://www.sanity.io/) (para o CMS)

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd velas-lumina-com-proposito
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo `.env.local` e preencha com os dados do seu projeto Sanity:

```bash
# .env.local — variáveis locais (não versionado)
NEXT_PUBLIC_SANITY_PROJECT_ID=seu-project-id-aqui
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-06-03
SITE_URL=http://localhost:3001
```

| Variável | Descrição | Onde obter |
|----------|-----------|------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ID do projeto no Sanity | Painel do Sanity → Project settings |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset do Sanity | Normalmente `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Versão da API Sanity | Use uma data no formato `YYYY-MM-DD` |
| `SITE_URL` | URL base do site (ambiente local) | `http://localhost:3001` |

> 💡 O projeto funciona mesmo **sem o Sanity configurado**. Caso as variáveis do Sanity não estejam preenchidas (ou o projeto não tenha dados), o site usa automaticamente o catálogo de fallback com 13 produtos e o personalizador completo — tudo pronto para demonstração.

### 4. Configure o número de WhatsApp

Edite o arquivo `lib/whatsapp.ts` com o número de WhatsApp da loja no formato internacional (código do país + DDD + número, sem espaços ou símbolos).

### 5. Execute o servidor de desenvolvimento

```bash
npm run dev
```

Acesse **[http://localhost:3001](http://localhost:3001)** no navegador.

### Outros comandos

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento na porta 3001 |
| `npm run build` | Build de produção + geração de sitemap |
| `npm run start` | Servidor de produção |
| `npm run lint` | Verificação de linting (ESLint) |

---

## 🔄 Fluxo do Usuário

1. 🏠 **Home** — O visitante chega pela busca orgânica, link ou rede social e vê os produtos em destaque
2. 🛍️ **Catálogo** — Navega pelos produtos, filtra por categoria ou busca por nome/aroma
3. 🔍 **Detalhe** — Clica em um produto e visualiza imagens, descrição, preço e guia de cuidados
4. 🧪 **Personalização** — Opcionalmente, monta uma vela exclusiva no Laboratório Bespoke
5. 📱 **WhatsApp** — Adiciona ao carrinho e finaliza com mensagem automática formatada
6. 💬 A negociação segue diretamente no WhatsApp com a loja

---

## 🧑‍🎨 CMS Sanity

O painel de administração está disponível em `/studio` (ex: `http://localhost:3001/studio`). Através dele é possível:

- ➕ Adicionar, editar e remover produtos
- 🖼️ Fazer upload de imagens com otimização automática
- ⭐ Marcar produtos como destaque
- 🏷️ Gerenciar categorias, aromas e detalhes de cada produto

> O Sanity Studio roda embutido na própria aplicação Next.js, sem necessidade de deploy separado.

---

## 🎨 Design System

| Token | Valor |
|-------|-------|
| **Primária** | Tom terroso / vinho |
| **Fundo** | Off-white quente |
| **Tipografia título** | Playfair Display (serifada, editorial) |
| **Tipografia corpo** | DM Sans (sans-serif, limpa) |
| **Sombras** | `shadow-ambient` para cards e elementos suspensos |

---

## 📈 SEO

O projeto segue as melhores práticas de SEO com:

- **Metadados dinâmicos** — title, description e Open Graph por página e por produto
- **Schema.org JSON-LD** — Dados estruturados de `Product` em cada página de detalhe
- **Sitemap.xml** — Geração automática via `next-sitemap` no postbuild
- **robots.txt** — Configurado para permitir indexação completa
- **Core Web Vitals** — LCP < 2.5s com imagens otimizadas via `next/image`
- **Semântica HTML5** — Estrutura correta de headings, landmarks e alt text

---

## 📄 Licença

Este projeto é privado. Todos os direitos reservados.
