import React from 'react';
import dynamic from 'next/dynamic';
import Products from '@/components/Products';
import { getProducts } from '@/lib/woocommerce';

export const revalidate = 10; // revalidate page every hour

const SwiperComponent = dynamic(() => import('../components/Swiper'), {
  ssr: true,
});

export default async function Home() {
  const products = await getProducts();
  return (
    <main className="flex min-h-screen flex-col items-center overflow-hidden">
      {/* <h1 className='text-center font-semibold text-xl antialiased py-4'>Welcome to New Pet Store</h1> */}
        <SwiperComponent />
      <Products products={products}/>
    </main>
  );
}