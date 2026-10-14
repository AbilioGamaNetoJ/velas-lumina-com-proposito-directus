'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Faq } from '@/types/types';

export default function FaqSection({ faqs }: { faqs: Faq[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  if (faqs.length === 0) return null;

  return (
    <section
      id="faq"
      className="relative bg-white border-t border-b border-high-blush/50 py-20 overflow-hidden"
    >
      {/* Decorative blobs — não interferem no fundo branco */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs uppercase font-bold tracking-widest text-primary bg-primary/10 px-3.5 py-1 rounded-full mb-4">
            Dúvidas Frequentes
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-dark-brown leading-tight">
            Perguntas Frequentes
          </h2>
          <p className="text-muted-brown text-base mt-3 max-w-md mx-auto">
            Não encontrou o que procurava? Fale conosco pelo WhatsApp.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-primary/60 shadow-md bg-soft-blush/40'
                    : 'border-high-blush bg-soft-blush/10 hover:border-primary/40 hover:bg-soft-blush/20'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 cursor-pointer"
                >
                  <span
                    className={`font-sans text-base font-semibold leading-snug transition-colors duration-200 ${
                      isOpen ? 'text-primary' : 'text-dark-brown'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? 'bg-primary text-white rotate-180'
                        : 'bg-high-blush/40 text-muted-brown'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-5 pt-1 border-t border-primary/10">
                    <p className="text-base text-muted-brown leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
