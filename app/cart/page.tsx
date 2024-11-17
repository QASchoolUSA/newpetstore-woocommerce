"use client"

import React from 'react';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem } from '@/types/globals';
import Link from 'next/link';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, clearCart, addToCart, isLoading, decreaseQuantity } = useCart();

  if (isLoading) {
    return <div className="container mx-auto py-8 text-center">Loading cart...</div>;
  }

  const handleRemove = (id: number) => {
    removeFromCart(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const calculateTotal = () => {
    return cartItems.reduce((total: number, item: CartItem) => 
      total + Number(item.price) * Number(item.quantity), 0);
  };

  const handleUpdateQuantity = (item: CartItem, change: number) => {
    if (change < 0) {
      decreaseQuantity(item.id);
    } else {
      const newQuantity = item.quantity + change;
      addToCart({ ...item, quantity: newQuantity });
    }
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold py-4 text-center bg-gray-100 w-full">Your Cart</h1>
      <div className="container mx-auto py-8 flex-grow">
        {cartItems.length === 0 ? (
          <p className="text-xl text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center border-b border-gray-200 py-4">
                  <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.title}</h3>
                        <p className="ml-4">${(Number(item.price) * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item, -1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={() => handleRemove(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:w-1/3">
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Subtotal</p>
                    <p className="text-sm font-medium text-gray-900">${calculateTotal().toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Shipping</p>
                    <p className="text-sm font-medium text-gray-900">$0.00</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <p className="text-base font-medium text-gray-900">Total</p>
                    <p className="text-base font-medium text-gray-900">${calculateTotal().toFixed(2)}</p>
                  </div>
                </div>
                <Button className="w-full mt-6">
                  <Link href="/checkout">Proceed to checkout</Link>
                </Button>
                <Button variant="outline" className="w-full mt-4" onClick={handleClearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;