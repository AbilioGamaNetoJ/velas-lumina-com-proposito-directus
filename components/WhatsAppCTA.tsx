import React from 'react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppURL } from '@/lib/whatsapp';

interface WhatsAppCTAProps {
  productName?: string;
  price?: number;
  customMessage?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function WhatsAppCTA({ productName, price, customMessage, className = '', children }: WhatsAppCTAProps) {
  const href = buildWhatsAppURL({ productName, price, customMessage });

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium text-sm tracking-wider uppercase px-8 py-4 rounded-xl shadow-ambient hover:shadow-ambient-hover transform hover:-translate-y-0.5 transition-all duration-300 ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      {children || 'Fale com a Gente'}
    </a>
  );
}
