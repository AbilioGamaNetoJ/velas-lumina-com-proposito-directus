import { readItems } from '@directus/sdk';
import { directus, fileUrl } from '@/lib/directus';
import { PRODUCTS as localProducts } from '@/lib/data';
import { Product } from '@/types/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapItem(p: any): Product {
  return {
    id: p.slug,
    directusId: p.id,
    name: p.nome,
    subtitle: p.descricao ?? '',
    description: p.descricao_detalhada ?? '',
    scents: p.aromas ?? [],
    price: p.preco,
    image: fileUrl(p.imagem),
    gallery: (p.imagens ?? []).map((g: { directus_files_id: string }) =>
      fileUrl(g.directus_files_id)
    ),
    category: p.categoria?.slug ?? '',
    featured: p.destaque ?? false,
    inStock: !(p.sem_estoque ?? false),
    details: {
      weight: p.peso ?? undefined,
      burnTime: p.tempo_queima ?? undefined,
      dimensions: p.dimensoes ?? undefined,
      essenceStrength: p.intensidade_aroma ?? undefined,
    },
  };
}

const PRODUCT_FIELDS = [
  'id',
  'slug',
  'nome',
  'descricao',
  'descricao_detalhada',
  'preco',
  'categoria.slug',
  'destaque',
  'ativo',
  'sem_estoque',
  'aromas',
  'peso',
  'tempo_queima',
  'dimensoes',
  'intensidade_aroma',
  'imagem',
  'imagens.directus_files_id',
] as const;

export async function getProducts(): Promise<Product[]> {
  try {
    if (!process.env.NEXT_PUBLIC_DIRECTUS_URL) return localProducts;

    const items = await directus.request(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      readItems('produtos' as any, {
        fields: PRODUCT_FIELDS as unknown as string[],
        filter: { ativo: { _eq: true } },
        sort: ['ordem'],
      })
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const products = (items as any[]).map(mapItem);
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      readItems('produtos' as any, {
        fields: PRODUCT_FIELDS as unknown as string[],
        filter: { slug: { _eq: slug } },
        limit: 1,
      })
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const list = items as any[];
    return list.length > 0 ? mapItem(list[0]) : null;
  } catch (error) {
    console.warn('Falha ao buscar produto do Directus, usando fallback local:', error);
    return localProducts.find((p) => p.id === slug) ?? null;
  }
}
