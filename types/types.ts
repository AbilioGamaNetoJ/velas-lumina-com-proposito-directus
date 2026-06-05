/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  scents: string[];
  price: number;
  image: string;
  gallery?: string[];
  category: 'velas' | 'arranjos' | 'kits';
  details?: {
    weight?: string;
    burnTime?: string;
    dimensions?: string;
    essenceStrength?: 'Suave' | 'Média' | 'Intensa';
  };
  featured?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  priceAtAddition: number;
}
