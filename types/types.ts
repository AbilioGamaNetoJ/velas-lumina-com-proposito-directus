/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface QuantityOption {
  quantity: string;
  price: number;
}

export interface Product {
  id: string;
  directusId?: string | number;
  name: string;
  subtitle: string;
  description: string;
  productDescription?: string;
  price: number;
  image: string;
  gallery?: string[];
  category: string;
  details?: {
    weight?: string;
    dimensions?: string;
    burnTime?: string;
  };
  quantityOptions?: QuantityOption[];
  minQuantity?: number;
  featured?: boolean;
  inStock?: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  sort: number;
}

export interface SiteSettings {
  brand_name: string;
  tagline: string;
  whatsapp_number: string;
  whatsapp_default_message: string;
  instagram_url: string;
  contact_email: string;
  seo_title: string;
  seo_description: string;
  og_image: string;
  footer_note: string;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
  sort: number;
}

export interface PrivacyPolicy {
  title: string;
  last_updated: string;
  body: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  priceAtAddition: number;
  selectedQuantity?: QuantityOption;
  unavailable?: boolean;
}
