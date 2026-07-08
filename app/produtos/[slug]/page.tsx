import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProducts, getProductBySlug } from '@/lib/directus/get-products';
import { getSiteSettings } from '@/lib/directus/get-site-settings';
import { SiteSettingsProvider } from '@/components/SiteSettingsContext';
import ProductPageClient from '@/components/ProductPageClient';

export const revalidate = 3600;

const SITE_URL = process.env.SITE_URL || 'https://velasartesanais.luminacomproposito.com.br';

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

  const productUrl = `${SITE_URL}/produtos/${resolvedParams.slug}`;
  const ogImage = product.image || `${SITE_URL}/images/lumina-velas.jpeg`;

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: productUrl,
      title: product.name,
      description: product.description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: product.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [ogImage],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const [product, settings, allProducts] = await Promise.all([
    getProductBySlug(resolvedParams.slug),
    getSiteSettings(),
    getProducts(),
  ]);

  if (!product) {
    notFound();
  }

  const sameCategory = allProducts.filter((p) => p.id !== product.id && p.category === product.category);
  const otherProducts = allProducts.filter((p) => p.id !== product.id && p.category !== product.category);
  const relatedProducts = [...sameCategory, ...otherProducts].slice(0, 4);

  const productUrl = `${SITE_URL}/produtos/${product.id}`;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: settings.brand_name,
    },
    offers: {
      '@type': 'Offer',
      price: product.price.toFixed(2),
      priceCurrency: 'BRL',
      availability: product.inStock === false
        ? 'https://schema.org/OutOfStock'
        : 'https://schema.org/InStock',
      url: productUrl,
      seller: {
        '@type': 'Organization',
        name: settings.brand_name,
      },
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Início',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Produtos',
        item: `${SITE_URL}/#produtos`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <SiteSettingsProvider settings={settings}>
        <ProductPageClient product={product} relatedProducts={relatedProducts} />
      </SiteSettingsProvider>
    </>
  );
}
