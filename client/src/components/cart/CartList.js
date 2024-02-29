import React from 'react';
import { CartCard } from './CartCard';

const CartList = ({ cart }) => {
    const subTotal = cart?.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className='shopping__cart-items'>
            {cart && cart.length > 0 ? (
                <>
                    {cart.map((item, index) => {
                        return <CartCard key={item.id} item={item} />;
                    })}
                    <div className='shopping__cart-subtotal'>
                        <h2>SubTotal ({cart.length} items): ₹ {subTotal}</h2>
                    </div>
                </>
            ) : (
                <h2>Cart is Empty</h2>
            )}
        </div>
    );
};

export default CartList;
