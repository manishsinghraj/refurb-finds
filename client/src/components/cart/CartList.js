import React from 'react';
import { CartCard } from './CartCard';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CartList = ({ cartDetails }) => {

    const subTotal = cartDetails?.reduce((total, item) => total + (item.price * item.quantity), 0);
    const userDetails = useSelector((state) => state.userDetails.userDetails);
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (!userDetails) {
            navigate("/signin");
        } else {
            navigate("/shipping");
        }
    }
    

    return (
        <div className='shopping__cart-items'>
            {cartDetails && cartDetails.length > 0 ? (
                <>
                    <h1 className='cart-heading'>Cart Items 🛒</h1>
                    {cartDetails.map((item, _) => {
                        return <CartCard key={item.id} item={item} />;
                    })}
                    <div className='shopping__cart-subtotal'>
                        <h2>SubTotal ({cartDetails.length} items): ₹ {subTotal}</h2>
                    </div>
                    <div className='checkout'>
                        <button className='checkout-btn' onClick={handleCheckout}>Checkout</button>
                    </div>
                </>
            ) : (
                <h2 className='cart-heading'>Looks like our cart took a detour to the land of emptiness! 😕</h2>
            )}
        </div>
    );
};

export default CartList;
