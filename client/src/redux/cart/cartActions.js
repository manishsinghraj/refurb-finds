import { ADD_TO_CART, REMOVE_CART_ITEM, UPDATE_CART_ITEM_QUANTITY } from "./cartTypes"

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

export const removeCartItem = (itemId) => {
    return {
        type : REMOVE_CART_ITEM,
        payload : itemId
    }
}