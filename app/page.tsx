import { getProducts } from '@/lib/directus/get-products';
import { getCategories } from '@/lib/directus/get-categories';
import { getFaqs } from '@/lib/directus/get-faqs';
import { getSiteSettings } from '@/lib/directus/get-site-settings';
import { SiteSettingsProvider } from '@/components/SiteSettingsContext';
import HomeClient from '@/components/HomeClient';

export const revalidate = 3600;

const SITE_URL = process.env.SITE_URL || 'https://velasartesanais.luminacomproposito.com.br';

export default async function Page() {
  const [products, categories, faqs, settings] = await Promise.all([
    getProducts(),
    getCategories(),
    getFaqs(),
    getSiteSettings(),
  ]);

  // FAQPage schema — excelente para GEO (citado por Perplexity, ChatGPT, Gemini)
  const faqJsonLd = faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    : null;

  // LocalBusiness schema — fundamental para Google Maps e buscas locais em Florianópolis
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: settings.brand_name,
    description: settings.seo_description,
    url: SITE_URL,
    logo: `${SITE_URL}/images/icon.png`,
    image: `${SITE_URL}/images/lumina-velas.jpeg`,
    telephone: `+${settings.whatsapp_number}`,
    email: settings.contact_email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Florianópolis',
      addressRegion: 'SC',
      addressCountry: 'BR',
    },
    sameAs: [settings.instagram_url].filter(Boolean),
    priceRange: '$$',
    currenciesAccepted: 'BRL',
    paymentAccepted: 'Cash, PIX, Cartão de Crédito',
    openingHours: 'Mo-Sa 09:00-18:00',
  };

  return (
    <>
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <SiteSettingsProvider settings={settings}>
        <HomeClient products={products} categories={categories} faqs={faqs} />
      </SiteSettingsProvider>
    </>
  );
}
