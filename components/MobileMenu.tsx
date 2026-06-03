"use client";

import React from 'react';
import { Sparkles } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToSection?: (id: string) => void;
  navItems: { label: string; target: string }[];
}

export default function MobileMenu({ isOpen, onClose, onGoToSection, navItems }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div id="mobile-nav-panel" className="md:hidden bg-warm-bg border-b border-high-blush/45 animate-fade-in py-4 px-6 space-y-4">
      <div className="flex flex-col space-y-3">
        {navItems.map((item) => (
          <button
            key={item.target}
            id={`mobile-nav-link-${item.target}`}
            onClick={() => {
              onClose();
              onGoToSection?.(item.target);
            }}
            className="text-left py-2 text-muted-brown hover:text-primary font-medium text-base transition-colors"
          >
            {item.label}
          </button>
        ))}
        <button
          id="mobile-customize-btn"
          onClick={() => {
            onClose();
            onGoToSection?.('customizer');
          }}
          className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-semibold tracking-wider uppercase text-sm mt-2 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          Personalizar Vela
        </button>
      </div>
    </div>
  );
}
