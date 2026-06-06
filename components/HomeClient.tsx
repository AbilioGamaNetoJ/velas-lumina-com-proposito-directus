/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedSection from '@/components/FeaturedSection';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import ScrollReveal from '@/components/ScrollReveal';
import HowItWorks from '@/components/HowItWorks';
import ProductCarousel from '@/components/ProductCarousel';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { Product, CartItem } from '@/types/types';
import { Search, SlidersHorizontal, AlertCircle, ShoppingBag, ArrowRight } from 'lucide-react';

export default function HomeClient({ products }: { products: Product[] }) {
  // Navigation & Drawer states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Filtering & Catalog states
  const [activeCategory, setActiveCategory] = useState<'todas' | 'velas' | 'arranjos' | 'kits'>('todas');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Cart state — hydrates empty to avoid SSR mismatch, then loads from localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const persisted = localStorage.getItem('lumina-velas-cart');
      if (persisted) {
        setCartItems(JSON.parse(persisted));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Persist cart updates
  useEffect(() => {
    try {
      localStorage.setItem('lumina-velas-cart', JSON.stringify(cartItems));
    } catch (e) {
      // safe backup omission
    }
  }, [cartItems]);

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

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product?.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product?.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        id: `standard-${product.id}-${Date.now()}`,
        product,
        quantity: 1,
        priceAtAddition: product.price
      }];
    });
    
    // Auto-open shopping slide to confirm insertion feedback
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty < 1) return;
    setCartItems((prev) => 
      prev.map((item) => item.id === itemId ? { ...item, quantity: newQty } : item)
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Filter products list based on search and selected filter tab
  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'todas' || p.category === activeCategory;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.scents.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-warm-bg min-h-screen flex flex-col font-sans select-none antialiased">
      
      {/* Sticky frosted header */}
      <Header 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
        onGoToSection={handleGoToSection} 
      />

      {/* Main Container */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        <Hero onExplore={() => handleGoToSection('produtos')} />

        {/* Dynamic Featured Section (Sanity 'featured: true') */}
        <FeaturedSection 
          featuredProducts={products.filter(p => p.featured)} 
          onSelectProduct={setSelectedProduct} 
          onAddToCart={handleAddToCart} 
        />

        {/* Collection Section */}
        <section id="produtos" className="py-20 bg-white relative">
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
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
                {(['todas', 'velas', 'arranjos', 'kits'] as const).map((cat) => {
                  let displayName: string = cat;
                  if (cat === 'todas') displayName = 'Todas';
                  if (cat === 'arranjos') displayName = 'Arranjos';

                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`flex-1 md:flex-none px-5 py-2.5 text-[10px] sm:text-xs font-bold tracking-widest uppercase rounded-full transition-all duration-300 cursor-pointer ${
                        activeCategory === cat
                          ? 'bg-white text-primary shadow-sm ring-1 ring-black/5'
                          : 'bg-transparent text-muted-brown hover:text-primary'
                      }`}
                    >
                      {displayName}
                    </button>
                  );
                })}
              </div>

              {/* Instant Search textbox */}
              <div className="relative w-full md:w-80 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-brown/50 group-focus-within:text-primary transition-colors duration-300" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar essências..."
                  className="w-full pl-11 pr-4 py-2.5 bg-white text-dark-brown text-sm rounded-full border border-high-blush/30 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 placeholder:text-muted-brown/50"
                />
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
                      <ProductCard 
                        product={prod} 
                        onSelect={setSelectedProduct} 
                        onAddToCart={handleAddToCart} 
                      />
                    </div>
                  ))}
              </ProductCarousel>
            )}

          </div>

        </section>

        <HowItWorks />

      </main>

      {/* Persistent Sticky Contact details & footer */}
      <Footer onGoToSection={handleGoToSection} />

      {/* Sliding Bag drawer panel */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Pop-up detail card and Care Tip accordion */}
      <ProductDetailModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={handleAddToCart} 
      />

    </div>
  );
}
