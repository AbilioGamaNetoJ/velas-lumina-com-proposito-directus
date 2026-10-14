import { Product, QuantityOption } from '@/types/types';

// Não existe compra de 1 unidade avulsa: todo produto é vendido em pacotes.
// Estas são as quantidades padrão oferecidas quando o produto não tem nenhuma cadastrada no Directus.
export const PRESET_QUANTITIES = [20, 50, 100, 250, 500, 1000] as const;
export const DEFAULT_MIN_QUANTITY = 20;

function roundCents(value: number): number {
  return Math.round(value * 100) / 100;
}

export function priceForQuantity(unitPrice: number, quantity: number): number {
  return roundCents(unitPrice * quantity);
}

export function formatUnits(quantity: number | string): string {
  return `${quantity} ${Number(quantity) === 1 ? 'unidade' : 'unidades'}`;
}

export function getQuantityOptions(product: Product): QuantityOption[] {
  if (product.quantityOptions && product.quantityOptions.length > 0) return product.quantityOptions;
  return PRESET_QUANTITIES.map((quantity) => ({
    quantity: String(quantity),
    price: priceForQuantity(product.price, quantity),
  }));
}

export function getMinQuantity(product: Product): number {
  return product.minQuantity && product.minQuantity > 0 ? product.minQuantity : DEFAULT_MIN_QUANTITY;
}

// Menor valor pelo qual o produto pode ser comprado (opção cadastrada ou quantidade mínima personalizada).
export function getStartingPrice(product: Product): number {
  const optionPrices = getQuantityOptions(product).map((option) => option.price);
  return Math.min(...optionPrices, priceForQuantity(product.price, getMinQuantity(product)));
}

// Opção cadastrada com essa quantidade, ou uma quantidade personalizada (>= mínimo do produto)
// precificada por quantidade × preço unitário. Retorna null se a quantidade não for comprável.
export function resolveQuantityOption(product: Product, quantity: number): QuantityOption | null {
  if (!Number.isInteger(quantity) || quantity < 1) return null;

  const registered = getQuantityOptions(product).find((option) => Number(option.quantity) === quantity);
  if (registered) return registered;

  if (quantity < getMinQuantity(product)) return null;
  return { quantity: String(quantity), price: priceForQuantity(product.price, quantity) };
}
