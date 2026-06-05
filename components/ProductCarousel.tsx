"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCarouselProps {
  children: React.ReactNode;
}

export default function ProductCarousel({ children }: ProductCarouselProps) {
  const [isClient, setIsClient] = useState(false);
  const plugins = React.useMemo(() => [Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })], []);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start', 
    loop: true,
    skipSnaps: false,
    dragFree: true
  }, plugins);

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    setIsClient(true);

    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y -ml-4 sm:-ml-6 lg:-ml-8">
          {React.Children.map(children, (child) => (
            <div className="flex-[0_0_85%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_25%] pl-4 sm:pl-6 lg:pl-8 min-w-0">
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {isClient && (
        <>
          <button
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            className="absolute top-1/2 -left-4 -translate-y-1/2 w-10 h-10 bg-white/90 shadow-md text-primary rounded-full flex items-center justify-center disabled:opacity-0 transition-opacity hidden md:flex cursor-pointer hover:bg-white border border-high-blush/20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            className="absolute top-1/2 -right-4 -translate-y-1/2 w-10 h-10 bg-white/90 shadow-md text-primary rounded-full flex items-center justify-center disabled:opacity-0 transition-opacity hidden md:flex cursor-pointer hover:bg-white border border-high-blush/20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === selectedIndex ? 'bg-primary scale-125' : 'bg-high-blush'
                }`}
                aria-label={`Ir para o slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
