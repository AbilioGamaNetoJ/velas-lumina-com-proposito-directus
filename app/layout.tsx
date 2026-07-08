import type { Metadata } from 'next';
import { DM_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { getSiteSettings } from '@/lib/directus/get-site-settings';
import { getProducts } from '@/lib/directus/get-products';
import { CartProvider } from '@/components/CartContext';

export const revalidate = 3600;

const SITE_URL = process.env.SITE_URL || 'https://velasartesanais.luminacomproposito.com.br';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  // Garante URL absoluta para a OG image (tanto Directus quanto fallback local)
  const ogImageUrl = settings.og_image
    ? settings.og_image
    : `${SITE_URL}/images/lumina-velas.jpeg`;

  const ogImages = [{ url: ogImageUrl, width: 1200, height: 630, alt: settings.brand_name }];

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: settings.seo_title,
      template: `%s | ${settings.brand_name}`,
    },
    description: settings.seo_description,
    keywords: [
      'velas artesanais',
      'velas aromáticas',
      'velas decorativas',
      'velas personalizadas',
      'presentes artesanais',
      'Florianópolis',
    ],
    authors: [{ name: settings.brand_name }],
    icons: {
      icon: [
        { url: '/images/icon.png', type: 'image/png' },
      ],
      apple: '/images/icon.png',
      shortcut: '/images/icon.png',
    },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: SITE_URL,
      siteName: settings.brand_name,
      title: settings.seo_title,
      description: settings.seo_description,
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.seo_title,
      description: settings.seo_description,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'Zt-IBYRuhOBYT-mBScei2IL3NLPIAVgQ4PcGdZUuekI',
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, settings] = await Promise.all([getProducts(), getSiteSettings()]);

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.brand_name,
    url: SITE_URL,
    logo: `${SITE_URL}/images/icon.png`,
    sameAs: [
      settings.instagram_url,
    ].filter(Boolean),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'Portuguese',
    },
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: settings.brand_name,
    url: SITE_URL,
    description: settings.seo_description,
    inLanguage: 'pt-BR',
  };

  return (
    <html lang="pt-BR">
      <body className={`${dmSans.variable} ${playfairDisplay.variable} antialiased`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <CartProvider products={products}>{children}</CartProvider>
      </body>
    </html>
  );
}
