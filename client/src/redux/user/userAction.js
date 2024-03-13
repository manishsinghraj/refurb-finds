import { REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, SIGN_OUT_USER } from "./userTypes"

export const registerUserRequest = () => {
    return {
        type: REGISTER_USER_REQUEST
    }
}

export const registerUserSuccess = (user) => {
    return {
        type: REGISTER_USER_SUCCESS,
        payload: user
    }
}


export const registerUserFailure = (error) => {
    return {
        type: REGISTER_USER_FAILURE,
        payload: error
    }
}


export const signOutUser = () => {
    return {
        type: SIGN_OUT_USER,
    }
}