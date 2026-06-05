/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import ProductCarousel from '@/components/ProductCarousel';
import { Product } from '@/types/types';
import { Flame } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface Props {
  featuredProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function FeaturedSection({ featuredProducts, onSelectProduct, onAddToCart }: Props) {
  const [currentMonth, setCurrentMonth] = useState('');

  useEffect(() => {
    const month = new Date().toLocaleString('pt-BR', { month: 'long' });
    setCurrentMonth(month);
  }, []);

  if (!featuredProducts || featuredProducts.length === 0) return null;

  return (
    <section className="py-20 bg-primary/5 border-y border-primary/10 relative overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-full bg-white/40 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Flame className="w-4 h-4 text-primary" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-primary">
              Seleção Especial
            </span>
            <Flame className="w-4 h-4 text-primary" />
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl font-bold text-dark-brown">
            Destaques do mês de {currentMonth}
          </h2>
          <p className="text-muted-brown text-sm sm:text-base mt-4 max-w-xl mx-auto">
            Uma curadoria exclusiva de velas e arranjos em evidência neste mês. 
            Disponibilidade limitada.
          </p>
        </div>

        <ProductCarousel>
          {featuredProducts.map((prod, index) => (
            <ScrollReveal 
              animation="fade-in-up" 
              delay={index * 150}
              className="h-full"
              key={`featured-${prod.id}`}
            >
              <ProductCard 
                product={prod} 
                onSelect={onSelectProduct} 
                onAddToCart={onAddToCart} 
              />
            </ScrollReveal>
          ))}
        </ProductCarousel>

      </div>
    </section>
  );
}
