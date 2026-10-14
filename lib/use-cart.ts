'use client';

import { useEffect, useRef, useState } from 'react';
import { CartItem, Product, QuantityOption } from '@/types/types';
import { resolveQuantityOption } from '@/lib/quantities';

const STORAGE_KEY = 'lumina-velas-cart';

function findLiveProduct(products: Product[], item: CartItem): Product | undefined {
  if (item.product?.directusId != null) {
    const byId = products.find((p) => p.directusId != null && p.directusId === item.product.directusId);
    if (byId) return byId;
  }
  // Legacy cart entries (persisted before directusId existed) fall back to slug matching.
  return products.find((p) => p.id === item.product?.id);
}

export function useCart(products: Product[]) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const hydrated = useRef(false);
  const productsRef = useRef(products);
  productsRef.current = products;

  // Hydrates empty to avoid SSR mismatch, then loads from localStorage and
  // reconciles each snapshot against the live product list in one pass — a
  // product renamed/repriced/discontinued in Directus is reflected immediately,
  // even for items a returning visitor already had sitting in their cart.
  useEffect(() => {
    try {
      const persisted = localStorage.getItem(STORAGE_KEY);
      if (persisted) {
        const parsed: CartItem[] = JSON.parse(persisted);
        const liveProducts = productsRef.current;
        const reconciled = parsed.map((item) => {
          const fresh = findLiveProduct(liveProducts, item);
          if (!fresh) return { ...item, unavailable: true };
          // Itens sem quantidade escolhida são compras avulsas de 1 unidade (anteriores à venda
          // apenas por pacotes) — não têm mais como ser precificados, então ficam indisponíveis.
          const option = item.selectedQuantity
            ? resolveQuantityOption(fresh, Number(item.selectedQuantity.quantity))
            : null;
          if (!option) return { ...item, product: fresh, unavailable: true };
          return { ...item, product: fresh, selectedQuantity: option, priceAtAddition: option.price, unavailable: false };
        });
        setCartItems(reconciled);
      }
    } catch (e) {
      // ignore
    } finally {
      hydrated.current = true;
    }
    // Reconciliation only needs to run once per mount, against whichever
    // products snapshot this page loaded with (captured via productsRef).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist cart updates
  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      // safe backup omission
    }
  }, [cartItems]);

  const addToCart = (product: Product, selectedQuantity: QuantityOption) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product?.id === product.id && item.selectedQuantity?.quantity === selectedQuantity.quantity
      );
      if (existing) {
        return prev.map((item) =>
          item === existing
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        id: `standard-${product.id}-${selectedQuantity.quantity}-${Date.now()}`,
        product,
        quantity: 1,
        priceAtAddition: selectedQuantity.price,
        selectedQuantity,
      }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (itemId: string, newQty: number) => {
    if (newQty < 1) return;
    setCartItems((prev) =>
      prev.map((item) => item.id === itemId ? { ...item, quantity: newQty } : item)
    );
  };

  const removeItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    cartCount,
    isCartOpen,
    openCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false),
  };
}
