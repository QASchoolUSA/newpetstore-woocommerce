"use client"

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../context/CartContext'; // Import the useCart hook

const stripePromise = loadStripe('pk_test_51QKbzFAXU5A1su1XqL9XiwhfowM0DUuZC1hAJC1jNjx2KySwCgWiHNpz3MhlZP3QMhKSyf1Xrkflu2s5W3Tyq4X700rWjq0u1O');

const CheckoutPage: React.FC = () => {
  const { cartItems } = useCart(); // Access cart items from context
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare items for Stripe Checkout
    const items = cartItems.map(product => ({
      price_data: {
        currency: 'usd', // Set the currency
        product_data: {
          name: product.title,
          description: product.description,
        },
        unit_amount: Math.round(Number(product.price) * 100), // Convert to cents and round to nearest integer
      },
      quantity: quantity, // Use the quantity specified
    }));

    // Create checkout session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Error creating checkout session:', error);
      alert('Failed to create checkout session. Please try again.');
      return;
    }

    const session = await response.json();
    const stripe = await stripePromise; // Wait for Stripe to load
    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Cart Items:</h2>
          <ul>
            {cartItems.length > 0 ? (
              cartItems.map(product => (
                <li key={product.id}>
                  {product.name} - ${product.price} x {quantity}
                </li>
              ))
            ) : (
              <li>No items in the cart.</li>
            )}
          </ul>
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded p-2">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
