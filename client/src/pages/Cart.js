import React from 'react';
import CartList from '../components/cart/CartList';
import { useSelector } from "react-redux";

export const Cart = () => {
    const cart = useSelector(state => state.cart.cart); // has only _id and quantity
    const products = useSelector((state) => state.data.products);

    // Mapping through products and add quantity field from cart for each corresponding product
    const cartDetails = products.map((product) => {
        const cartItem = cart.find((item) => item._id === product._id);
        if (cartItem) {
            return { ...product, quantity: cartItem.quantity };
        }
        return null; 
    }).filter(Boolean); //get only product which is in list
    
    return (
        <>
            <section className='shopping__cart'>
                <div className='shopping__cart-container'>
                    <CartList cartDetails={cartDetails} />
                </div>
            </section>
        </>
    );
}
