"use client";

import React from 'react';

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
      </div>
    </div>
  );
}
