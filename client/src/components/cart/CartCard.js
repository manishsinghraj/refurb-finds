import React from 'react';
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { updateCartItemQuantity } from '../../redux/cart/cartActions';

export const CartCard = ({ item }) => {

    const dispatch = useDispatch();

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        dispatch(updateCartItemQuantity(item.id, newQuantity));
    }

    return (
        <>
            <div className='shopping__cart-item'>
                <div className='shopping__cart-item-image'>
                    <img src={item.images[0]} alt={item.title}></img>
                </div>
                <div className='shopping__cart-item-details'>
                    <h1>{item.title}</h1>
                    <label htmlFor="quantity">Qty </label>
                    <select name='quantity' id='quantity' value={item.quantity} onChange={handleQuantityChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <div className='shopping__cart-item-price'>
                    <div >
                        <span>₹ {item.price}</span>
                        <div><MdDelete className='icon' /></div>
                    </div>
                </div>
            </div>
        </>
    )
}
