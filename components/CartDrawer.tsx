/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={className} fill="currentColor">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
    </svg>
  );
}
import { CartItem } from '@/types/types';
import { buildWhatsAppURL, buildCartOrderMessage } from '@/lib/whatsapp';
import { useSiteSettings } from '@/components/SiteSettingsContext';
import { formatUnits } from '@/lib/quantities';
import FromPriceLabel from '@/components/FromPriceLabel';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
}

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }: CartDrawerProps) {
  const availableItems = cartItems.filter((item) => item.product.inStock !== false && !item.unavailable);
  const subtotal = availableItems.reduce((acc, item) => acc + (item.priceAtAddition * item.quantity), 0);
  const settings = useSiteSettings();

  const handleCheckout = () => {
    if (availableItems.length === 0) return;

    const msg = buildCartOrderMessage(
      settings.brand_name,
      availableItems.map((item) => ({
        name: item.product.name,
        category: item.product.category,
        quantity: item.quantity,
        price: item.priceAtAddition,
        quantityLabel: item.selectedQuantity ? formatUnits(item.selectedQuantity.quantity) : undefined,
      }))
    );

    const whatsappUrl = buildWhatsAppURL({ customMessage: msg, number: settings.whatsapp_number });
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
                      <p className="text-muted-brown text-sm max-w-xs mx-auto mt-1">Navegue pelas nossas essências e adicione as suas criações favoritas para presentear com amor.</p>
                    </div>
                    <button
                      onClick={onClose}
                      className="text-sm font-semibold uppercase tracking-wider bg-primary text-white border border-transparent px-6 py-3 rounded-xl transition-all shadow-sm cursor-pointer"
                    >
                      Continuar Navegando
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-high-blush/30">
                    {cartItems.map((item) => {
                      const soldOut = item.product.inStock === false;
                      const disabled = soldOut || item.unavailable;
                      return (
                      <div key={item.id} className={`py-4 flex gap-4 first:pt-0 last:pb-0 text-left ${disabled ? 'opacity-60' : ''}`}>

                        {/* Item image */}
                        <div className="w-20 h-20 bg-soft-blush rounded-xl overflow-hidden shrink-0 flex items-center justify-center border border-high-blush/20">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className={`w-full h-full object-cover ${disabled ? 'grayscale' : ''}`}
                          />
                        </div>

                        {/* Item descriptions */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <h3 className="font-editorial text-sm font-bold text-dark-brown leading-tight">
                                {item.product.name}
                              </h3>
                              <button
                                onClick={() => onRemoveItem(item.id)}
                                className="text-muted-brown hover:text-red-500 transition-colors cursor-pointer"
                                title="Remover item"
                              >
                                <Trash2 className="w-4 h-4 shrink-0" />
                              </button>
                            </div>

                            {item.unavailable ? (
                              <p className="text-xs uppercase tracking-wider font-bold text-red-600 mt-0.5">
                                Não está mais disponível — remova para continuar
                              </p>
                            ) : soldOut ? (
                              <p className="text-xs uppercase tracking-wider font-bold text-red-600 mt-0.5">
                                Esgotado — remova para continuar
                              </p>
                            ) : (
                              <p className="text-xs uppercase tracking-wider font-bold text-primary mt-0.5">
                                {item.product.category}
                                {item.selectedQuantity && ` • ${formatUnits(item.selectedQuantity.quantity)}`}
                              </p>
                            )}
                          </div>

                          {/* Quantities indicator and price */}
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center gap-1 border border-high-blush bg-white rounded-lg p-0.5 shadow-xs">
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:bg-soft-blush text-muted-brown rounded-md transition-colors shrink-0 disabled:opacity-40 cursor-pointer"
                                disabled={item.quantity <= 1 || disabled}
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="text-sm font-semibold text-dark-brown w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-soft-blush text-muted-brown rounded-md transition-colors shrink-0 disabled:opacity-40 cursor-pointer"
                                disabled={disabled}
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <span className="font-semibold text-primary text-sm text-right">
                              <FromPriceLabel className="block text-xs" />
                              R$ {(item.priceAtAddition * item.quantity).toFixed(2)}
                            </span>
                          </div>

                        </div>

                      </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Drawer footer with totals */}
              {cartItems.length > 0 && (
                <div className="p-6 bg-white border-t border-high-blush/35 space-y-4">
                  <div className="flex justify-between items-center text-left">
                    <div>
                      <p className="font-editorial text-lg font-bold text-dark-brown">Valor Total Estimado</p>
                      <p className="text-sm text-muted-brown">Entrega combinada via WhatsApp</p>
                    </div>
                    <p className="font-sans text-2xl font-bold tracking-tight text-primary text-right">
                      <FromPriceLabel className="block text-sm tracking-normal" />
                      R$ {subtotal.toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={handleCheckout}
                    id="cart-checkout-btn"
                    disabled={availableItems.length === 0}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-medium text-sm tracking-wide py-4 rounded-xl shadow-ambient hover:shadow-ambient-hover transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:pointer-events-none disabled:hover:translate-y-0"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    Enviar Pedido via WhatsApp
                  </button>

                  <p className="text-sm text-center text-dark-brown font-semibold leading-normal">
                    Os valores são &quot;a partir de&quot; e podem não ser o valor final. O valor definitivo é confirmado no atendimento pelo WhatsApp.
                  </p>

                  <p className="text-xs text-center text-muted-brown leading-normal">
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
