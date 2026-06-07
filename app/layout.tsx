import type { Metadata } from 'next';
import { DM_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';

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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://velasartesanais.luminacomproposito.com.br'),
  title: {
    default: 'Lumina | Velas Artesanais & Feitas com Propósito',
    template: '%s | Lumina Velas Artesanais'
  },
  description: 'Velas artesanais feitas à mão com cuidado e carinho. Cada peça é única, personalizada com aromas exclusivos para iluminar seus momentos mais especiais.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: 'Lumina Velas',
    title: 'Lumina | Velas Artesanais & Feitas com Propósito',
    description: 'Velas artesanais feitas à mão com cuidado e carinho. Cada peça é única, personalizada com aromas exclusivos para iluminar seus momentos mais especiais.',
    images: [
      {
        url: '/images/lumina-velas.jpeg',
        width: 1200,
        height: 630,
        alt: 'Lumina - Velas Artesanais feitas com propósito',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lumina | Velas Artesanais & Feitas com Propósito',
    description: 'Velas artesanais feitas à mão com cuidado e carinho. Cada peça é única, personalizada com aromas exclusivos para iluminar seus momentos mais especiais.',
    images: ['/images/lumina-velas.jpeg'],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${dmSans.variable} ${playfairDisplay.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
