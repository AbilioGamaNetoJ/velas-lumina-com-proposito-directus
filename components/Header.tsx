/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import React, { useState } from 'react';
import { ShoppingBag, Menu, X, MessageCircle } from 'lucide-react';
import MobileMenu from './MobileMenu';
import { buildWhatsAppURL } from '@/lib/whatsapp';

interface HeaderProps {
  cartCount: number;
  onOpenCart?: () => void;
  onGoToSection?: (id: string) => void;
}

export default function Header({ cartCount, onOpenCart, onGoToSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Início', target: 'inicio' },
    { label: 'Essências', target: 'produtos' },
    { label: 'Como Funciona', target: 'como-funciona' },
    { label: 'Contato', target: 'contato' },
  ];

  return (
    <>
      <header id="app-header" className="fixed top-0 left-0 right-0 z-50 bg-warm-bg/85 backdrop-blur-md border-b border-high-blush/40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Brand */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => onGoToSection?.('inicio')}>
            <img 
              src="/images/logo-navbar.png"
              alt="Lumina Velas Artesanais Logo" 
              id="header-logo"
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.target}
                id={`nav-link-${item.target}`}
                onClick={() => onGoToSection?.(item.target)}
                className="text-muted-brown hover:text-primary font-medium text-sm tracking-wide transition-colors duration-150 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center space-x-4">
            
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
              href={buildWhatsAppURL()}
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
      </header>

      {/* Mobile Drawer menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onGoToSection={onGoToSection}
        navItems={navItems}
      />
    </>
  );
}
