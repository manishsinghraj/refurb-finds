import { saveShippingInfo } from "./shippingAction";
import { SAVE_AMOUNT, SAVE_SHIPPING_INFO, SAVE_SHIPPING_METHOD } from "./shippingTypes";
import axios from "axios";

const initialState = {
    shippingInfo: localStorage.getItem("shippingInfo")  ? JSON.parse(localStorage.getItem("shippingInfo")) :  {},
    shippingMethod: "prepaid",
    orderSummary: {},
    amount: null
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

        case SAVE_AMOUNT:
            return {
                ...state,
                amount: action.payload
            };

        default:
            return state;
    }
};


export const postShippingDetails = () => {
    return async (dispatch, getState) => {
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

export const getSavedShippingInfo = () => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const userDetails = state.userDetails.userDetails;
            const userId = userDetails.user._id;

            const response = await axios.get(`http://localhost:5000/api/checkout/getshippingdetails?userId=${userId}`);
            console.log(response)
            localStorage.setItem("shippingInfo", JSON.stringify(response.data.shippingInfo));
            dispatch(saveShippingInfo(response.data.shippingInfo));
            console.log("shippingdata retrived successfully");
        } catch (error) {
            console.log("Error retrieving shipping details:", error);
        }
    }
}

export const placeCodOrder = () => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const amount = state.shipping.amount;
            const userDetails = state.userDetails.userDetails;
            const cartDetails = state.cart.cartDetails;


            const items = cartDetails.map((item) => ({
                id: item._id,
                price: item.price,
                category: item.category?.name,
                quantity: item.quantity,
            }));

            const orderData = {
                orderDetails: {
                    userId: userDetails.user._id,
                    customerId: null,
                    paymentId: null,
                    products: items,
                    subTotal: amount.subTotal,
                    total: amount.totalCharge,
                    shipping: amount.shippingCharge,
                }
            }

            console.log("orderData", orderData);
            const response = await axios.post("http://localhost:5000/api/order/placecodorder", orderData);
            console.log("cod order placed successfully");
            return response;

        } catch (error) {
            console.log("cod order failed");
            return error;
        }
    }
}

