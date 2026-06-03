/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import React from 'react';
import { Mail, Phone, MapPin, Instagram, Heart } from 'lucide-react';
import { buildWhatsAppURL, WHATSAPP_NUMBER } from '@/lib/whatsapp';

interface FooterProps {
  onGoToSection?: (id: string) => void;
}

export default function Footer({ onGoToSection }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contato" className="bg-soft-blush border-t border-high-blush/40 py-16 text-left relative overflow-hidden">
      
      {/* Decorative accent background container */}
      <div className="absolute bottom-0 right-0 w-[20%] h-[20%] bg-high-blush/20 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand section */}
          <div className="space-y-4 md:col-span-1.5 text-left">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onGoToSection?.('inicio')}>
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0_cMhgWK8UCrnHbdaw1Jg2TYJ1EFnDMD_w7bHEAXfK0Mj-l_A7rL6ny90ql1Y8wx5Q7Rgvh6EL52bNd_Cdbwl1TKcB3HnLaS4oLLaXMOfGZhdciUt_aBlqaDKiOscHRjMUd8-r6erh6fw9LrfMgAAf_v0Mzo2h0b2SDcfbBv8GbW7VD_uGwtiXqbJLzWvGXDAVv33ZlimF_Rw1CdtYY5SvMHG4iQt88HVrXep6dHOxLq4XWLqj5XQNhBK4zOTAuQtuyqGcO7ZtMQ" 
                alt="Lumina Velas Artesanais Logo" 
                className="h-10 w-auto object-contain shrink-0"
              />
              <span className="font-editorial text-2xl font-bold tracking-tight text-primary">
                Lumina
              </span>
            </div>
            <p className="text-xs text-muted-brown leading-relaxed max-w-xs">
              Slow living e aconchego em forma de velas vegetais. Decorando os seus cômodos, perfumando os banquetes e aquecendo a sua alma com óleos concentrados e cerâmica rústica.
            </p>
            <div className="flex space-x-3 pt-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white text-primary hover:bg-primary hover:text-white rounded-full shadow-xs transition-all duration-300"
                aria-label="Siga no Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href={buildWhatsAppURL()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white text-primary hover:bg-primary hover:text-white rounded-full shadow-xs transition-all duration-300"
                aria-label="Fale pelo WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4 text-left">
            <h4 className="font-editorial text-sm font-bold text-dark-brown uppercase tracking-wider">Atelier</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onGoToSection?.('inicio')} className="text-muted-brown hover:text-primary transition-colors cursor-pointer">
                  Início
                </button>
              </li>
              <li>
                <button onClick={() => onGoToSection?.('produtos')} className="text-muted-brown hover:text-primary transition-colors cursor-pointer">
                  Nossas Essências
                </button>
              </li>
              <li>
                <button onClick={() => onGoToSection?.('customizer')} className="text-muted-brown hover:text-primary transition-colors cursor-pointer">
                  Monte a Sua (Bespoke)
                </button>
              </li>
              <li>
                <button onClick={() => onGoToSection?.('sobre')} className="text-muted-brown hover:text-primary transition-colors cursor-pointer">
                  Nossa História
                </button>
              </li>
            </ul>
          </div>

          {/* Scent Categories */}
          <div className="space-y-4 text-left">
            <h4 className="font-editorial text-sm font-bold text-dark-brown uppercase tracking-wider">Categorias</h4>
            <ul className="space-y-2 text-xs text-muted-brown">
              <li>Margaridas Florais</li>
              <li>Cestas Especiais Presente</li>
              <li>Sachês Aromáticos</li>
              <li>Atelier Personalizado</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 text-left">
            <h4 className="font-editorial text-sm font-bold text-dark-brown uppercase tracking-wider">Contato &amp; Orçamentos</h4>
            <ul className="space-y-2.5 text-xs text-muted-brown">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+{WHATSAPP_NUMBER.slice(0, 2)} ({WHATSAPP_NUMBER.slice(2, 4)}) {WHATSAPP_NUMBER.slice(4, 9)}-{WHATSAPP_NUMBER.slice(9, 13)}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>contato@luminavelas.com.br</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>Chapecó - Santa Catarina, Brasil</span>
              </li>
              <li className="text-[10px] text-primary font-medium mt-1">
                Atendimento Nacional via WhatsApp
              </li>
            </ul>
          </div>

        </div>

        {/* Down Copyright banner */}
        <div className="border-t border-high-blush/40 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-brown">
          <p>© {currentYear} Lumina Velas Artesanais. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Feito com carinho e amor em cerâmica e cera <Heart className="w-3.5 h-3.5 text-primary fill-primary" />
          </p>
        </div>

      </div>
    </footer>
  );
}
