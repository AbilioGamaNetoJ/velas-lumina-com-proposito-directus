import React from 'react';
import { Search, ShoppingBag, Package } from 'lucide-react';
import { buildWhatsAppURL } from '@/lib/whatsapp';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={className} fill="currentColor">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
    </svg>
  );
}

import ScrollReveal from './ScrollReveal';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Explore o catálogo',
    description: 'Navegue pelas nossas velas e encontre a que ilumina o seu lar. Filtre por tipo ou essência.',
  },
  {
    number: '02',
    icon: ShoppingBag,
    title: 'Escolha como comprar',
    description: 'Adicione ao carrinho para montar seu pedido ou clique em Comprar direto no produto.',
  },
  {
    number: '03',
    icon: WhatsAppIcon,
    title: 'Finalize pelo WhatsApp',
    description: 'Sua mensagem chega organizada com os produtos escolhidos. Combinamos entrega e pagamento.',
  },
  {
    number: '04',
    icon: Package,
    title: 'Receba com carinho',
    description: 'Cada vela é embrulhada à mão e enviada para todo o Brasil com muito cuidado.',
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 bg-warm-bg border-t border-high-blush/30 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-soft-blush rounded-full blur-[140px] opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <ScrollReveal delay={100} className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3">
            Processo de Compra
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-dark-brown">
            Como realizar seu pedido
          </h2>
          <p className="text-muted-brown text-sm sm:text-base mt-3">
            Simples, rápido e com atendimento personalizado pelo WhatsApp — do catálogo à sua porta.
          </p>
        </ScrollReveal>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-high-blush/60 z-0" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <ScrollReveal 
                key={step.number} 
                animation="fade-in-right"
                delay={index * 200}
                className="relative flex flex-col items-center text-center z-10"
              >
                <div className="w-20 h-20 rounded-full bg-white border-2 border-high-blush/40 shadow-sm flex items-center justify-center mb-4 relative">
                  <Icon className="w-7 h-7 text-primary" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-editorial text-base font-bold text-dark-brown mb-2">{step.title}</h3>
                <p className="text-muted-brown text-xs leading-relaxed max-w-[200px]">{step.description}</p>
              </ScrollReveal>
            );
          })}
        </div>

        {/* CTA */}
        <ScrollReveal delay={800} className="text-center mt-16 space-y-3">
          <a
            href={buildWhatsAppURL({ customMessage: 'Olá! Gostaria de fazer um pedido.' })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-medium text-sm tracking-wider uppercase px-10 py-4 rounded-xl shadow-ambient hover:shadow-ambient-hover transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Iniciar meu pedido agora
          </a>
          <p className="text-xs text-muted-brown">
            Tempo médio de resposta: menos de 1h &nbsp;·&nbsp; Pagamento combinado &nbsp;·&nbsp; Entrega nacional
          </p>
        </ScrollReveal>

      </div>
    </section>
  );
}
