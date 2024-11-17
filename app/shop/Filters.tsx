"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Slider } from "@/components/ui/slider"

interface FiltersProps {
  setSelectedCategory: (category: string) => void;
  setSelectedPriceRange: (range: number[]) => void;
}

const Filters: React.FC<FiltersProps> = ({ setSelectedCategory, setSelectedPriceRange }) => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);

  useEffect(() => {
    setSelectedPriceRange(priceRange);
  }, [priceRange, setSelectedPriceRange]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Filters</h2>
      <div>
        <h3 className="text-lg font-semibold mb-2">Categories</h3>
        <ul className="list-disc ml-6">
          <li><Link href="/shop/dogs" onClick={() => setSelectedCategory('Dogs')}>Dogs</Link></li>
          <li><Link href="/shop/cats" onClick={() => setSelectedCategory('Cats')}>Cats</Link></li>
          <li><Link href="/shop/birds" onClick={() => setSelectedCategory('Birds')}>Birds</Link></li>
          <li><Link href="/shop/reptiles" onClick={() => setSelectedCategory('Reptiles')}>Reptiles</Link></li>
        </ul>
      </div>
      <div className="my-4">
        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={100}
          step={1}
          className="mb-4"
        />
        <div className="text-sm text-gray-600">
          Selected Price Range: ${priceRange[0]} - ${priceRange[1]}
        </div>
      </div>
    </div>
  );
};

export default Filters; 