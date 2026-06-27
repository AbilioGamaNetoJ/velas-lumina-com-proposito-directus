import { createDirectus, rest, staticToken } from '@directus/sdk';

export const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL ?? '';

export const directus = createDirectus(DIRECTUS_URL)
  .with(staticToken(process.env.DIRECTUS_TOKEN ?? ''))
  .with(rest());

export const fileUrl = (id?: string | null): string =>
  id ? `${DIRECTUS_URL}/assets/${id}` : '';
