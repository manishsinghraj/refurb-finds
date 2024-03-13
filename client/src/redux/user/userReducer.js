import axios from "axios";
import { REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, SIGN_OUT_USER } from "./userTypes"
import { registerUserFailure, registerUserRequest, registerUserSuccess } from "./userAction";

const initialState = {
    loading: false,
    user: JSON.parse(localStorage.getItem('user')) || null,
    error: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                user: null
            };

        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: null
            };

        case REGISTER_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                user: null
            };

        case SIGN_OUT_USER:
            localStorage.removeItem('user')
            return {
                ...state,
                loading: false,
                error: null,
                user: null
            };

        default:
            return state;
    }
}

export default userReducer;

export const registerUser = (userData) => {
    return async (dispatch) => {
        dispatch(registerUserRequest());
        try {
            const response = await axios.post("http://localhost:5000/api/user/register/", userData);
            const newUser = response.data;
            dispatch(registerUserSuccess(newUser));
            localStorage.setItem('user', JSON.stringify(newUser));
        } catch (error) {
            let errorMessage;
            if (error?.response?.data?.message?.code === 11000) {
                errorMessage = "Phone number already exists!";
            } else {
                errorMessage = error?.response?.data?.message;
                if (typeof errorMessage === 'object') {
                    errorMessage = "Something went wrong";
                }
            }

            console.log("errorMessage", errorMessage)
            dispatch(registerUserFailure(errorMessage));
        }
    };
};

