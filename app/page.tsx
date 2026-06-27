import { getProducts } from '@/lib/directus/get-products';
import HomeClient from '@/components/HomeClient';

export const revalidate = 3600; // revalidate at most every hour

export default async function Page() {
  const products = await getProducts();
  return <HomeClient products={products} />;
}
