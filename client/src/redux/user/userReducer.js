import axios from "axios";
import { REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, SIGNIN_USER_FAILURE, SIGNIN_USER_REQUEST, SIGNIN_USER_SUCCESS, SIGN_OUT_USER } from "./userTypes"
import { registerUserFailure, registerUserRequest, registerUserSuccess, signInUserFailure, signInUserRequest, signInUserSuccess } from "./userAction";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;



const initialState = {
    loading: false,
    userDetails: JSON.parse(localStorage.getItem('user')) || null,
    error: null
};


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                userDetails: null
            };

        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                userDetails: action.payload,
                error: null
            };

        case REGISTER_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                userDetails: null
            };

        case SIGNIN_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                userDetails: null
            };

        case SIGNIN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                userDetails: action.payload,
                error: null
            };

        case SIGNIN_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                userDetails: null
            };

        case SIGN_OUT_USER:
            localStorage.removeItem('user');
            localStorage.removeItem('likedProductIds');
            localStorage.removeItem('products');
            localStorage.removeItem('shippingInfo');
            localStorage.removeItem('cartDetails');
            return {
                ...state,
                loading: false,
                error: null,
                userDetails: null
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
            const response = await axios.post(API_BASE_URL + "user/register/", userData);
            const newUser = response.data;
            dispatch(registerUserSuccess(newUser));
            localStorage.setItem('user', JSON.stringify(newUser));
            localStorage.setItem('token', JSON.stringify(newUser?.token));
        } catch (error) {
            let errorMessage = "Something went wrong";

            if (error?.response?.data?.message?.code === 11000) {
                errorMessage = "Phone number already exists!";
            } else if (error?.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error?.message) {
                errorMessage = error.message;
            }

            dispatch(registerUserFailure(errorMessage));
        }

    };
};

export const signUser = (userData) => {
    return async (dispatch) => {
        dispatch(signInUserRequest());
        try {
            const response = axios.post(API_BASE_URL + "user/signin/", userData);
            const user = (await response).data;
            dispatch(signInUserSuccess(user));
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('likedProductIds', JSON.stringify(user.user?.likedItems));
            localStorage.setItem('token', JSON.stringify(user?.token));
        } catch (error) {
            let errorMessage;

            errorMessage = error?.response?.data?.message;

            if (typeof errorMessage === 'object') {
                errorMessage = "Something went wrong";
            }
            console.log("errorMessage", errorMessage)
            dispatch(signInUserFailure(errorMessage));
        }
    }
}

export const clearError = () => {
    return (dispatch ) => {
        dispatch(signInUserFailure(null));
    }
}

