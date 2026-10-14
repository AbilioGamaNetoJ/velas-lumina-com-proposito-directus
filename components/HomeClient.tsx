/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedSection from '@/components/FeaturedSection';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';
import HowItWorks from '@/components/HowItWorks';
import FaqSection from '@/components/Faq';
import ProductCarousel from '@/components/ProductCarousel';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { useCartContext } from '@/components/CartContext';
import { Product, Category, Faq } from '@/types/types';
import { getStartingPrice } from '@/lib/quantities';
import { Search, AlertCircle, ArrowRight, X } from 'lucide-react';

export default function HomeClient({
  products,
  categories,
  faqs,
}: {
  products: Product[];
  categories: Category[];
  faqs: Faq[];
}) {
  // Filtering & Catalog states
  const [activeCategory, setActiveCategory] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const { cartItems, updateQuantity, removeItem, cartCount, isCartOpen, openCart, closeCart } = useCartContext();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGoToSection = (id: string) => {
    if (id === 'contato') {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // height of sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Filter products list based on search and selected filter tab
  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'todas' || p.category === activeCategory;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const searchResults = searchQuery.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <div className="bg-warm-bg min-h-screen flex flex-col font-sans select-none antialiased">
      
      {/* Sticky frosted header */}
      <Header
        cartCount={cartCount}
        onOpenCart={openCart}
        onGoToSection={handleGoToSection}
      />

      {/* Main Container */}
      <main className="flex-grow">

        {/* Hero Section */}
        <Hero onExplore={() => handleGoToSection('produtos')} />

        {/* Dynamic Featured Section (products with featured: true) */}
        <FeaturedSection featuredProducts={products.filter(p => p.featured)} />

        {/* Collection Section */}
        <section id="produtos" className="py-20 bg-white relative">
          
          <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header intro */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full inline-block mb-3">
                Coleção Florescer
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-dark-brown">
                Nossas Essências Autorais
              </h2>
              <p className="text-muted-brown text-sm sm:text-base mt-2">
                Descubra misturas harmoniosas esculpidas em flores finas, preparadas com cerâmica de colina e ceras puramente botânicas.
              </p>
            </div>

            {/* Dynamic filter bar and search panels */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-10">
              
              {/* Category tabs - Segmented Control */}
              <div className="flex w-full md:w-auto p-1 bg-high-blush/10 rounded-full border border-high-blush/20">
                {[{ slug: 'todas', name: 'Todas' }, ...categories].map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`flex-1 md:flex-none px-5 py-2.5 text-[10px] sm:text-xs font-bold tracking-widest uppercase rounded-full transition-all duration-300 cursor-pointer ${
                      activeCategory === cat.slug
                        ? 'bg-white text-primary shadow-sm ring-1 ring-black/5'
                        : 'bg-transparent text-muted-brown hover:text-primary'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Instant Search textbox with dynamic dropdown */}
              <div ref={searchRef} className="relative w-full md:w-80 group z-30">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-brown/50 group-focus-within:text-primary transition-colors duration-300 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchFocused(true);
                  }}
                  placeholder="Buscar essências..."
                  className="w-full pl-11 pr-10 py-2.5 bg-white text-dark-brown text-sm rounded-full border border-high-blush/30 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 placeholder:text-muted-brown/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setIsSearchFocused(false);
                    }}
                    aria-label="Limpar pesquisa"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-muted-brown/50 hover:text-primary rounded-full transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Dynamic live search dropdown */}
                {isSearchFocused && searchQuery.trim() !== '' && (
                  <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl border border-high-blush/40 shadow-xl overflow-hidden py-2 z-50">
                    {searchResults.length > 0 ? (
                      <div>
                        <div className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-brown/70 border-b border-high-blush/20">
                          Sugestões ({searchResults.length})
                        </div>
                        {searchResults.map((product) => (
                          <Link
                            key={product.id}
                            href={`/produtos/${product.id}`}
                            onClick={() => setIsSearchFocused(false)}
                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-soft-blush/60 transition-colors group/item"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded-lg shrink-0 border border-high-blush/30"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-dark-brown group-hover/item:text-primary transition-colors truncate">
                                {product.name}
                              </p>
                              <p className="text-xs text-muted-brown truncate">
                                {product.subtitle || product.category}
                              </p>
                            </div>
                            <span className="text-xs font-bold text-primary shrink-0 text-right">
                              <span className="block text-[10px] font-normal text-muted-brown">a partir de</span>
                              R$ {getStartingPrice(product).toFixed(2)}
                            </span>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="px-4 py-4 text-center">
                        <p className="text-xs text-muted-brown">Nenhum resultado para "{searchQuery}"</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>

            {/* Catalog Grid output */}
            {filteredProducts.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 max-w-sm mx-auto">
                <AlertCircle className="w-12 h-12 text-primary opacity-55 stroke-1" />
                <div>
                  <p className="font-editorial text-lg font-bold text-dark-brown">Nenhum resultado encontrado</p>
                  <p className="text-muted-brown text-xs mt-1">Nenhum aroma ou combinação confere com sua busca "{searchQuery}". Tente usar termos como "Lavanda", "Mel" ou "Margarida".</p>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('todas');
                  }}
                  className="text-xs uppercase font-bold tracking-wider bg-soft-blush text-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  Limpar Filtros
                </button>
              </div>
            ) : (
              <ProductCarousel>
                  {filteredProducts.map((prod) => (
                    <div className="h-full" key={prod.id}>
                      <ProductCard product={prod} />
                    </div>
                  ))}
              </ProductCarousel>
            )}

          </div>

        </section>

        <HowItWorks />

        <FaqSection faqs={faqs} />

      </main>

      {/* Persistent Sticky Contact details & footer */}
      <Footer onGoToSection={handleGoToSection} />

      {/* Sliding Bag drawer panel */}
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
