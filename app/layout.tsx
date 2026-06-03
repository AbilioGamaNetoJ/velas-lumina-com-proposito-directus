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
  metadataBase: new URL(process.env.SITE_URL || 'https://lumina-velas.com.br'),
  title: {
    default: 'Lumina | Velas Artesanais & Botânicas',
    template: '%s | Lumina Velas Artesanais'
  },
  description: 'Descubra nossas velas artesanais, naturais e veganas. Feitas com cera botânica e óleos essenciais para iluminar com propósito e sustentabilidade.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: 'Lumina Velas',
    title: 'Lumina | Velas Artesanais & Botânicas',
    description: 'Velas artesanais, naturais e veganas feitas com propósito.',
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
