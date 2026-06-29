import { getProducts } from '@/lib/directus/get-products';
import { getCategories } from '@/lib/directus/get-categories';
import { getFaqs } from '@/lib/directus/get-faqs';
import { getSiteSettings } from '@/lib/directus/get-site-settings';
import { SiteSettingsProvider } from '@/components/SiteSettingsContext';
import HomeClient from '@/components/HomeClient';

export const revalidate = 3600;

export default async function Page() {
  const [products, categories, faqs, settings] = await Promise.all([
    getProducts(),
    getCategories(),
    getFaqs(),
    getSiteSettings(),
  ]);

  return (
    <SiteSettingsProvider settings={settings}>
      <HomeClient products={products} categories={categories} faqs={faqs} />
    </SiteSettingsProvider>
  );
}
