import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProducts, getProductBySlug } from '@/lib/directus/get-products';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import { ChevronRight, ArrowLeft, Flame, Clock, Scale } from 'lucide-react';
import Link from 'next/link';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    return {
      title: 'Produto não encontrado | Lumina Velas Artesanais',
    };
  }

  return {
    title: `${product.name} | Lumina Velas Artesanais`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
    offers: {
      '@type': 'Offer',
      price: product.price.toFixed(2),
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      url: `https://velasartesanais.luminacomproposito.com.br/produtos/${product.id}`,
    },
  };

  return (
    <div className="bg-warm-bg min-h-screen flex flex-col font-sans antialiased pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Fake header to reuse layout. In a real app we'd share layout.tsx for these */}
      <Header cartCount={0} />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Breadcrumbs */}
        <nav className="flex text-xs text-muted-brown mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <Link href="/" className="hover:text-primary transition-colors">
                Início
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-3.5 h-3.5 mx-1" />
                <Link href="/#produtos" className="hover:text-primary transition-colors">
                  Coleção Florescer
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center font-semibold text-primary">
                <ChevronRight className="w-3.5 h-3.5 mx-1" />
                <span>{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Back link */}
        <Link href="/#produtos" className="inline-flex items-center text-xs font-semibold text-primary hover:text-dark-brown transition-colors mb-6 uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar para Catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Image Gallery Column */}
          <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square bg-soft-blush rounded-3xl overflow-hidden shadow-ambient">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Product Details Column */}
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-3 inline-block w-fit">
              {product.category}
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-dark-brown mb-2 leading-tight">
              {product.name}
            </h1>
            <p className="text-xl text-primary font-bold mb-6">
              R$ {product.price.toFixed(2)}
            </p>

            <div className="prose prose-sm text-muted-brown mb-8 leading-relaxed">
              <p>{product.description}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-xs uppercase tracking-wider font-bold text-dark-brown mb-3">Composição Aromática</h3>
              <div className="flex flex-wrap gap-2">
                {product.scents.map((scent, i) => (
                  <span key={i} className="bg-high-blush/60 text-dark-brown text-xs font-medium px-3 py-1.5 rounded-full border border-high-blush/20">
                    ☘️ {scent}
                  </span>
                ))}
              </div>
            </div>

            {product.details && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-left bg-soft-blush/60 p-5 rounded-2xl border border-high-blush/30 mb-8">
                {product.details.weight && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-full text-primary shadow-xs">
                      <Scale className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[9px] uppercase text-muted-brown tracking-wider">Peso</p>
                      <p className="text-xs font-bold text-dark-brown">{product.details.weight}</p>
                    </div>
                  </div>
                )}
                {product.details.burnTime && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-full text-primary shadow-xs">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[9px] uppercase text-muted-brown tracking-wider">Queima</p>
                      <p className="text-xs font-bold text-dark-brown">{product.details.burnTime}</p>
                    </div>
                  </div>
                )}
                {product.details.essenceStrength && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-full text-primary shadow-xs">
                      <Flame className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[9px] uppercase text-muted-brown tracking-wider">Intensidade</p>
                      <p className="text-xs font-bold text-dark-brown">{product.details.essenceStrength}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* CTA */}
            <div className="mt-auto">
              <WhatsAppCTA
                productName={product.name}
                price={product.price}
                className="w-full sm:w-auto"
              >
                Orçar no WhatsApp
              </WhatsAppCTA>
              <p className="text-[10px] text-muted-brown mt-3">
                * As encomendas são personalizadas e finalizadas por WhatsApp. Clique no botão acima para nos enviar uma mensagem.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
