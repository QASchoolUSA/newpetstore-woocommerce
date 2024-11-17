"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Products from '@/components/Products';
import ProductsFetcher from './ProductsFetcher';
import Filters from './Filters';
import { WooCommerceProduct } from '@/types/globals';

export default function ShopPage() {

  const [products, setProducts] = useState<WooCommerceProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([0, 100]);

  // Fetch products on component mount
  React.useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await ProductsFetcher();
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const withinPriceRange = Number(product.price) >= selectedPriceRange[0] && Number(product.price) <= selectedPriceRange[1];
    const matchesCategory = selectedCategory ? product.categories[0]?.name === selectedCategory : true;
    return withinPriceRange && matchesCategory;
  });

  return (
    <div className="flex flex-col md:flex-row">
      <aside className="w-full md:w-1/4 p-4 border-r">
        <Filters setSelectedCategory={setSelectedCategory} setSelectedPriceRange={setSelectedPriceRange} />
      </aside>
      <main className="w-full md:w-3/4 p-4">
        <h1 className="text-center text-3xl font-bold mb-6">Shop by Category</h1>
        <div className="grid">
          <Products products={filteredProducts} />
        </div>
      </main>
    </div>
  );
}
