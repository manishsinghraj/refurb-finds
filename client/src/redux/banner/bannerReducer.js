import { NEXT, PREVIOUS } from "./bannerTypes";


const initialState = {
    slide: 0
}

const bannerReducer = (state = initialState, action) => {
    switch (action.type) {
        case PREVIOUS:
            return {
                ...state,
                slide: (state.slide === 0 ? action.payload.length - 1 : state.slide - 1)
            }

        case NEXT:
            return {
                ...state,
                slide: (state.slide === action.payload.length - 1 ? 0 : state.slide + 1)
            }

        default: return state
    }
}

export default bannerReducer;