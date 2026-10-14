/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronDown, ArrowLeft, Flame, ShoppingCart, Bell, PackageX } from 'lucide-react';
import { Product, QuantityOption } from '@/types/types';
import { useCartContext } from '@/components/CartContext';
import { buildWhatsAppURL } from '@/lib/whatsapp';
import { formatUnits, getMinQuantity, getQuantityOptions, resolveQuantityOption } from '@/lib/quantities';
import { useSiteSettings } from '@/components/SiteSettingsContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ProductGallery from '@/components/ProductGallery';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import ProductCard from '@/components/ProductCard';
import FromPriceLabel from '@/components/FromPriceLabel';

const CUSTOM_QUANTITY_KEY = 'personalizada';

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

  const quantityOptions = getQuantityOptions(product);
  const minQuantity = getMinQuantity(product);
  const [selectedKey, setSelectedKey] = useState<string>(quantityOptions[0].quantity);
  const [customInput, setCustomInput] = useState('');

  const isCustom = selectedKey === CUSTOM_QUANTITY_KEY;
  const hasCustomInput = customInput.trim() !== '';
  const selectedQuantity: QuantityOption | null = isCustom
    ? hasCustomInput ? resolveQuantityOption(product, Number(customInput)) : null
    : quantityOptions.find((q) => q.quantity === selectedKey) ?? null;
  const customError = isCustom && hasCustomInput && !selectedQuantity
    ? Number.isInteger(Number(customInput))
      ? `A quantidade mínima para este produto é de ${formatUnits(minQuantity)}.`
      : 'Informe um número inteiro de unidades.'
    : null;

  const specs: { label: string; value: string }[] = [
    product.details?.dimensions ? { label: 'Tamanho:', value: product.details.dimensions } : null,
    product.details?.weight ? { label: 'Gramatura:', value: product.details.weight } : null,
    product.details?.burnTime ? { label: 'Queima:', value: product.details.burnTime } : null,
    { label: 'Aroma:', value: 'Personalizado' },
    product.productDescription ? { label: 'Descrição do Produto:', value: product.productDescription } : null,
  ].filter((s): s is { label: string; value: string } => s !== null);

  const whatsappMessage = selectedQuantity
    ? `Olá! Tenho interesse no produto: *${product.name}* (${formatUnits(selectedQuantity.quantity)} - a partir de R$ ${selectedQuantity.price.toFixed(2)}, valor sujeito a confirmação). Poderia me dar mais informações?`
    : undefined;

  const handleGoToSection = (id: string) => {
    router.push(`/#${id}`);
  };

  return (
    <div className="bg-warm-bg min-h-screen flex flex-col font-sans antialiased pt-20">
      <Header cartCount={cartCount} onOpenCart={openCart} onGoToSection={handleGoToSection} />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-muted-brown mb-8" aria-label="Breadcrumb">
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
        <Link href="/#produtos" className="inline-flex items-center text-sm font-semibold text-primary hover:text-dark-brown transition-colors mb-6 uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar para Catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Image Gallery Column */}
          <div className="flex flex-col gap-6">
            {/* Mesma proporção de capa do ProductCard.tsx (1064x1600, ~2:3) */}
            <div className="relative rounded-3xl overflow-hidden shadow-ambient aspect-[2/3]">
              <ProductGallery images={allImages} productName={product.name} outOfStock={soldOut} />
            </div>

            {specs.length > 0 && (
              <div className="bg-white rounded-2xl border border-high-blush/30 p-6">
                {specs.map((spec, i) => (
                  <div key={spec.label} className={i > 0 ? 'mt-5' : ''}>
                    <p className="text-xs uppercase tracking-wider font-bold text-dark-brown">{spec.label}</p>
                    <p className="text-sm text-muted-brown mt-1 leading-relaxed whitespace-pre-line">{spec.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Column */}
          <div className="flex flex-col">
            {/* Category + status badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs uppercase font-bold tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full inline-block w-fit">
                {product.category}
              </span>
              {product.featured && (
                <span className="text-xs uppercase font-bold tracking-widest text-white bg-primary px-2.5 py-1 rounded-md flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-white" />
                  Destaque
                </span>
              )}
              {soldOut && (
                <span className="text-xs uppercase font-bold tracking-widest text-white bg-dark-brown px-2.5 py-1 rounded-md flex items-center gap-1">
                  <PackageX className="w-3 h-3" />
                  Esgotado
                </span>
              )}
            </div>

            <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-dark-brown mb-2 leading-tight">
              {product.name}
            </h1>
            <div className="mb-6">
              <p className="text-xl text-primary font-bold">
                {selectedQuantity ? (
                  <>
                    <FromPriceLabel className="text-sm" />{' '}
                    R$ {selectedQuantity.price.toFixed(2)}
                  </>
                ) : (
                  <span className="text-base font-normal text-muted-brown">Informe a quantidade desejada</span>
                )}
              </p>
              <p className="text-sm text-muted-brown mt-1">
                Valor inicial, que pode variar conforme sua encomenda. O valor final é confirmado pelo WhatsApp.
              </p>
            </div>

            <div className="prose prose-sm text-muted-brown mb-6 leading-relaxed">
              <p>{product.description}</p>
            </div>

            <div className="mb-6">
              <label htmlFor="quantity-select" className="text-sm uppercase tracking-wider font-bold text-dark-brown block">
                Quantidade
              </label>
              <p className="text-sm text-muted-brown mt-1 mb-3">
                Quantidade mínima: <strong className="text-dark-brown">{formatUnits(minQuantity)}</strong>
              </p>
              <div className="relative w-full sm:max-w-md">
                <select
                  id="quantity-select"
                  value={selectedKey}
                  onChange={(e) => setSelectedKey(e.target.value)}
                  className="w-full appearance-none bg-soft-blush border border-primary/15 text-dark-brown text-sm font-semibold rounded-xl px-4 py-3.5 pr-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  {quantityOptions.map((opt) => (
                    <option key={opt.quantity} value={opt.quantity}>
                      {formatUnits(opt.quantity)} — a partir de R$ {opt.price.toFixed(2)}
                    </option>
                  ))}
                  <option value={CUSTOM_QUANTITY_KEY}>Quantidade personalizada</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
              </div>

              {isCustom && (
                <div className="mt-3 w-full sm:max-w-md">
                  <label htmlFor="custom-quantity" className="text-sm font-semibold text-dark-brown mb-1.5 block">
                    Quantas unidades você precisa?
                  </label>
                  <input
                    id="custom-quantity"
                    type="number"
                    inputMode="numeric"
                    min={minQuantity}
                    step={1}
                    autoFocus
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder={`Mínimo ${minQuantity}`}
                    aria-invalid={customError ? true : undefined}
                    aria-describedby="custom-quantity-help"
                    className={`w-full bg-soft-blush border text-dark-brown text-sm font-semibold rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 ${customError ? 'border-red-600 focus:ring-red-600/30' : 'border-primary/15 focus:ring-primary/40'}`}
                  />
                  <p
                    id="custom-quantity-help"
                    role={customError ? 'alert' : undefined}
                    className={`text-sm mt-1.5 ${customError ? 'text-red-600 font-semibold' : 'text-muted-brown'}`}
                  >
                    {customError ?? `Digite qualquer quantidade a partir de ${formatUnits(minQuantity)}.`}
                  </p>
                </div>
              )}
            </div>

            {/* CTA buttons placed immediately below Quantity */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {soldOut ? (
                  <a
                    href={notifyMeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2.5 bg-dark-brown hover:bg-dark-brown/90 text-white font-bold text-sm tracking-widest uppercase py-4 px-4 rounded-full shadow-ambient hover:shadow-ambient-hover transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                  >
                    <Bell className="w-4 h-4 shrink-0" />
                    <span>Avise-me</span>
                  </a>
                ) : (
                  <button
                    onClick={() => selectedQuantity && addToCart(product, selectedQuantity)}
                    disabled={!selectedQuantity}
                    className="flex-1 flex items-center justify-center gap-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-sm tracking-widest uppercase py-4 px-4 rounded-full shadow-ambient hover:shadow-ambient-hover transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:pointer-events-none disabled:hover:translate-y-0"
                  >
                    <ShoppingCart className="w-4 h-4 shrink-0" />
                    <span>Adicionar à Cesta</span>
                  </button>
                )}

                <WhatsAppCTA productName={product.name} customMessage={whatsappMessage} disabled={!selectedQuantity} className="flex-1">
                  Orçar no WhatsApp
                </WhatsAppCTA>
              </div>

              <p className="text-sm text-muted-brown mt-3">
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
                className="hidden sm:inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-primary hover:text-primary-dark transition-colors shrink-0"
              >
                Ver coleção completa
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {relatedProducts.map((related) => (
                <ProductCard key={related.id} product={related} />
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
