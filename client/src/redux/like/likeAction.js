import { ADD_TO_LIKE, REMOVE_FROM_LIKE } from "./likeTypes"

export const addToLike = (likedItemId) => {
    return {
        type: ADD_TO_LIKE,
        payload: likedItemId
    }
}


export const removeFromLike = (likedItemIndex) => {
    return {
        type: REMOVE_FROM_LIKE,
        payload: likedItemIndex
    }
}