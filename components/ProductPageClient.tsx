/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, ArrowLeft, Flame, Clock, Scale, ShoppingCart, Bell, PackageX, Sparkles } from 'lucide-react';
import { Product } from '@/types/types';
import { useCartContext } from '@/components/CartContext';
import { buildWhatsAppURL } from '@/lib/whatsapp';
import { useSiteSettings } from '@/components/SiteSettingsContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ProductGallery from '@/components/ProductGallery';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import ProductCard from '@/components/ProductCard';

interface ProductPageClientProps {
  product: Product;
  relatedProducts?: Product[];
}

export default function ProductPageClient({ product, relatedProducts = [] }: ProductPageClientProps) {
  const router = useRouter();
  const settings = useSiteSettings();
  const { cartItems, addToCart, updateQuantity, removeItem, cartCount, isCartOpen, openCart, closeCart } = useCartContext();

  const soldOut = product.inStock === false;
  const allImages = [product.image, ...(product.gallery || [])];
  const notifyMeUrl = buildWhatsAppURL({ productName: product.name, notifyMe: true, number: settings.whatsapp_number });

  const handleGoToSection = (id: string) => {
    router.push(`/#${id}`);
  };

  return (
    <div className="bg-warm-bg min-h-screen flex flex-col font-sans antialiased pt-20">
      <Header cartCount={cartCount} onOpenCart={openCart} onGoToSection={handleGoToSection} />

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
          <div className="relative rounded-3xl overflow-hidden shadow-ambient">
            <ProductGallery images={allImages} productName={product.name} outOfStock={soldOut} />
          </div>

          {/* Product Details Column */}
          <div className="flex flex-col">
            {/* Category + status badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full inline-block w-fit">
                {product.category}
              </span>
              {product.featured && (
                <span className="text-[10px] uppercase font-bold tracking-widest text-white bg-primary px-2.5 py-1 rounded-md flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-white" />
                  Destaque
                </span>
              )}
              {soldOut && (
                <span className="text-[10px] uppercase font-bold tracking-widest text-white bg-dark-brown px-2.5 py-1 rounded-md flex items-center gap-1">
                  <PackageX className="w-3 h-3" />
                  Esgotado
                </span>
              )}
            </div>

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
                  <span key={i} className="bg-soft-blush border border-primary/15 text-muted-brown text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-accent-gold shrink-0" />
                    {scent}
                  </span>
                ))}
              </div>
            </div>

            {product.details && (product.details.weight || product.details.burnTime || product.details.essenceStrength) && (
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

            {/* CTA buttons */}
            <div className="mt-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                {soldOut ? (
                  <a
                    href={notifyMeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2.5 bg-dark-brown hover:bg-dark-brown/90 text-white font-bold text-xs tracking-widest uppercase py-4 px-4 rounded-full shadow-ambient hover:shadow-ambient-hover transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                  >
                    <Bell className="w-4 h-4 shrink-0" />
                    <span>Avise-me</span>
                  </a>
                ) : (
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 flex items-center justify-center gap-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs tracking-widest uppercase py-4 px-4 rounded-full shadow-ambient hover:shadow-ambient-hover transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4 shrink-0" />
                    <span>Adicionar à Cesta</span>
                  </button>
                )}

                <WhatsAppCTA productName={product.name} price={product.price} className="flex-1">
                  Orçar no WhatsApp
                </WhatsAppCTA>
              </div>

              <p className="text-[10px] text-muted-brown mt-3">
                * As encomendas são personalizadas e finalizadas por WhatsApp. Clique em um dos botões acima para nos enviar uma mensagem.
              </p>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-16 border-t border-high-blush/30">
            <div className="flex items-center justify-between gap-4 mb-8">
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-dark-brown">
                Produtos Relacionados
              </h2>
              <Link
                href="/#produtos"
                className="hidden sm:inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary hover:text-primary-dark transition-colors shrink-0"
              >
                Ver coleção completa
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {relatedProducts.map((related) => (
                <ProductCard key={related.id} product={related} onAddToCart={addToCart} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer onGoToSection={handleGoToSection} />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
    </div>
  );
}
