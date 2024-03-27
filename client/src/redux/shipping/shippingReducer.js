import { saveShippingInfo } from "./shippingAction";
import { SAVE_AMOUNT, SAVE_SHIPPING_INFO, SAVE_SHIPPING_METHOD } from "./shippingTypes";
import axios from "axios";
import { loadStripe } from '@stripe/stripe-js';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const SHIPPING_METHOD_PREPAID = process.env.REACT_APP_SHIPPING_METHOD_PREPAID;


const initialState = {
    shippingInfo: localStorage.getItem("shippingInfo")  ? JSON.parse(localStorage.getItem("shippingInfo")) :  {},
    shippingMethod: SHIPPING_METHOD_PREPAID,
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
            const response = await axios.post(API_BASE_URL + "checkout/shippingdetails", shippingData);
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

            const response = await axios.get(API_BASE_URL + `checkout/getshippingdetails?userId=${userId}`);
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

            const response = await axios.post(API_BASE_URL + "order/placecodorder", orderData);
            console.log("cod order placed successfully");
            return response;

        } catch (error) {
            console.log("cod order failed");
            return error;
        }
    }
}

export const makePayment = async (cartDetails, userId, amount ) => {
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PK_KEY);

    const body = {
        products: cartDetails,
        userId: userId,
        amount: amount
    }

    const response = await fetch(API_BASE_URL + "checkout/makepayment", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
        sessionId: session.id
    })

    if (result.error) {
        console.log(result.error)
    }
}   

