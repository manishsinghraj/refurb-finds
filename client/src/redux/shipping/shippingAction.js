import { SAVE_SHIPPING_INFO, SAVE_SHIPPING_METHOD } from "./shippingTypes";

export const saveShippingInfo = (shippingInfoData) => {
    return (dispatch, getState) => {
        dispatch({
            type: SAVE_SHIPPING_INFO,
            payload: shippingInfoData
        });
    };
};

export const saveShippingMethod = (shippingMethodData) => {
    return {
        type: SAVE_SHIPPING_METHOD,
        payload: shippingMethodData
    };
};

