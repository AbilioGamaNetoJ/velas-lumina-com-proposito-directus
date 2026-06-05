/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { X, ShoppingCart, Sparkles, Flame, Scale } from 'lucide-react';
import { Product } from '@/types/types';
import { buildWhatsAppURL } from '@/lib/whatsapp';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={className} fill="currentColor">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
    </svg>
  );
}

export default function ProductDetailModal({ product, onClose, onAddToCart }: ProductDetailModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number>(0);

  useEffect(() => {
    if (product) {
      setActiveIndex(0);
    }
  }, [product]);

  if (!product) return null;

  const allImages = [product.image, ...(product.gallery || [])];
  const activeImage = allImages[activeIndex];

  const whatsappUrl = buildWhatsAppURL({ productName: product.name, price: product.price });

  const goTo = (idx: number) => setActiveIndex(Math.max(0, Math.min(idx, allImages.length - 1)));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) < 50) return;
    if (delta < 0) goTo(activeIndex + 1);
    else goTo(activeIndex - 1);
  };

  return (
      <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">

          {/* Backdrop blur overlay */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-dark-brown/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Centering trick */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          {/* Modal Container */}
          <div
            className="relative z-10 inline-block align-middle bg-warm-bg rounded-3xl text-left overflow-hidden shadow-2xl transform my-8 sm:max-w-3xl w-full border border-high-blush/40 animate-scale-in"
          >
            {/* Close button top right */}
            <button
              id="modal-close-btn"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 text-muted-brown hover:text-primary rounded-full bg-white/80 hover:bg-white transition-all shadow-md cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">

              {/* Left Column: Gallery */}
              <div className="relative md:h-full bg-soft-blush flex flex-col">

                {/* Main Image with swipe support */}
                <div
                  className="relative flex-1 aspect-square md:aspect-auto md:min-h-0 select-none"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <img
                    src={activeImage}
                    alt={product.name}
                    id="modal-product-img"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                    draggable={false}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/40 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-6 left-6 text-left text-white hidden md:block">
                    <p className="font-editorial text-2xl font-bold">{product.name}</p>
                    <p className="text-white/80 text-xs">{product.subtitle}</p>
                  </div>

                  {/* Dot indicators — mobile only */}
                  {allImages.length > 1 && (
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center items-center gap-1.5 md:hidden pointer-events-none">
                      {allImages.map((_, idx) => (
                        <span
                          key={idx}
                          className={`block rounded-full bg-white transition-all duration-300 ${idx === activeIndex ? 'w-3 h-1.5 opacity-100' : 'w-1.5 h-1.5 opacity-50'}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Thumbnails — horizontal strip below main image */}
                {allImages.length > 1 && (
                  <div className="flex gap-2 p-3 overflow-x-auto bg-white/50 backdrop-blur-sm shrink-0">
                    {allImages.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => goTo(idx)}
                        className={`relative shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${idx === activeIndex ? 'border-primary shadow-md opacity-100' : 'border-transparent opacity-55 hover:opacity-90'}`}
                      >
                        <img src={imgUrl} alt={`${product.name} miniatura ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Product details */}
              <div className="p-6 sm:p-8 flex flex-col justify-between">
                <div className="space-y-6">

                  {/* Category and Title */}
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-2 inline-block">
                      {product.category}
                    </span>
                    <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-dark-brown">
                      {product.name}
                    </h2>
                    <div className="mt-1">
                      <span className="text-[10px] uppercase tracking-widest text-muted-brown/60 block">A partir de</span>
                      <p className="font-editorial text-2xl font-bold text-primary">
                        R$ {product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Narrative description */}
                  <div className="text-left">
                    <h3 className="text-xs uppercase tracking-wider font-bold text-dark-brown mb-2 flex items-center gap-2">
                      <span className="w-3 h-px bg-accent-gold inline-block" />
                      Sobre esta essência
                    </h3>
                    <p className="text-muted-brown text-sm sm:text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Product details mini-grid */}
                  {product.details && (product.details.weight || product.details.burnTime) && (
                    <div className="grid grid-cols-2 gap-2">
                      {product.details.weight && (
                        <div className="bg-soft-blush rounded-xl p-3 flex items-center gap-2">
                          <Scale className="w-3.5 h-3.5 text-primary/60 shrink-0" />
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-muted-brown/70">Peso</p>
                            <p className="text-xs font-semibold text-dark-brown">{product.details.weight}</p>
                          </div>
                        </div>
                      )}
                      {product.details.burnTime && (
                        <div className="bg-soft-blush rounded-xl p-3 flex items-center gap-2">
                          <Flame className="w-3.5 h-3.5 text-primary/60 shrink-0" />
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-muted-brown/70">Queima</p>
                            <p className="text-xs font-semibold text-dark-brown">{product.details.burnTime}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Scent profiles */}
                  <div className="text-left">
                    <h3 className="text-xs uppercase tracking-wider font-bold text-dark-brown mb-2 flex items-center gap-2">
                      <span className="w-3 h-px bg-accent-gold inline-block" />
                      Composição Aromática
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.scents.map((scent, i) => (
                        <span key={i} className="bg-soft-blush border border-primary/15 text-muted-brown text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-accent-gold shrink-0" />
                          {scent}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Footer buttons */}
                <div className="mt-8">
                  <div className="w-full h-px mb-4 bg-gradient-to-r from-transparent via-high-blush to-transparent" />
                  <div className="flex flex-col sm:flex-row gap-3">

                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onClose();
                    }}
                    className="flex-1 flex items-center justify-center gap-2.5 bg-primary hover:bg-primary-dark text-white font-medium text-sm tracking-wide py-3.5 px-4 rounded-xl shadow-ambient hover:shadow-ambient-hover transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4 shrink-0" />
                    <span>Adicionar ao Carrinho</span>
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2.5 border border-emerald-700/25 bg-emerald-50/40 hover:bg-emerald-50 hover:border-emerald-700/50 text-emerald-800 font-medium text-sm tracking-wide py-3.5 px-4 rounded-xl transition-all duration-200"
                  >
                    <WhatsAppIcon className="w-4 h-4 shrink-0" />
                    <span>Comprar no WhatsApp</span>
                  </a>

                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
  );
}
