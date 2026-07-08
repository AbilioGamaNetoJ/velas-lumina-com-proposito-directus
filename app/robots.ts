import { MetadataRoute } from 'next';

const SITE_URL = process.env.SITE_URL || 'https://velasartesanais.luminacomproposito.com.br';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      // Permitir crawlers de IA para GEO (citações em ChatGPT, Perplexity, Claude, Gemini)
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
