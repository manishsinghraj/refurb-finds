import { fetchProductsFailure, fetchProductsRequest, fetchProductsSuccess } from "./dataAction";
import { FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS } from "./dataTypes";
import axios from "axios";
// import productsData from "../../assets/data/products/products.json";

//State
const initialState = {
    loading: false,
    products: [],
    error: null,
}

export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
                error: null
            }

        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                products: [],
                error: action.payload
            }
        default:
            return state
    }


}



export const fetchProducts = () => {
    return function (dispatch) {
        dispatch(fetchProductsRequest());
        axios.get("http://localhost:5000/api/products/getproducts/")
            .then(response => {
                const products = response.data;
                console.log("products", products);
                dispatch(fetchProductsSuccess(products));
            })
            .catch(error => {
                dispatch(fetchProductsFailure(error?.response?.data?.message || error));
            });
    };
};



// export const fetchProducts = () => {
//     return function (dispatch) {
//         dispatch(fetchProductsRequest());
//         dispatch(fetchProductsSuccess(productsData));
//     }
// }