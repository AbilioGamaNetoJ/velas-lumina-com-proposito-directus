/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  outOfStock?: boolean;
}

export default function ProductGallery({ images, productName, outOfStock }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number>(0);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeImage = images[activeIndex];

  const goTo = (idx: number) => {
    const nextIdx = Math.max(0, Math.min(idx, images.length - 1));
    setActiveIndex(nextIdx);
    thumbnailRefs.current[nextIdx]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

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
    <div className="relative h-full bg-soft-blush flex flex-col">
      {/* Main image with swipe support */}
      <div
        className="relative flex-1 min-h-0 select-none overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={activeImage}
          alt={productName}
          className={`w-full h-full object-cover transition-opacity duration-300 ${outOfStock ? 'grayscale' : ''}`}
          draggable={false}
        />

        {outOfStock && <div className="absolute inset-0 bg-dark-brown/25 pointer-events-none" />}

        {/* Previous / Next buttons for easy desktop & mobile tap */}
        {images.length > 1 && (
          <>
            {activeIndex > 0 && (
              <button
                onClick={() => goTo(activeIndex - 1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/70 hover:bg-white text-dark-brown flex items-center justify-center backdrop-blur-sm transition-all shadow-sm"
                aria-label="Imagem anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {activeIndex < images.length - 1 && (
              <button
                onClick={() => goTo(activeIndex + 1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/70 hover:bg-white text-dark-brown flex items-center justify-center backdrop-blur-sm transition-all shadow-sm"
                aria-label="Próxima imagem"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </>
        )}

        {/* Dot indicators — mobile only */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center items-center gap-1.5 md:hidden pointer-events-none z-10">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`block rounded-full transition-all duration-300 shadow-sm ${
                  idx === activeIndex ? 'w-4 h-1.5 bg-primary opacity-100' : 'w-1.5 h-1.5 bg-white opacity-70'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails — horizontal scroll strip below main image */}
      {images.length > 1 && (
        <div className="relative shrink-0 bg-white/60 backdrop-blur-sm border-t border-high-blush/30">
          <div className="flex gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-3 overflow-x-auto no-scrollbar snap-x snap-mandatory items-center">
            {images.map((imgUrl, idx) => (
              <button
                key={idx}
                ref={(el) => {
                  thumbnailRefs.current[idx] = el;
                }}
                onClick={() => goTo(idx)}
                className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden snap-start transition-all duration-300 cursor-pointer ${
                  idx === activeIndex
                    ? 'ring-2 ring-primary ring-offset-1 opacity-100 scale-105 shadow-sm'
                    : 'opacity-60 hover:opacity-100'
                }`}
                aria-label={`Ver imagem ${idx + 1} de ${images.length}`}
              >
                <img
                  src={imgUrl}
                  alt={`${productName} miniatura ${idx + 1}`}
                  className={`w-full h-full object-cover ${outOfStock ? 'grayscale' : ''}`}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

