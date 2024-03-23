import { SAVE_AMOUNT, SAVE_SHIPPING_INFO, SAVE_SHIPPING_METHOD } from "./shippingTypes";

export const saveShippingInfo = (shippingInfoData) => {
    return {
        type: SAVE_SHIPPING_INFO,
        payload: shippingInfoData
    };
};

export const saveShippingMethod = (shippingMethodData) => {
    return {
        type: SAVE_SHIPPING_METHOD,
        payload: shippingMethodData
    };
};

export const updateAmount = (subTotal, shippingCharge, totalCharge) => {
    const amount = {
        subTotal,
        shippingCharge,
        totalCharge
    }
    return {
        type: SAVE_AMOUNT,
        payload: amount
    };
};



