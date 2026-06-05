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
      className="bg-white rounded-2xl overflow-hidden hover:shadow-ambient hover:-translate-y-1 transition-all duration-500 group flex flex-col h-full border border-high-blush/20"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-square overflow-hidden bg-soft-blush cursor-pointer" onClick={() => onSelect(product)}>
        <div className="w-full h-full animate-image-scale-down">
          <img 
            src={product.image} 
            alt={product.name} 
            id={`product-img-${product.id}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        </div>

        {/* Featured candle pill badge */}
        {product.featured && (
          <div className="absolute top-3.5 left-3.5 bg-primary text-white font-semibold text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs">
            <Flame className="w-3 h-3 fill-white" />
            Destaque
          </div>
        )}

        {/* Quick view icon click area */}
        <div className="absolute inset-0 bg-dark-brown/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="p-4 bg-white text-primary hover:bg-primary hover:text-white rounded-full shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
            title="Ver detalhes"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product details */}
      <div className="p-6 md:p-8 flex flex-col flex-grow text-left">
        
        {/* Category Label */}
        <span className="text-[9px] uppercase tracking-widest font-bold text-primary/70 mb-3 block">
          {product.category}
        </span>

        {/* Product Title / Link */}
        <Link 
          href={`/produtos/${product.id}`}
          onClick={(e) => {
            e.preventDefault();
            onSelect(product);
          }}
          className="font-editorial text-xl sm:text-2xl font-bold text-dark-brown hover:text-primary transition-colors cursor-pointer line-clamp-1 mb-2"
        >
          {product.name}
        </Link>

        {/* Price */}
        <div className="text-primary font-medium text-base mb-3">
          R$ {product.price.toFixed(2)}
        </div>

        {/* Subtitle / Essence */}
        <p className="text-muted-brown/90 text-sm mb-4 flex-grow line-clamp-2 leading-relaxed">
          {product.subtitle}
        </p>

        {/* Scent text listing */}
        <div className="text-muted-brown/70 text-[10px] font-medium tracking-wider uppercase mb-6">
          {product.scents.slice(0, 2).join(' • ')}
        </div>

        {/* CTA Purchase button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="w-full flex items-center justify-center gap-2 border border-primary/20 hover:border-primary text-primary hover:bg-primary hover:text-white px-4 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          Adicionar
        </button>
      </div>
    </div>
  );
}
