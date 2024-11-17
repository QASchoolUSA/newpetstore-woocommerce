'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WooCommerceProduct } from '../types/globals';
import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';

interface ProductsProps {
    products: WooCommerceProduct[];
}

const Products: React.FC<ProductsProps> = React.memo(({ products }) => {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    return (
        <div className="card products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product: WooCommerceProduct) => (
                <Card key={product.id} >
                    <Image className='container' src={`${product.images[0].src}`} alt={product.name} width={250} height={250} />
                    <CardHeader>
                        <CardTitle className='text-md font-bold text-center'>
                            <Link href={`/product/${product.id}`} data-testid={`card-${product.id}`}>{product.name}</Link>
                        </CardTitle>
                        <CardDescription className='text-sm text-center'>
                            ${product.price}
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button className='w-full' onClick={(event) => {
                            event.stopPropagation();
                            if (isAdding) return;
                            setIsAdding(true);
                            addToCart({
                                id: product.id,
                                title: product.name,
                                price: product.price,
                                quantity: 1,
                                imageUrl: product.images[0].src,
                                description: product.description
                            });
                            setIsAdding(false);
                        }}>Add to cart</Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
});

export default Products;
