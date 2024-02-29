import { ADD_TO_CART, UPDATE_CART_ITEM_QUANTITY } from "./cartTypes";

const initialState = {
    cart: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const itemToAdd = action.payload;

            const existingItem = state.cart.find(item => item.id === itemToAdd.id);

            if (existingItem) {
                const updatedCart = state.cart.map(item =>
                    item.id === existingItem.id ? { ...item, quantity: item.quantity + 1 } : item
                );
                return {
                    ...state,
                    cart: updatedCart,
                };
            } else {

                return {
                    ...state,
                    cart: [...state.cart, { ...itemToAdd, quantity: 1 }],
                };
            }

        case UPDATE_CART_ITEM_QUANTITY:
            const { itemId, newQuantity } = action.payload;

            const itemIndex = state.cart.findIndex(item => item.id === itemId);

            if (itemIndex !== -1) {
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
                // If the item does not exist in the cart, do nothing and return the current state
                return state;

            }

        default: return state;
    }
};

export default cartReducer;
