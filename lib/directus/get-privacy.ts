import { readSingleton } from '@directus/sdk';
import { directus } from '@/lib/directus';
import type { PrivacyPolicy } from '@/types/types';

export async function getPrivacyPolicy(): Promise<PrivacyPolicy | null> {
  try {
    if (!process.env.NEXT_PUBLIC_DIRECTUS_URL) return null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await directus.request(readSingleton('privacy_policy' as any));
    if (!data) return null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const p = data as any;
    if (!p.title) return null;

    return {
      title: p.title,
      last_updated: p.last_updated ?? '',
      body: p.body ?? '',
    };
  } catch (err) {
    console.warn('Falha ao buscar privacy_policy do Directus:', err);
    return null;
  }
}
