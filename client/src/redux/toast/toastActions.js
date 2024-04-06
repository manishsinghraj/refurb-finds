import { TOAST } from "./toastTypes";

export const toastNotify = (Tmessage, Ttype) => {
    return {
        type: TOAST,
        payload: {
            Tmessage,
            Ttype
        }
    };
};
