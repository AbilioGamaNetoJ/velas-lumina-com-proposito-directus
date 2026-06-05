/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import React from 'react';
import { Mail, MapPin, Instagram, Heart, ArrowRight } from 'lucide-react';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={className} fill="currentColor">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
    </svg>
  );
}
import { buildWhatsAppURL, WHATSAPP_NUMBER } from '@/lib/whatsapp';

interface FooterProps {
  onGoToSection?: (id: string) => void;
}

export default function Footer({ onGoToSection }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contato" className="bg-soft-blush border-t border-high-blush/40 py-16 text-left relative overflow-hidden">
      
      {/* Decorative accent background container */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand section */}
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center cursor-pointer group" onClick={() => onGoToSection?.('inicio')}>
              <img 
                src="/images/logo-footer.png"
                alt="Lumina Velas Artesanais Logo" 
                className="h-12 w-auto object-contain shrink-0 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="text-sm text-muted-brown leading-relaxed max-w-sm">
              Feitas uma a uma, com as mãos e com carinho. É simples assim.
            </p>
            <div className="flex space-x-3 pt-2">
              <a 
                href="https://www.instagram.com/lumina.velasartesanais/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 bg-white text-muted-brown hover:text-primary hover:bg-primary/5 rounded-full shadow-sm hover:shadow transition-all duration-300 border border-high-blush/30"
                aria-label="Siga no Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 bg-white text-muted-brown hover:text-primary hover:bg-primary/5 rounded-full shadow-sm hover:shadow transition-all duration-300 border border-high-blush/30"
                aria-label="Fale pelo WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links - Navegação */}
          <div className="space-y-6">
            <h4 className="font-editorial text-sm font-semibold text-dark-brown uppercase tracking-[0.15em]">Navegação</h4>
            <ul className="space-y-3 text-sm">
              {[
                { id: 'inicio', label: 'Início' },
                { id: 'produtos', label: 'Nossas Velas' },
                { id: 'como-funciona', label: 'Como Funciona' },
                { id: 'faq', label: 'FAQ' }
              ].map((item) => (
                <li key={item.id}>
                  <button 
                    onClick={() => onGoToSection?.(item.id)} 
                    className="group flex items-center text-muted-brown hover:text-primary transition-colors cursor-pointer"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-2 text-primary" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful links - Informações */}
          <div className="space-y-6">
            <h4 className="font-editorial text-sm font-semibold text-dark-brown uppercase tracking-[0.15em]">Informações</h4>
            <ul className="space-y-3 text-sm text-muted-brown">
              <li>
                <a href="#" className="hover:text-primary transition-colors inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                  Cuidados com a Vela
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                  Prazos e Entregas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                  Trocas e Devoluções
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h4 className="font-editorial text-sm font-semibold text-dark-brown uppercase tracking-[0.15em]">Atendimento</h4>
            <ul className="space-y-4 text-sm text-muted-brown">
              <li>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-primary transition-colors group">
                  <div className="mt-0.5 bg-white p-1.5 rounded-md shadow-sm border border-high-blush/30 group-hover:border-primary/30 transition-colors">
                    <WhatsAppIcon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">WhatsApp</span>
                    <span className="text-xs opacity-80">+55 ({WHATSAPP_NUMBER.slice(2, 4)}) {WHATSAPP_NUMBER.slice(4, 9)}-{WHATSAPP_NUMBER.slice(9, 13)}</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:contato@luminavelas.com.br" className="flex items-start gap-3 hover:text-primary transition-colors group">
                  <div className="mt-0.5 bg-white p-1.5 rounded-md shadow-sm border border-high-blush/30 group-hover:border-primary/30 transition-colors">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">E-mail</span>
                    <span className="text-xs opacity-80">contato@luminavelas.com.br</span>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="mt-0.5 bg-white p-1.5 rounded-md shadow-sm border border-high-blush/30">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-dark-brown">Atelier</span>
                  <span className="text-xs opacity-80">Rio Vermelho, Florianópolis, SC</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Down Copyright banner */}
        <div className="border-t border-high-blush/50 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-brown">
          <p>© {currentYear} Lumina Velas Artesanais. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1.5 font-medium tracking-wide">
            Feito com carinho e amor <Heart className="w-3.5 h-3.5 text-primary fill-primary" />
          </p>
        </div>

      </div>
    </footer>
  );
}
