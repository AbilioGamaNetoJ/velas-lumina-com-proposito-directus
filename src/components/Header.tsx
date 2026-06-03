/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Sparkles, MessageCircle } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onGoToSection: (id: string) => void;
}

export default function Header({ cartCount, onOpenCart, onGoToSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Início', target: 'inicio' },
    { label: 'Essências', target: 'produtos' },
    { label: 'Monte a Sua', target: 'customizer' },
    { label: 'Sobre', target: 'sobre' },
    { label: 'Contato', target: 'contato' },
  ];

  return (
    <header id="app-header" className="fixed top-0 left-0 right-0 z-50 bg-warm-bg/85 backdrop-blur-md border-b border-high-blush/40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Brand */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => onGoToSection('inicio')}>
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0_cMhgWK8UCrnHbdaw1Jg2TYJ1EFnDMD_w7bHEAXfK0Mj-l_A7rL6ny90ql1Y8wx5Q7Rgvh6EL52bNd_Cdbwl1TKcB3HnLaS4oLLaXMOfGZhdciUt_aBlqaDKiOscHRjMUd8-r6erh6fw9LrfMgAAf_v0Mzo2h0b2SDcfbBv8GbW7VD_uGwtiXqbJLzWvGXDAVv33ZlimF_Rw1CdtYY5SvMHG4iQt88HVrXep6dHOxLq4XWLqj5XQNhBK4zOTAuQtuyqGcO7ZtMQ" 
              alt="Lumina Velas Artesanais Logo" 
              id="header-logo"
              className="h-12 w-auto object-contain mr-2"
            />
            <span className="font-editorial text-2xl font-bold tracking-tight text-primary hidden sm:inline-block">
              Lumina
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.target}
                id={`nav-link-${item.target}`}
                onClick={() => onGoToSection(item.target)}
                className="text-muted-brown hover:text-primary font-medium text-sm tracking-wide transition-colors duration-150 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center space-x-4">
            
            {/* Customize quick trigger button */}
            <button
              id="header-customize-btn"
              onClick={() => onGoToSection('customizer')}
              className="hidden sm:flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Bespoke Lab
            </button>

            {/* Shopping Cart button */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full hover:bg-soft-blush text-primary transition-colors focus:outline-none cursor-pointer"
              aria-label="Carrinho"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Whatsapp quick chat */}
            <a
              id="header-whatsapp-quick"
              href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20as%20velas%20artesanais%20Lumina%21"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-full transition-colors hidden xs:block cursor-pointer"
              aria-label="Falar conosco"
            >
              <MessageCircle className="w-5 h-5" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              id="header-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-muted-brown hover:text-primary transition-colors focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div id="mobile-nav-panel" className="md:hidden bg-warm-bg border-b border-high-blush/45 animate-fade-in py-4 px-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.target}
                id={`mobile-nav-link-${item.target}`}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onGoToSection(item.target);
                }}
                className="text-left py-2 text-muted-brown hover:text-primary font-medium text-base transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              id="mobile-customize-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onGoToSection('customizer');
              }}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-semibold tracking-wider uppercase text-sm mt-2 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Personalizar Vela
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
