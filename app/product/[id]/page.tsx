import { notFound } from 'next/navigation';
import { WooCommerceProduct } from '@/types/globals';
import React from 'react';
import ProductDetails from './ProductDetails';

async function getProduct(id: string): Promise<WooCommerceProduct | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WOOCOMMERCE_API_URL}/products/${id}`, {
    headers: {
      'Authorization': `Basic ${Buffer.from(`${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET}`).toString('base64')}`,
    },
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error('Unable to retrieve a product.');
  }

  const json = await res.json();
  return json;
}

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />
};

export default ProductPage;