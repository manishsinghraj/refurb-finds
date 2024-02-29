import { ADD_TO_CART, UPDATE_CART_ITEM_QUANTITY } from "./cartTypes"

export const addToCart = (item) => {
    return {
        type: ADD_TO_CART,
        payload: item
    }
};

export const updateCartItemQuantity = (itemId, newQuantity) => {
    return {
        type: UPDATE_CART_ITEM_QUANTITY,
        payload: { itemId, newQuantity }
    }
};