import { readItems } from '@directus/sdk';
import { directus } from '@/lib/directus';
import type { Category } from '@/types/types';

const FALLBACK: Category[] = [
  { id: 1, name: 'Velas', slug: 'velas', sort: 1 },
  { id: 2, name: 'Arranjos', slug: 'arranjos', sort: 2 },
  { id: 3, name: 'Kits', slug: 'kits', sort: 3 },
];

export async function getCategories(): Promise<Category[]> {
  try {
    if (!process.env.NEXT_PUBLIC_DIRECTUS_URL) return FALLBACK;

    const items = await directus.request(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      readItems('categories' as any, { fields: ['id', 'name', 'slug', 'sort'], sort: ['sort'] })
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cats = (items as any[]).map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      sort: c.sort ?? 0,
    }));

    return cats.length > 0 ? cats : FALLBACK;
  } catch (err) {
    console.warn('Falha ao buscar categories do Directus, usando fallback:', err);
    return FALLBACK;
  }
}
