import { SAVE_SHIPPING_INFO, SAVE_SHIPPING_METHOD } from "./shippingTypes";
import axios from "axios";

const initialState = {
    shippingInfo: JSON.parse(localStorage.getItem("shippingInfo")) || {},
    shippingMethod: "prepaid",
    orderSummary: {},
};

export const shippingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_SHIPPING_INFO:
            localStorage.setItem("shippingInfo", JSON.stringify(action.payload))
            return {
                ...state,
                shippingInfo: action.payload
            };

        case SAVE_SHIPPING_METHOD:
            return {
                ...state,
                shippingMethod: action.payload
            };

        default:
            return state;
    }
};


export const postShippingDetails = () => {
    return async (dispatch, getState) => { // Note the addition of `dispatch` here
        try {
            const state = getState();
            const shippingInfo = state.shipping.shippingInfo;
            const userDetails = state.userDetails.userDetails;

            const shippingData = {
                shippingInfo: shippingInfo,
                userId: userDetails.user._id
            }
            console.log("shippingdata", shippingData);
            const response = await axios.post("http://localhost:5000/api/checkout/shippingdetails", shippingData);
            localStorage.setItem('shippingInfo', JSON.stringify(response.data.shippingInfo));
            console.log("shippingdata posted successfully");
        } catch (error) {
            console.log("Error posting shipping details:", error);
        }
    };
};

