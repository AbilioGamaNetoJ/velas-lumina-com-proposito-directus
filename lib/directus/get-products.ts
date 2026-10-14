import { readItems } from '@directus/sdk';
import { directus, fileUrl } from '@/lib/directus';
import { PRODUCTS as localProducts } from '@/lib/data';
import { Product, QuantityOption } from '@/types/types';
import { DEFAULT_MIN_QUANTITY, priceForQuantity } from '@/lib/quantities';

// Valor da opção "Valor personalizado" no campo `quantidades` (repeater) do Directus.
const CUSTOM_QUANTITY_CHOICE = 'personalizado';

interface QuantityRow {
  quantidade?: string | null;
  quantidade_personalizada?: number | null;
  preco?: number | null;
}

// Converte as linhas do repeater `quantidades` em opções de compra, ordenadas da menor para a maior.
// Linhas "Valor personalizado" abaixo da quantidade mínima do produto são descartadas.
function mapQuantityOptions(
  rows: QuantityRow[] | null | undefined,
  unitPrice: number,
  minQuantity: number,
  slug: string
): QuantityOption[] {
  const byQuantity = new Map<number, QuantityOption>();

  for (const row of rows ?? []) {
    const isCustom = row.quantidade === CUSTOM_QUANTITY_CHOICE;
    const quantity = Number(isCustom ? row.quantidade_personalizada : row.quantidade);
    if (!Number.isInteger(quantity) || quantity < 1) continue;

    if (isCustom && quantity < minQuantity) {
      console.warn(`Produto "${slug}": quantidade personalizada ${quantity} ignorada (mínimo é ${minQuantity}).`);
      continue;
    }
    if (byQuantity.has(quantity)) continue;

    const price = row.preco != null && row.preco > 0 ? Number(row.preco) : priceForQuantity(unitPrice, quantity);
    byQuantity.set(quantity, { quantity: String(quantity), price });
  }

  return [...byQuantity.values()].sort((a, b) => Number(a.quantity) - Number(b.quantity));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapItem(p: any): Product {
  const minQuantity = p.quantidade_minima > 0 ? Number(p.quantidade_minima) : DEFAULT_MIN_QUANTITY;

  return {
    id: p.slug,
    directusId: p.id,
    name: p.nome,
    subtitle: p.descricao ?? '',
    description: p.descricao_detalhada ?? '',
    productDescription: p.descricao_produto ?? undefined,
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
      dimensions: p.dimensoes ?? undefined,
      burnTime: p.tempo_queima ?? undefined,
    },
    quantityOptions: mapQuantityOptions(p.quantidades, p.preco, minQuantity, p.slug),
    minQuantity,
  };
}

const PRODUCT_FIELDS = [
  'id',
  'slug',
  'nome',
  'descricao',
  'descricao_detalhada',
  'descricao_produto',
  'preco',
  'categoria.slug',
  'destaque',
  'ativo',
  'sem_estoque',
  'peso',
  'dimensoes',
  'tempo_queima',
  'imagem',
  'imagens.directus_files_id',
  'quantidades',
  'quantidade_minima',
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
