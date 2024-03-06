import { ADD_TO_LIKE } from "./likeTypes"

export const addToLike = (likedItem) => {
    return {
        type: ADD_TO_LIKE,
        payload: likedItem
    }
}