import { readItems } from '@directus/sdk';
import { directus, fileUrl } from '@/lib/directus';
import { PRODUCTS as localProducts } from '@/lib/data';
import { Product } from '@/types/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapItem(p: any): Product {
  return {
    id: p.slug,
    directusId: p.id,
    name: p.name,
    subtitle: p.subtitle ?? '',
    description: p.description ?? '',
    scents: p.scents ?? [],
    price: p.price,
    image: fileUrl(p.image),
    gallery: (p.gallery ?? []).map((g: { directus_files_id: string }) =>
      fileUrl(g.directus_files_id)
    ),
    category: p.category,
    featured: p.featured ?? false,
    inStock: p.in_stock ?? true,
    details: {
      weight: p.weight ?? undefined,
      burnTime: p.burn_time ?? undefined,
      dimensions: p.dimensions ?? undefined,
      essenceStrength: p.essence_strength ?? undefined,
    },
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    if (!process.env.NEXT_PUBLIC_DIRECTUS_URL) return localProducts;

    const items = await directus.request(
      readItems('products', {
        fields: [
          'id',
          'slug',
          'name',
          'subtitle',
          'description',
          'price',
          'category',
          'featured',
          'in_stock',
          'scents',
          'weight',
          'burn_time',
          'dimensions',
          'essence_strength',
          'image',
          'gallery.directus_files_id',
        ],
      })
    );

    const products = items.map(mapItem);
    return products.length > 0 ? products : localProducts;
  } catch (error) {
    console.warn('Falha ao buscar do Directus, usando fallback local:', error);
    return localProducts;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    if (!process.env.NEXT_PUBLIC_DIRECTUS_URL) {
      return localProducts.find((p) => p.id === slug) ?? null;
    }

    const items = await directus.request(
      readItems('products', {
        fields: [
          'id',
          'slug',
          'name',
          'subtitle',
          'description',
          'price',
          'category',
          'featured',
          'in_stock',
          'scents',
          'weight',
          'burn_time',
          'dimensions',
          'essence_strength',
          'image',
          'gallery.directus_files_id',
        ],
        filter: { slug: { _eq: slug } },
        limit: 1,
      })
    );

    return items.length > 0 ? mapItem(items[0]) : null;
  } catch (error) {
    console.warn('Falha ao buscar produto do Directus, usando fallback local:', error);
    return localProducts.find((p) => p.id === slug) ?? null;
  }
}
