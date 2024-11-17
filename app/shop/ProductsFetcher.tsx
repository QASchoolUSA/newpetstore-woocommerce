import { WooCommerceProduct } from '../../types/globals';
import { getProducts } from '@/lib/woocommerce';

export default async function ProductsFetcher() {
  const products: WooCommerceProduct[] = await getProducts();
  return products;
} 