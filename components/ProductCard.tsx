/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Eye, Flame, PackageX, Bell } from 'lucide-react';
import { Product } from '@/types/types';
import Link from 'next/link';
import { buildWhatsAppURL } from '@/lib/whatsapp';
import { useSiteSettings } from '@/components/SiteSettingsContext';
import { getStartingPrice } from '@/lib/quantities';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const settings = useSiteSettings();
  const soldOut = product.inStock === false;
  const notifyMeUrl = buildWhatsAppURL({ productName: product.name, notifyMe: true, number: settings.whatsapp_number });

  return (
    <div
      id={`product-card-${product.id}`}
      className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] border border-primary/15 hover:shadow-ambient hover:-translate-y-1 transition-all duration-500 group flex flex-col h-full"
    >
      {/* Product Image Stage */}
      {/* Capas são fixas em 1064x1600 (~2:3) — manter aspect-[2/3] ou object-cover corta a moldura/texto do pôster */}
      <Link href={`/produtos/${product.id}`} className="relative aspect-[2/3] overflow-hidden bg-soft-blush cursor-pointer block">
        <div className="w-full h-full animate-image-scale-down">
          <img
            src={product.image}
            alt={product.name}
            id={`product-img-${product.id}`}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out ${soldOut ? 'grayscale' : ''}`}
            loading="lazy"
          />
        </div>

        {/* Sold-out dark overlay */}
        {soldOut && <div className="absolute inset-0 bg-dark-brown/25" />}

        {/* Status pill badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-col items-start gap-1.5">
          {product.featured && (
            <div className="bg-primary text-white font-semibold text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs">
              <Flame className="w-3 h-3 fill-white" />
              Destaque
            </div>
          )}
          {soldOut && (
            <div className="bg-dark-brown text-white font-semibold text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs">
              <PackageX className="w-3 h-3" />
              Esgotado
            </div>
          )}
        </div>

        {/* Quick view affordance */}
        <div className="absolute inset-0 bg-dark-brown/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="p-4 bg-white text-primary rounded-full shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-all duration-300">
            <Eye className="w-5 h-5" />
          </div>
        </div>
      </Link>

      {/* Product details */}
      <div className="p-6 md:p-8 flex flex-col flex-grow text-left">

        {/* Category Label */}
        <span className="text-[9px] uppercase tracking-widest font-bold text-primary/70 mb-3 block">
          {product.category}
        </span>

        {/* Product Title / Link */}
        <Link
          href={`/produtos/${product.id}`}
          className="font-editorial text-xl sm:text-2xl font-bold text-dark-brown hover:text-primary transition-colors cursor-pointer line-clamp-1 mb-2"
        >
          {product.name}
        </Link>

        {/* Price */}
        <div className="text-primary font-medium text-base mb-3">
          <span className="text-xs font-normal text-muted-brown">a partir de</span>{' '}
          R$ {getStartingPrice(product).toFixed(2)}
        </div>

        {/* Subtitle / Essence */}
        <p className="text-muted-brown/90 text-sm mb-6 flex-grow line-clamp-2 leading-relaxed">
          {product.subtitle}
        </p>

        {/* CTA Purchase button */}
        {soldOut ? (
          <a
            href={notifyMeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 border border-dark-brown/20 hover:border-dark-brown text-dark-brown hover:bg-dark-brown hover:text-white px-4 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            Avise-me
          </a>
        ) : (
          <Link
            href={`/produtos/${product.id}`}
            className="w-full flex items-center justify-center gap-2 border border-primary/20 hover:border-primary text-primary hover:bg-primary hover:text-white px-4 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer"
          >
            Escolher Quantidade
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
