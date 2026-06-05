"use client";

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-warm-bg flex flex-col font-sans selection:bg-primary/20">
      
      {/* Header mock for 404 */}
      <Header 
        cartCount={0} 
        onGoToSection={(id) => { window.location.href = '/#' + id; }} 
      />

      <main className="flex-grow flex flex-col items-center justify-center p-6 pt-32 pb-24 relative overflow-hidden min-h-[70vh]">
        {/* Background abstract element for depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

        {/* Massive Typographic Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] md:text-[25vw] font-editorial font-bold text-dark-brown/5 select-none pointer-events-none z-0 tracking-tighter leading-none">
          404
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto pt-20">
          
          {/* Logo */}
          <div className="mb-12 animate-fade-in-up" style={{ animationDuration: '0.8s' }}>
            <Image 
              src="/images/logo-navbar.png" 
              alt="Velas Lumina" 
              width={180} 
              height={60} 
              className="w-auto h-12 md:h-16 opacity-90"
            />
          </div>

          {/* Content */}
          <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase mb-4 animate-fade-in-up" style={{ animationDuration: '1s' }}>
            Erro 404
          </span>
          
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-dark-brown mb-6 animate-fade-in-up" style={{ animationDuration: '1.2s' }}>
            A chama se apagou.
          </h1>
          
          <p className="text-muted-brown text-sm sm:text-base mb-12 animate-fade-in-up" style={{ animationDuration: '1.4s' }}>
            O caminho que você buscou se perdeu no ar. Não se preocupe, nossas melhores essências ainda estão à sua espera.
          </p>

          {/* Prominent Button - Solid Hover */}
          <Link 
            href="/"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-full transition-all duration-300 shadow-md hover:shadow-lg animate-fade-in-up"
            style={{ animationDuration: '1.6s' }}
          >
            <span className="text-xs font-bold tracking-widest uppercase">Voltar ao Início</span>
            
            {/* Subtle animated arrow */}
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </main>

      {/* Footer mock for 404 */}
      <Footer 
        onGoToSection={(id) => { window.location.href = '/#' + id; }}
      />
      
    </div>
  );
}
