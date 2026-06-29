'use client';

import { createContext, useContext } from 'react';
import type { SiteSettings } from '@/types/types';

const DEFAULT_SETTINGS: SiteSettings = {
  brand_name: 'Lumina Velas Artesanais',
  tagline: 'Feitas uma a uma, com as mãos e com carinho. É simples assim.',
  whatsapp_number: '5548988418141',
  whatsapp_default_message: 'Olá! Gostaria de mais informações sobre as velas Lumina.',
  instagram_url: 'https://www.instagram.com/lumina.velasartesanais/',
  contact_email: 'contato@luminavelas.com.br',
  seo_title: 'Lumina | Velas Artesanais & Feitas com Propósito',
  seo_description: 'Velas artesanais feitas à mão com cuidado e carinho.',
  og_image: '',
  footer_note: 'Lumina Velas Artesanais. Todos os direitos reservados.',
};

const SiteSettingsContext = createContext<SiteSettings>(DEFAULT_SETTINGS);

export function SiteSettingsProvider({
  settings,
  children,
}: {
  settings: SiteSettings;
  children: React.ReactNode;
}) {
  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings(): SiteSettings {
  return useContext(SiteSettingsContext);
}
