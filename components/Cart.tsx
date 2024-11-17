import React from 'react';
import { useCart } from '@/app/context/CartContext';
import { Button } from '@/components/ui/button';

const Cart = () => {
    const { cartItems, increaseQuantity, decreaseQuantity } = useCart();

    if (cartItems.length === 0) {
        return <p>Your cart is empty.</p>;
    }

    return (
        <div>
            {cartItems.map((item) => (
                <div key={item.id} className="flex items-center">
                    <p>{item.title}</p>
                    <div className="flex items-center">
                        <Button onClick={() => decreaseQuantity(item.id)}>-</Button>
                        <span>{item.quantity}</span>
                        <Button onClick={() => increaseQuantity(item.id)}>+</Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Cart;