"use client";

import React, { useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { buildWhatsAppURL } from '@/lib/whatsapp';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={className} fill="currentColor">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
    </svg>
  );
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToSection?: (id: string) => void;
  navItems: { label: string; target: string }[];
}

export default function MobileMenu({ isOpen, onClose, onGoToSection, navItems }: MobileMenuProps) {
  
  // Impede o scroll da página quando o menu estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop (fundo escurecido) */}
      <div 
        className={`fixed inset-0 bg-dark-brown/40 backdrop-blur-sm z-[60] transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer (menu lateral) */}
      <div 
        className={`fixed top-0 right-0 h-full w-[80vw] max-w-sm bg-warm-bg shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Topo do Drawer */}
        <div className="flex items-center justify-between p-6 border-b border-high-blush/40">
          <img 
            src="/images/logo-navbar.png"
            alt="Lumina Velas Logo" 
            className="h-10 w-auto object-contain"
          />
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-muted-brown hover:text-primary transition-colors focus:outline-none"
            aria-label="Fechar menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Links de Navegação */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.target} className="border-b border-high-blush/40 last:border-0 mx-4">
                <button
                  id={`mobile-nav-link-${item.target}`}
                  onClick={() => {
                    onClose();
                    onGoToSection?.(item.target);
                  }}
                  className="w-full flex items-center justify-between text-dark-brown hover:text-primary font-sans font-bold text-[15px] transition-colors py-4 px-2 hover:bg-high-blush/10 rounded-lg group"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-high-blush group-hover:text-primary transition-colors" />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Rodapé (WhatsApp) */}
        <div className="p-6 mt-auto">
          <a
            href={buildWhatsAppURL()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-center justify-center space-x-2 w-full bg-primary hover:bg-primary-dark text-white py-3.5 px-4 rounded-xl font-medium text-sm transition-colors shadow-sm"
          >
            <WhatsAppIcon className="w-5 h-5" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      </div>
    </>
  );
}

