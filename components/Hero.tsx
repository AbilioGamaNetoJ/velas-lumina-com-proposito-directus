/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Flame } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

export default function Hero({ onExplore }: HeroProps) {
  return (
    <section id="inicio" className="relative pt-32 pb-24 md:py-36 bg-gradient-to-b from-warm-bg to-soft-blush/40 overflow-hidden">
      
      {/* Dynamic blurred organic spots */}
      <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-soft-blush rounded-full blur-[120px] opacity-70 pointer-events-none" />
      <div className="absolute bottom-[13%] right-[-5%] w-[35%] h-[35%] bg-high-blush rounded-full blur-[100px] opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Text block */}
          <div className="flex flex-col items-start text-left space-y-6 max-w-xl animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-high-blush/60 border border-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase">
              <Flame className="w-3.5 h-3.5" />
              Feito com Propósito
            </div>

            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-5xl font-bold text-dark-brown leading-[1.05] tracking-tight">
              Velas que Iluminam <span className="text-primary italic">Momentos</span> Especiais
            </h1>

            <p className="text-muted-brown text-base sm:text-lg leading-relaxed">
              Descubra a magia do feito à mão com nossas velas artesanais. Produzidas com cera 100% vegetal, aromas autorais e um toque de aconchego para abraçar o seu lar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                id="hero-explore-cta"
                onClick={onExplore}
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-medium text-sm tracking-wider uppercase px-8 py-4 rounded-xl shadow-ambient hover:shadow-ambient-hover transform hover:-translate-y-0.5 transition-all duration-300 pointer-events-auto cursor-pointer"
              >
                Conheça Nossas Velas
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <a
                href="#como-funciona"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 border border-primary/20 hover:border-primary text-primary hover:bg-primary/5 font-medium text-sm tracking-wider uppercase px-8 py-4 rounded-xl transition-all duration-300 cursor-pointer"
              >
                Como funciona?
              </a>
            </div>

            {/* Micro details */}
            <div className="pt-2 grid grid-cols-3 gap-6 w-full text-left border-t border-high-blush/30">
              <div>
                <dt className="text-primary font-editorial text-xl font-bold">100%</dt>
                <dd className="text-xs text-muted-brown">Cera Vegetal</dd>
              </div>
              <div>
                <dt className="text-primary font-editorial text-xl font-bold">Livre</dt>
                <dd className="text-xs text-muted-brown">de Parafinas</dd>
              </div>
              <div>
                <dt className="text-primary font-editorial text-xl font-bold">Premium</dt>
                <dd className="text-xs text-muted-brown">Artesanato</dd>
              </div>
            </div>

          </div>

          {/* Gorgeous design circle image matching user sample */}
          <div className="relative flex justify-center lg:justify-end animate-scale-in">
            {/* Soft backdrop golden rings simulating physical candle glow */}
            <div className="absolute inset-x-0 top-0 bottom-0 scale-[1.08] border border-primary/10 rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute inset-0 scale-[1.03] border-2 border-primary/5 rounded-full pointer-events-none" />

            <div className="w-full max-w-[460px] sm:max-w-[530px] aspect-square rounded-full overflow-hidden shadow-[0_0_60px_25px_rgba(0,0,0,0.18)] border-4 border-white transform hover:scale-[1.01] transition-transform duration-500">
              <video
                src="/images/gif-lumina.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-[center_70%]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
