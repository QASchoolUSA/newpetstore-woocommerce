"use client";

import React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { useCart } from '../../context/CartContext';
import { WooCommerceProduct, CartItem } from '@/types/globals';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const ProductDetails: React.FC<{ product: WooCommerceProduct }> = ({ product }) => {
  const { addToCart, cartItems } = useCart();

  const handleAddToCart = () => {
    const item: CartItem = {
      id: product.id,
      title: product.name,
      description: product.description,
      price: product.price,
      quantity: 1,
      imageUrl: product.images[0]?.src || '/placeholder-image.png',
    };
    addToCart(item);
  };

  const itemInCart = cartItems.find(item => item.id === product.id);
  const imageUrl = product.images[0]?.src || '/placeholder-image.png';

	return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Top Section: Image and Product Details */}
      <div className="mb-16">
        {/* Image Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-square">
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Details Section */}
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold text-primary mb-6">
            ${product.price}
          </p>
          <div className="prose prose-neutral dark:prose-invert max-w-none mb-8 mx-auto">
            <p>Quick overview of the product goes here. This is a brief description that highlights the key features.</p>
          </div>
          <div className="space-y-4">
            <Button 
              onClick={handleAddToCart} 
              size="lg"
              className="w-full sm:w-64"
              data-testid={"add-to-cart"}
            >
              {itemInCart 
                ? `Add Another (${itemInCart.quantity} in cart)` 
                : 'Add to Cart'
              }
            </Button>
            <p className="text-sm text-muted-foreground">
              Free shipping on orders over $100
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section: Product Information Tabs */}
      <div className="border-t border-border pt-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="additional">Additional Information</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="prose prose-neutral dark:prose-invert max-w-none p-6">
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: DOMPurify.sanitize(product.description) 
                  }} 
                />
                <h2>Product Features</h2>
                <ul>
                  <li>Premium quality materials</li>
                  <li>Durable construction</li>
                  <li>Modern design</li>
                  <li>Versatile usage</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="additional" className="mt-6">
            <Card>
              <CardContent className="p-6">
                {product.attributes && product.attributes.length > 0 ? (
                  <dl className="divide-y divide-border">
                    {product.attributes.map(attribute => (
                      <div 
                        key={attribute.id} 
                        className="py-4 first:pt-0 last:pb-0"
                      >
                        <dt className="font-medium mb-2">{attribute.name}</dt>
                        <dd className="text-muted-foreground">
                          {attribute.options.join(', ')}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="text-muted-foreground">
                    No additional information available.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default ProductDetails;