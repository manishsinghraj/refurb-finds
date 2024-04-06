import { TOAST } from "./toastTypes";

const initialState = {
    toastMessage: null,
    toastType: null
};

export const toastReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOAST:
            return {
                ...state,
                toastMessage: action.payload.Tmessage,
                toastType: action.payload.Ttype
            };
            default:
            return state;
    }
};

