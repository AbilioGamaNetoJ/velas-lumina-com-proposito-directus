/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, Sparkles } from 'lucide-react';
import { CartItem } from '@/types/types';
import { buildWhatsAppURL } from '@/lib/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
}

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }: CartDrawerProps) {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.priceAtAddition * item.quantity), 0);

  // Complete formatting utility to build a message for WhatsApp order list
  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    let msg = `✨ *Lumina Velas Artesanais - Meu Pedido* ✨\n\n`;
    
    cartItems.forEach((item, index) => {
      if (item.isBespoke && item.bespokeDetails) {
        msg += `*${index + 1}. Vela Personalizada (Bespoke)*\n`;
        msg += `   - Pote: ${item.bespokeDetails.container}\n`;
        msg += `   - Essência: ${item.bespokeDetails.scent}\n`;
        msg += `   - Pétalas/Flores: ${item.bespokeDetails.flowers}\n`;
        if (item.bespokeDetails.customLabel) {
          msg += `   - Tag com Mensagem: "${item.bespokeDetails.customLabel}"\n`;
        }
        msg += `   - Qtd: ${item.quantity}x de R$ ${item.priceAtAddition.toFixed(2)}\n\n`;
      } else if (item.product) {
        msg += `*${index + 1}. ${item.product.name}*\n`;
        msg += `   - Categoria: ${item.product.category}\n`;
        msg += `   - Qtd: ${item.quantity}x de R$ ${item.priceAtAddition.toFixed(2)}\n\n`;
      }
    });

    msg += `---------------------------------\n`;
    msg += `*Valor Total Estimado: R$ ${subtotal.toFixed(2)}*\n\n`;
    msg += `Gostaria de verificar a disponibilidade e fechar a encomenda destas lindezas! Obrigado!`;

    const whatsappUrl = buildWhatsAppURL({ customMessage: msg });
    window.open(whatsappUrl, '_blank');
  };

  return (
      <div className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
        <div className="absolute inset-0 overflow-hidden">
          
          {/* Blur backdrop overlay */}
          <div 
            onClick={onClose}
            className="absolute inset-0 bg-dark-brown/65 backdrop-blur-xs cursor-pointer" 
          />

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            {/* Sliding Panel */}
            <div 
              className={`pointer-events-auto h-screen w-screen max-w-md bg-warm-bg shadow-2xl border-l border-high-blush/40 flex flex-col justify-between transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
              {/* Drawer Header */}
              <div className="px-6 py-5 bg-white border-b border-high-blush/35 flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary">
                  <ShoppingBag className="w-5 h-5" />
                  <h2 className="font-editorial text-xl font-bold text-dark-brown" id="slide-over-title">
                    Minha Cesta
                  </h2>
                </div>
                <button
                  id="cart-close-btn"
                  onClick={onClose}
                  className="p-1.5 text-muted-brown hover:text-primary rounded-full hover:bg-soft-blush transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body - Items list */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                    <div className="p-4 bg-soft-blush text-primary rounded-full">
                      <ShoppingBag className="w-10 h-10 stroke-1" />
                    </div>
                    <div>
                      <p className="font-editorial text-lg font-bold text-dark-brown">Sua cesta está vazia</p>
                      <p className="text-muted-brown text-xs max-w-xs mx-auto mt-1">Navegue pelas nossas essências e adicione as suas criações favoritas para presentear com amor.</p>
                    </div>
                    <button
                      onClick={onClose}
                      className="text-xs font-semibold uppercase tracking-wider bg-primary text-white border border-transparent px-6 py-3 rounded-xl transition-all shadow-sm cursor-pointer"
                    >
                      Continuar Navegando
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-high-blush/30">
                    {cartItems.map((item) => (
                      <div key={item.id} className="py-4 flex gap-4 first:pt-0 last:pb-0 text-left">
                        
                        {/* Item image or bespoke design icon */}
                        <div className="w-20 h-20 bg-soft-blush rounded-xl overflow-hidden shrink-0 flex items-center justify-center border border-high-blush/20">
                          {item.isBespoke ? (
                            <div className="flex flex-col items-center text-primary justify-center p-2 bg-gradient-to-br from-high-blush to-white w-full h-full">
                              <Sparkles className="w-6 h-6 animate-pulse" />
                              <span className="text-[8px] font-bold tracking-tight uppercase mt-1">Bespoke</span>
                            </div>
                          ) : (
                            <img 
                              src={item.product?.image} 
                              alt={item.product?.name} 
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>

                        {/* Item descriptions */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <h3 className="font-editorial text-sm font-bold text-dark-brown leading-tight">
                                {item.isBespoke ? 'Vela Customizada Bespoke' : item.product?.name}
                              </h3>
                              <button
                                onClick={() => onRemoveItem(item.id)}
                                className="text-muted-brown hover:text-red-500 transition-colors cursor-pointer"
                                title="Remover item"
                              >
                                <Trash2 className="w-4 h-4 shrink-0" />
                              </button>
                            </div>
                            
                            {/* Bespoke subtexts */}
                            {item.isBespoke && item.bespokeDetails ? (
                              <p className="text-[10px] text-muted-brown mt-1 space-y-0.5 leading-normal">
                                <span className="block">🏺 {item.bespokeDetails.container}</span>
                                <span className="block">🍃 {item.bespokeDetails.scent}</span>
                                <span className="block">🏵️ {item.bespokeDetails.flowers}</span>
                                {item.bespokeDetails.customLabel && (
                                  <span className="block italic text-primary">“{item.bespokeDetails.customLabel}”</span>
                                )}
                              </p>
                            ) : (
                              <p className="text-[10px] uppercase tracking-wider font-bold text-primary mt-0.5">
                                {item.product?.category}
                              </p>
                            )}
                          </div>

                          {/* Quantities indicator and price */}
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center gap-1 border border-high-blush bg-white rounded-lg p-0.5 shadow-xs">
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:bg-soft-blush text-muted-brown rounded-md transition-colors shrink-0 disabled:opacity-40 cursor-pointer"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="text-xs font-semibold text-dark-brown w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-soft-blush text-muted-brown rounded-md transition-colors shrink-0 cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            
                            <span className="font-semibold text-primary text-sm">
                              R$ {(item.priceAtAddition * item.quantity).toFixed(2)}
                            </span>
                          </div>

                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Drawer footer with totals */}
              {cartItems.length > 0 && (
                <div className="p-6 bg-white border-t border-high-blush/35 space-y-4">
                  <div className="flex justify-between items-center text-left">
                    <div>
                      <p className="font-editorial text-lg font-bold text-dark-brown">Valor Total</p>
                      <p className="text-xs text-muted-brown">Entrega combinada via WhatsApp</p>
                    </div>
                    <p className="font-editorial text-2xl font-bold text-primary">
                      R$ {subtotal.toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={handleCheckout}
                    id="cart-checkout-btn"
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-medium text-sm tracking-wide py-4 rounded-xl shadow-ambient hover:shadow-ambient-hover transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    Enviar Pedido via WhatsApp
                  </button>

                  <p className="text-[10px] text-center text-muted-brown leading-normal">
                    Não há pagamento online nessa versão do site. Ao clicar no botão, uma mensagem organizada com a descrição das suas velas será aberta no WhatsApp para concluir seu pedido.
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
  );
}
