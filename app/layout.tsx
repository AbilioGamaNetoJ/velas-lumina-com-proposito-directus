import type { Metadata } from 'next';
import { DM_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { getSiteSettings } from '@/lib/directus/get-site-settings';
import { getProducts } from '@/lib/directus/get-products';
import { CartProvider } from '@/components/CartContext';

export const revalidate = 3600;

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
  const siteUrl = process.env.SITE_URL || 'https://velasartesanais.luminacomproposito.com.br';

  const ogImages = settings.og_image
    ? [{ url: settings.og_image, width: 1200, height: 630, alt: settings.brand_name }]
    : [{ url: '/images/lumina-velas.jpeg', width: 1200, height: 630, alt: settings.brand_name }];

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: settings.seo_title,
      template: `%s | ${settings.brand_name}`,
    },
    description: settings.seo_description,
    icons: {
      icon: '/images/icon.png',
      apple: '/images/icon.png',
    },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: '/',
      siteName: settings.brand_name,
      title: settings.seo_title,
      description: settings.seo_description,
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.seo_title,
      description: settings.seo_description,
      images: [ogImages[0].url],
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
  const products = await getProducts();

  return (
    <html lang="pt-BR">
      <body className={`${dmSans.variable} ${playfairDisplay.variable} antialiased`} suppressHydrationWarning>
        <CartProvider products={products}>{children}</CartProvider>
      </body>
    </html>
  );
}
