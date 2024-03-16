import React from 'react';
import { MdDelete } from "react-icons/md";
import {  useDispatch, useSelector } from "react-redux";
import { removeCartItem, updateCartItemQuantity } from '../../redux/cart/cartActions';
import { postCartItems, removeCartItems } from '../../redux/cart/cartReducer';

export const CartCard = ({ item }) => {

    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.userDetails.userDetails);

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        dispatch(updateCartItemQuantity(item._id, newQuantity));
        dispatch(postCartItems(item._id, userDetails.user._id));
    }

    const handleRemoveCartItem = () => {
        dispatch(removeCartItem(item._id));
        dispatch(removeCartItems(item._id, userDetails.user._id));
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
                        <div><MdDelete className='icon' onClick={handleRemoveCartItem} /></div>
                    </div>
                </div>
            </div>
        </>
    )
}
