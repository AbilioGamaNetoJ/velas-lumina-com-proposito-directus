/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, ShoppingBag, Flame, Clock, Ruler, Scale, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { Product } from '@/types/types';
import { buildWhatsAppURL } from '@/lib/whatsapp';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductDetailModal({ product, onClose, onAddToCart }: ProductDetailModalProps) {
  const [activeCareTab, setActiveCareTab] = useState<string | null>('queima');

  if (!product) return null;

  // Pre-fill a beautifully formatted message for custom whatsapp redirects if desired
  const whatsappUrl = buildWhatsAppURL({ productName: product.name, price: product.price });

  const careTips = [
    {
      id: 'queima',
      title: 'Primeira queima (memória da vela)',
      desc: 'Sempre que acender sua vela pela primeira vez, deixe a cera derreter completamente até atingir toda a borda do recipiente. Isso evita a formação de um "túnel" no meio, aproveitando 100% da sua vela!'
    },
    {
      id: 'pavio',
      title: 'Aparar o pavio rústico',
      desc: 'Antes de reacender sua vela, sempre aparar o pavio de algodão descartando a pontinha preta queimada, deixando-o com cerca de 0,5cm. Isso evita fumaça preta e mantém a chama estável e pequena.'
    },
    {
      id: 'segurança',
      title: 'Medidas de segurança',
      desc: 'Não queime sua vela por mais de 4 horas consecutivas. Mantenha longe de correntes de ar, cortinas, crianças, pets, e sempre apague sob supervisão direta.'
    }
  ];

  return (
      <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          
          {/* Backdrop blur overlay */}
          <div 
            onClick={onClose}
            className="fixed inset-0 bg-dark-brown/60 backdrop-blur-xs cursor-pointer" 
          />

          {/* Centering trick */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          {/* Modal Container */}
          <div 
            className="inline-block align-middle bg-warm-bg rounded-3xl text-left overflow-hidden shadow-2xl transform my-8 sm:max-w-4xl w-full border border-high-blush/40 animate-scale-in"
          >
            {/* Close button top right */}
            <button
              id="modal-close-btn"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 text-muted-brown hover:text-primary rounded-full bg-white/80 hover:bg-white transition-all shadow-md cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              
              {/* Left Column: Image with overlay banner */}
              <div className="relative aspect-square md:aspect-auto md:h-full min-h-[350px] bg-soft-blush">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  id="modal-product-img"
                  className="w-full h-full object-cover"
                />
                
                {/* Visual flower-watercolor accent look */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 text-left text-white hidden md:block">
                  <p className="font-editorial text-2xl font-bold">{product.name}</p>
                  <p className="text-white/80 text-xs">{product.subtitle}</p>
                </div>
              </div>

              {/* Right Column: Full storytelling details */}
              <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[90vh] overflow-y-auto">
                <div className="space-y-6">
                  
                  {/* Category and Title */}
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-2 inline-block">
                      {product.category}
                    </span>
                    <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-dark-brown">
                      {product.name}
                    </h2>
                    <p className="text-primary font-bold text-xl mt-1">
                      R$ {product.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Narrative description */}
                  <div className="text-left">
                    <h3 className="text-xs uppercase tracking-wider font-bold text-dark-brown mb-2">Sobre esta essência</h3>
                    <p className="text-muted-brown text-sm sm:text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Scent profiles listed */}
                  <div className="text-left">
                    <h3 className="text-xs uppercase tracking-wider font-bold text-dark-brown mb-2">Composição Aromática</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.scents.map((scent, i) => (
                        <span key={i} className="bg-high-blush/60 text-dark-brown text-xs font-medium px-3 py-1 rounded-full border border-high-blush/20">
                          ☘️ {scent}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Product physical metrics */}
                  {product.details && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left bg-soft-blush/60 p-4 rounded-xl border border-high-blush/30">
                      {product.details.weight && (
                        <div className="flex items-center gap-2">
                          <Scale className="w-4 h-4 text-primary shrink-0" />
                          <div>
                            <p className="text-[9px] uppercase text-muted-brown tracking-wider">Peso</p>
                            <p className="text-xs font-semibold text-dark-brown">{product.details.weight}</p>
                          </div>
                        </div>
                      )}
                      {product.details.burnTime && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary shrink-0" />
                          <div>
                            <p className="text-[9px] uppercase text-muted-brown tracking-wider">Queima</p>
                            <p className="text-xs font-semibold text-dark-brown">{product.details.burnTime}</p>
                          </div>
                        </div>
                      )}
                      {product.details.essenceStrength && (
                        <div className="flex items-center gap-2">
                          <Flame className="w-4 h-4 text-primary shrink-0" />
                          <div>
                            <p className="text-[9px] uppercase text-muted-brown tracking-wider">Intensidade</p>
                            <p className="text-xs font-semibold text-dark-brown">{product.details.essenceStrength}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Interactive Accordion: Care Guide */}
                  <div className="border-t border-high-blush/40 pt-4 text-left">
                    <h3 className="text-xs uppercase tracking-wider font-bold text-dark-brown mb-3">Guia do Slow Living (Cuidados)</h3>
                    <div className="space-y-2.5">
                      {careTips.map((tip) => (
                        <div key={tip.id} className="border border-high-blush/20 rounded-lg overflow-hidden">
                          <button
                            onClick={() => setActiveCareTab(activeCareTab === tip.id ? null : tip.id)}
                            className="w-full flex justify-between items-center px-4 py-2.5 bg-soft-blush/30 hover:bg-soft-blush/60 transition-colors text-left font-medium text-xs text-dark-brown cursor-pointer"
                          >
                            <span>{tip.title}</span>
                            {activeCareTab === tip.id ? <ChevronUp className="w-3.5 h-3.5 text-primary" /> : <ChevronDown className="w-3.5 h-3.5 text-primary" />}
                          </button>
                          {activeCareTab === tip.id && (
                            <div className="p-4 bg-white text-muted-brown text-xs leading-relaxed border-t border-high-blush/10">
                              {tip.desc}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Footer buttons of the modal */}
                <div className="mt-8 pt-4 border-t border-high-blush/40 flex flex-col sm:flex-row gap-3">
                  
                  {/* Add to selection cart */}
                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onClose();
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-medium text-sm tracking-wide py-3.5 rounded-xl shadow-ambient hover:shadow-ambient-hover transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Adicionar ao Carrinho
                  </button>

                  {/* Direct quick order on WhatsApp */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 border border-green-600/30 hover:border-green-600 text-green-700 hover:bg-green-50 font-medium text-sm tracking-wide py-3.5 rounded-xl transition-all duration-200"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Orçar no WhatsApp
                  </a>

                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
  );
}
