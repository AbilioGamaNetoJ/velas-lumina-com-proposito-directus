import { createDirectus, rest, staticToken } from '@directus/sdk';

export const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL ?? '';

const baseClient = createDirectus(DIRECTUS_URL).with(rest());

// Sem DIRECTUS_TOKEN, as requisições saem sem Authorization e dependem da
// role Public do Directus ter permissão de leitura nas collections consultadas.
export const directus = process.env.DIRECTUS_TOKEN
  ? baseClient.with(staticToken(process.env.DIRECTUS_TOKEN))
  : baseClient;

export const fileUrl = (id?: string | null): string =>
  id ? `${DIRECTUS_URL}/assets/${id}` : '';
