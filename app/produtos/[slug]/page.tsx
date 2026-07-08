import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProducts, getProductBySlug } from '@/lib/directus/get-products';
import { getSiteSettings } from '@/lib/directus/get-site-settings';
import { SiteSettingsProvider } from '@/components/SiteSettingsContext';
import ProductPageClient from '@/components/ProductPageClient';

export const revalidate = 3600;

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
      availability: product.inStock === false
        ? 'https://schema.org/OutOfStock'
        : 'https://schema.org/InStock',
      url: `https://velasartesanais.luminacomproposito.com.br/produtos/${product.id}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteSettingsProvider settings={settings}>
        <ProductPageClient product={product} relatedProducts={relatedProducts} />
      </SiteSettingsProvider>
    </>
  );
}
