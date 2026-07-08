import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getPrivacyPolicy } from '@/lib/directus/get-privacy';
import { getSiteSettings } from '@/lib/directus/get-site-settings';
import { SiteSettingsProvider } from '@/components/SiteSettingsContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PrivacyConsent from '@/components/PrivacyConsent';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: `Política de Privacidade | ${settings.brand_name}`,
    description: `Leia nossa política de privacidade e saiba como protegemos seus dados.`,
    alternates: {
      canonical: '/privacidade',
    },
  };
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(
      new Date(dateStr + 'T12:00:00')
    );
  } catch {
    return dateStr;
  }
}

export default async function PrivacidadePage() {
  const [settings, policy] = await Promise.all([getSiteSettings(), getPrivacyPolicy()]);

  return (
    <SiteSettingsProvider settings={settings}>
      <div className="bg-warm-bg min-h-screen flex flex-col font-sans antialiased">

        <Header cartCount={0} />

        <main className="flex-grow pt-28 pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-brown hover:text-primary transition-colors text-sm mb-10 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Voltar ao início
            </Link>

            {policy ? (
              <>
                <header className="mb-10">
                  <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-dark-brown mb-3">
                    {policy.title}
                  </h1>
                  {policy.last_updated && (
                    <p className="text-sm text-muted-brown">
                      Última atualização: <time dateTime={policy.last_updated}>{formatDate(policy.last_updated)}</time>
                    </p>
                  )}
                </header>

                <article
                  className="prose prose-sm sm:prose max-w-none text-muted-brown
                    prose-headings:font-editorial prose-headings:text-dark-brown
                    prose-h2:text-xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-3
                    prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: policy.body }}
                />

                <PrivacyConsent />
              </>
            ) : (
              <div className="text-center py-20">
                <p className="font-editorial text-2xl font-bold text-dark-brown mb-2">Página não encontrada</p>
                <p className="text-muted-brown text-sm">A política de privacidade ainda não foi configurada.</p>
              </div>
            )}

          </div>
        </main>

        <Footer />

      </div>
    </SiteSettingsProvider>
  );
}
