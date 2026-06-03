/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShoppingBag, Eye, Heart, Flame } from 'lucide-react';
import { Product } from '@/types/types';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onSelect, onAddToCart }: ProductCardProps) {
  return (
    <div 
      id={`product-card-${product.id}`}
      className="bg-white rounded-2xl overflow-hidden shadow-ambient hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col h-full border border-high-blush/30"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-square overflow-hidden bg-soft-blush overflow-hidden cursor-pointer" onClick={() => onSelect(product)}>
        <img 
          src={product.image} 
          alt={product.name} 
          id={`product-img-${product.id}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Floating price badge overlay */}
        <div className="absolute top-3.5 right-3.5 bg-white/90 backdrop-blur-xs text-primary font-medium text-xs tracking-wider px-3 py-1.5 rounded-full border border-high-blush/30 shadow-xs">
          R$ {product.price.toFixed(2)}
        </div>

        {/* Featured candle pill badge */}
        {product.featured && (
          <div className="absolute top-3.5 left-3.5 bg-primary text-white font-semibold text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs">
            <Flame className="w-3 h-3 fill-white" />
            Destaque
          </div>
        )}

        {/* Quick view icon click area */}
        <div className="absolute inset-0 bg-dark-brown/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="p-3 bg-white text-primary hover:bg-primary hover:text-white rounded-full shadow-md transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
            title="Ver detalhes"
          >
            <Eye className="w-4 h-4" />
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="p-3 bg-white text-primary hover:bg-primary hover:text-white rounded-full shadow-md transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 delay-50 cursor-pointer"
            title="Adicionar ao carrinho"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product details */}
      <div className="p-5 flex flex-col flex-grow text-left">
        
        {/* Category Label */}
        <span className="text-[10px] uppercase tracking-widest font-bold text-muted-brown bg-soft-blush/80 px-2 py-0.5 rounded-md inline-block max-w-max mb-2">
          {product.category}
        </span>

        {/* Product Title / Link */}
        <Link 
          href={`/produtos/${product.id}`}
          onClick={(e) => {
            e.preventDefault();
            onSelect(product);
          }}
          className="font-editorial text-lg font-bold text-dark-brown hover:text-primary transition-colors cursor-pointer line-clamp-1 mb-1"
        >
          {product.name}
        </Link>

        {/* Subtitle / Essence */}
        <p className="text-muted-brown text-xs mb-3 flex-grow line-clamp-2">
          {product.subtitle}
        </p>

        {/* Scent chips listing */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.scents.slice(0, 2).map((scent, idx) => (
            <span key={idx} className="bg-high-blush/30 text-dark-brown text-[9px] font-medium px-2 py-0.5 rounded-full">
              {scent}
            </span>
          ))}
        </div>

        {/* CTA Purchase button */}
        <div className="pt-2 border-t border-high-blush/30 flex items-center justify-between gap-3">
          <Link
            href={`/produtos/${product.id}`}
            onClick={(e) => {
              e.preventDefault();
              onSelect(product);
            }}
            className="text-muted-brown hover:text-primary text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            Saber Mais
          </Link>

          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center justify-center gap-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-white px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer"
          >
            Adicionar R$ {product.price.toFixed(0)}
          </button>
        </div>

      </div>
    </div>
  );
}
