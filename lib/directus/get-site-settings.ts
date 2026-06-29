import { readSingleton } from '@directus/sdk';
import { directus, fileUrl } from '@/lib/directus';
import type { SiteSettings } from '@/types/types';

const FALLBACK: SiteSettings = {
  brand_name: 'Lumina Velas Artesanais',
  tagline: 'Feitas uma a uma, com as mãos e com carinho. É simples assim.',
  whatsapp_number: '5548988418141',
  whatsapp_default_message: 'Olá! Gostaria de mais informações sobre as velas Lumina.',
  instagram_url: 'https://www.instagram.com/lumina.velasartesanais/',
  contact_email: 'contato@luminavelas.com.br',
  seo_title: 'Lumina | Velas Artesanais & Feitas com Propósito',
  seo_description: 'Velas artesanais feitas à mão com cuidado e carinho. Cada peça é única, personalizada com aromas exclusivos para iluminar seus momentos mais especiais.',
  og_image: '',
  footer_note: 'Lumina Velas Artesanais. Todos os direitos reservados.',
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    if (!process.env.NEXT_PUBLIC_DIRECTUS_URL) return FALLBACK;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await directus.request(readSingleton('site_settings' as any));
    if (!data) return FALLBACK;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const s = data as any;
    return {
      brand_name: s.brand_name ?? FALLBACK.brand_name,
      tagline: s.tagline ?? FALLBACK.tagline,
      whatsapp_number: s.whatsapp_number ?? FALLBACK.whatsapp_number,
      whatsapp_default_message: s.whatsapp_default_message ?? FALLBACK.whatsapp_default_message,
      instagram_url: s.instagram_url ?? FALLBACK.instagram_url,
      contact_email: s.contact_email ?? FALLBACK.contact_email,
      seo_title: s.seo_title ?? FALLBACK.seo_title,
      seo_description: s.seo_description ?? FALLBACK.seo_description,
      og_image: fileUrl(s.og_image),
      footer_note: s.footer_note ?? FALLBACK.footer_note,
    };
  } catch (err) {
    console.warn('Falha ao buscar site_settings do Directus, usando fallback:', err);
    return FALLBACK;
  }
}
