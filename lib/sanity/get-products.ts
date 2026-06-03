import { client } from './client';
import { PRODUCTS as localProducts } from '@/lib/data';
import { Product } from '@/types/types';

export async function getProducts(): Promise<Product[]> {
  try {
    // If no real project ID is configured, fail fast and use local data
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === undefined) {
      return localProducts;
    }

    const query = `*[_type == "product" && defined(slug.current)] {
      _id,
      "id": slug.current,
      name,
      subtitle,
      description,
      scents,
      price,
      "image": image.asset->url,
      "gallery": gallery[].asset->url,
      category,
      featured,
      details {
        weight,
        burnTime,
        dimensions,
        essenceStrength
      }
    }`;
    const products = await client.fetch(query);
    
    // Return sanity data if available, otherwise local
    return products.length > 0 ? products : localProducts;
  } catch (error) {
    console.warn('Failed to fetch from Sanity, using local fallback:', error);
    return localProducts;
  }
}
