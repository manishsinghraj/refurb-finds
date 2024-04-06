import { ADD_TO_LIKE, REMOVE_FROM_LIKE } from "./likeTypes";
import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const initialState = {
    likedProductIds: JSON.parse(localStorage.getItem('likedProductIds')) || []
};


export const likeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_LIKE: {

            if (state.likedProductIds.find(id => id === action.payload)) {
                return state;
            }
            const nextState = {
                ...state,
                likedProductIds: [...state.likedProductIds, action.payload]
            };
            localStorage.setItem('likedProductIds', JSON.stringify(nextState.likedProductIds));
            return nextState;
        }

        case REMOVE_FROM_LIKE: {

            const updatedLikeItems = state.likedProductIds.filter(id => id !== action.payload);

            if (updatedLikeItems.length === 0) {
                localStorage.removeItem('likedProductIds');
            } else {
                localStorage.setItem('likedProductIds', JSON.stringify(updatedLikeItems));
            }

            return {
                ...state,
                likedProductIds: updatedLikeItems
            };
        }

        default:
            return state;
    }
};

//TODO:Debouncing 

export const postLikeItems = (likedProductId, userId) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const likeItemsData = {
        likedProductId: likedProductId,
        userId: userId
    }

    return async (dispatch) => {
        try {
            const response = await axios.post(API_BASE_URL + "user/likeitems/", likeItemsData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const userFromLocalStorage = localStorage.getItem('user');
            if (userFromLocalStorage !== "undefined") {
                localStorage.setItem('user', JSON.stringify(response.data))
            }

        } catch (error) {
            console.log("Error posting liked items:", error);
        }
    }
}


export const removeLikeItems = (likedProductId, userId) => {
    const token = JSON.parse(localStorage.getItem('token'));
        const likeItemsData = {
        likedProductId: likedProductId,
        userId: userId
    };

    return async (dispatch) => {
        try {
            const response = await axios.patch(API_BASE_URL + "user/likeitems/", likeItemsData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const userFromLocalStorage = localStorage.getItem('user');
            if (userFromLocalStorage !== "undefined") {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
        } catch (error) {
            console.log("Error removing liked item:", error);
        }
    };
};
