import { ADD_TO_LIKE, REMOVE_FROM_LIKE } from "./likeTypes";

const initialState = {
    likedProducts: []
};

export const likeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_LIKE: {
            const newLikedProduct = { ...action.payload, liked: true };
           
            if (state.likedProducts.find(item => item.id === action.payload.id)) {
                return state; 
            }
            return {
                ...state,
                likedProducts: [...state.likedProducts, newLikedProduct]
            };
        }

        case REMOVE_FROM_LIKE: {
            const updatedLikedProducts = state.likedProducts.map(item =>
                item.id === action.payload ? { ...item, liked: false } : item
            );
            const updatedLikeItems = updatedLikedProducts.filter(item => item.id !== action.payload);

            return {
                ...state,
                likedProducts: updatedLikeItems
            };
        }

        default:
            return state;
    }
};
