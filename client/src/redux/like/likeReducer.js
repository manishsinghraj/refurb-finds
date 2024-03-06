import { ADD_TO_LIKE } from "./likeTypes"


const initialState = {
    likedProducts: []
}


export const likeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_LIKE: {
            return {
                ...state,
                likedProducts: [...state.likedProducts, action.payload]
            }
        }

        default: return state
    }
}