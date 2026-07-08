/**
 * next-sitemap.config.cjs
 *
 * ATENÇÃO: Este arquivo está mantido apenas para referência histórica.
 *
 * O sitemap agora é gerado dinamicamente pelo App Router do Next.js via
 * `app/sitemap.ts` com ISR (revalidate = 3600).
 *
 * Isso garante que novos produtos adicionados no Directus apareçam no
 * sitemap em até 1 hora, sem necessidade de rebuild ou redeploy.
 *
 * O robots.txt também é gerado dinamicamente via `app/robots.ts`,
 * apontando para o SITE_URL correto em produção.
 */

// @type {import('next-sitemap').IConfig}
// module.exports = {
//   siteUrl: process.env.SITE_URL || 'https://lumina-velas.com.br',
//   generateRobotsTxt: true,
//   sitemapSize: 7000,
// };
