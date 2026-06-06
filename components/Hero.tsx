/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Flame } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface HeroProps {
  onExplore: () => void;
}

export default function Hero({ onExplore }: HeroProps) {
  return (
    <section id="inicio" className="relative min-h-[100dvh] flex items-center w-full pt-20 pb-20 md:pt-24 md:pb-24 bg-gradient-to-b from-warm-bg to-[#FDFBF7] overflow-hidden">
      
      {/* Soft background accents */}
      <div className="absolute top-0 right-0 w-[60%] h-[80%] bg-gradient-to-b from-soft-blush/30 to-transparent rounded-bl-full pointer-events-none opacity-50" />
      <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-soft-blush rounded-full blur-[140px] opacity-40 pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          
          {/* Text block (Overlapping z-index 20) */}
          <div className="w-full lg:w-[55%] xl:w-[50%] z-20 flex flex-col items-start text-left space-y-6 sm:space-y-8 pt-8 lg:pt-0">
            
            <ScrollReveal delay={100}>
              <div className="inline-flex items-center gap-2 bg-high-blush/80 border border-primary/10 text-primary px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs font-semibold tracking-[0.2em] uppercase backdrop-blur-sm shadow-sm">
                <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                Feito com Propósito
              </div>
            </ScrollReveal>

            {/* Overlap typography */}
            <ScrollReveal delay={200}>
              <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.8rem] font-bold text-dark-brown leading-[1.05] tracking-tight relative z-20 lg:-mr-[10%] mix-blend-multiply pointer-events-none">
                Velas que Iluminam{' '}
                <span className="text-primary italic font-light relative whitespace-nowrap inline-block">
                  Momentos
                  {/* Decorative underline */}
                  <svg className="absolute w-full h-auto -bottom-1 sm:-bottom-2 left-0 text-primary/20 -z-10" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 18C80.5 5.5 198.5 -3.5 298 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>{' '}
                Especiais
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <p className="text-muted-brown text-base sm:text-lg leading-relaxed max-w-md lg:max-w-lg font-light lg:ml-1">
                Do início ao fim, feita à mão. É assim que nasce cada vela Lumina — com calma, cuidado e a satisfação de entregar algo verdadeiro.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={400} className="w-full sm:w-auto pt-4 lg:ml-2">
              <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                <button
                  id="hero-explore-cta"
                  onClick={onExplore}
                  className="group inline-flex items-center justify-center gap-3 bg-[#5C4033] hover:bg-[#4A3329] text-white font-medium text-xs sm:text-sm tracking-[0.2em] uppercase px-10 py-5 rounded-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 pointer-events-auto cursor-pointer"
                >
                  Conheça Nossas Velas
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                
                <a
                  href="#como-funciona"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2 text-dark-brown hover:text-[#5C4033] font-medium text-xs sm:text-sm tracking-[0.1em] uppercase px-6 py-5 border-b border-transparent hover:border-[#5C4033] transition-all duration-300 cursor-pointer"
                >
                  Como funciona?
                </a>
              </div>
            </ScrollReveal>

            {/* Micro details - refined and elegant */}
            <ScrollReveal delay={500} className="w-full max-w-xl text-left lg:ml-2 pt-6 mt-8">
              <div className="flex w-full justify-between items-start divide-x divide-primary/15 border-t border-primary/10">
                <div className="py-3 pr-2 min-[375px]:pr-4 sm:pr-8">
                  <dt className="text-dark-brown font-editorial text-[1.1rem] min-[375px]:text-xl sm:text-3xl font-normal">Aromas</dt>
                  <dd className="text-[8px] min-[375px]:text-[9px] sm:text-[10px] text-muted-brown uppercase tracking-[0.1em] min-[375px]:tracking-[0.15em] sm:tracking-[0.2em] mt-1 sm:mt-1.5 font-bold break-words">Exclusivos</dd>
                </div>
                <div className="py-3 px-2 min-[375px]:px-4 sm:px-8">
                  <dt className="text-dark-brown font-editorial text-[1.1rem] min-[375px]:text-xl sm:text-3xl font-normal">Queima</dt>
                  <dd className="text-[8px] min-[375px]:text-[9px] sm:text-[10px] text-muted-brown uppercase tracking-[0.1em] min-[375px]:tracking-[0.15em] sm:tracking-[0.2em] mt-1 sm:mt-1.5 font-bold break-words">Limpa & Lenta</dd>
                </div>
                <div className="py-3 pl-2 min-[375px]:pl-4 sm:pl-8">
                  <dt className="text-dark-brown font-editorial text-[1.1rem] min-[375px]:text-xl sm:text-3xl font-normal">Atmosfera</dt>
                  <dd className="text-[8px] min-[375px]:text-[9px] sm:text-[10px] text-muted-brown uppercase tracking-[0.1em] min-[375px]:tracking-[0.15em] sm:tracking-[0.2em] mt-1 sm:mt-1.5 font-bold break-words">Aconchegante</dd>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Editorial Arch Video Container (z-10) */}
          <ScrollReveal delay={300} className="w-full lg:w-[40%] xl:w-[45%] z-10 mt-12 lg:mt-0 relative">
            
            {/* Minimalist ornamental accents */}
            <div className="absolute -top-4 -right-4 w-16 h-16 border-t border-r border-primary/20 rounded-tr-[24px] hidden lg:block" />
            <div className="absolute -bottom-5 -left-5 w-24 h-24 border-b border-l border-primary/20 rounded-bl-[24px] hidden lg:block" />

            {/* The Arch Shape */}
            <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] w-full max-w-[380px] lg:max-w-[420px] mx-auto lg:ml-auto lg:mr-0 overflow-hidden rounded-t-[120px] rounded-b-[20px] lg:rounded-t-[160px] lg:rounded-b-[28px] shadow-[0_20px_60px_-15px_rgba(113,82,65,0.2)] border-[4px] border-white/50 bg-warm-bg group">
              <div className="absolute inset-0 bg-dark-brown/5 z-10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
              <video
                src="/images/gif-lumina.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center transform scale-[1.03] group-hover:scale-100 transition-transform duration-[10s] ease-out"
              />
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
