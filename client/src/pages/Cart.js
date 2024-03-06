import React from 'react';
import CartList from '../components/cart/CartList';
import { useSelector } from "react-redux";

export const Cart = () => {

    const cart = useSelector(state=> state.cart.cart);
    console.log("cart", cart);

    return (
        <>
            <section className='shopping__cart'>
                <div className='shopping__cart-container'>
                    <CartList cart={cart} />
                </div>
            </section>
        </>
    )
}
