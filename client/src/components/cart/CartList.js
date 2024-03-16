import React from 'react';
import { CartCard } from './CartCard';

const CartList = ({ cartDetails }) => {

    const subTotal = cartDetails?.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className='shopping__cart-items'>
            {cartDetails && cartDetails.length > 0 ? (
                <>
                    {cartDetails.map((item, _) => {
                        return <CartCard key={item.id} item={item} />;
                    })}
                    <div className='shopping__cart-subtotal'>
                        <h2>SubTotal ({cartDetails.length} items): ₹ {subTotal}</h2>
                    </div>
                </>
            ) : (
                <h2 className='cart-heading'>Looks like our cart took a detour to the land of emptiness! 😕</h2>
            )}
        </div>
    );
};

export default CartList;
