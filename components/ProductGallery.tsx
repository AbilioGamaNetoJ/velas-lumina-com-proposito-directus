/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import { useRef, useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  outOfStock?: boolean;
}

export default function ProductGallery({ images, productName, outOfStock }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number>(0);

  const activeImage = images[activeIndex];

  const goTo = (idx: number) => setActiveIndex(Math.max(0, Math.min(idx, images.length - 1)));

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
    <div className="relative md:h-full bg-soft-blush flex flex-col">
      {/* Main image with swipe support */}
      <div
        className="relative flex-1 aspect-square md:aspect-auto md:min-h-0 select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={activeImage}
          alt={productName}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${outOfStock ? 'grayscale' : ''}`}
          draggable={false}
        />

        {outOfStock && <div className="absolute inset-0 bg-dark-brown/25 pointer-events-none" />}

        {/* Dot indicators — mobile only */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center items-center gap-1.5 md:hidden pointer-events-none">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`block rounded-full bg-white transition-all duration-300 ${idx === activeIndex ? 'w-3 h-1.5 opacity-100' : 'w-1.5 h-1.5 opacity-50'}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails — horizontal strip below main image */}
      {images.length > 1 && (
        <div className="flex gap-3 p-4 overflow-x-auto bg-white/50 backdrop-blur-sm shrink-0">
          {images.map((imgUrl, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`relative shrink-0 w-16 h-16 rounded-md overflow-hidden transition-all duration-300 cursor-pointer ${idx === activeIndex ? 'ring-1 ring-primary ring-offset-2 opacity-100' : 'opacity-50 hover:opacity-100'}`}
            >
              <img
                src={imgUrl}
                alt={`${productName} miniatura ${idx + 1}`}
                className={`w-full h-full object-cover ${outOfStock ? 'grayscale' : ''}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
