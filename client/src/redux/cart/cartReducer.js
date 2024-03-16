import { ADD_TO_CART, REMOVE_CART_ITEM, UPDATE_CART_ITEM_QUANTITY } from "./cartTypes";
import axios from "axios";

const initialState = {
    cart: JSON.parse(localStorage.getItem('user'))?.user.cartItems || [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:

            const existingItemId = state.cart.find(item => item._id === action.payload);

            if (existingItemId) {
                const updatedCart = state.cart.map(item =>
                    item._id === existingItemId._id ? { ...item, quantity: item.quantity + 1 } : item
                );
                return {
                    ...state,
                    cart: updatedCart,
                };
            } else {

                return {
                    ...state,
                    cart: [...state.cart, { _id: action.payload, quantity: 1 }],
                };
            }

        case UPDATE_CART_ITEM_QUANTITY:
            const { itemId, newQuantity } = action.payload;
            const itemIndex = state.cart.findIndex(item => item._id === itemId);

            if (itemIndex !== -1) {
                const updatedCart = [...state.cart];
                updatedCart[itemIndex] = {
                    ...updatedCart[itemIndex],
                    quantity: newQuantity
                };
                return {
                    ...state,
                    cart: updatedCart
                };
            }
            return state;


        case REMOVE_CART_ITEM:

            const updatedCart = state.cart.filter((item) => (item._id !== action.payload));
            return {
                ...state,
                cart: updatedCart
            }

        default: return state;
    }
};

//TODO:Debouncing 

export const postCartItems = (cartItemId, userId) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const cartDetails = state.cart.cart.filter(item => item._id === cartItemId);

            const cartItemsData = {
                cartItemId: cartItemId,
                cartDetails: cartDetails,
                userId: userId
            };

            const response = await axios.post("http://localhost:5000/api/user/cartitems/", cartItemsData);
            const userFromLocalStorage = localStorage.getItem('user');
            if (userFromLocalStorage !== "undefined") {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
        } catch (error) {
            console.log("Error posting cart items:", error);
        }
    };
};


export const removeCartItems = (cartItemId, userId) => {

    const cartItemsData = {
        cartItemId: cartItemId,
        userId: userId
    };

    return async (dispatch) => {
        try {
            const response = await axios.patch("http://localhost:5000/api/user/cartitems/", cartItemsData);
            const userFromLocalStorage = localStorage.getItem('user');
            if (userFromLocalStorage !== "undefined") {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
        } catch (error) {
            console.log("Error removing cart item:", error);
        }
    };
};


export default cartReducer;
