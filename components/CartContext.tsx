/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import { createContext, useContext } from 'react';
import { useCart } from '@/lib/use-cart';
import { Product } from '@/types/types';

type CartContextValue = ReturnType<typeof useCart>;

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ products, children }: { products: Product[]; children: React.ReactNode }) {
  const cart = useCart(products);
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCartContext(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return ctx;
}
