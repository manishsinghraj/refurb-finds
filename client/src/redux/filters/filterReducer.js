import { ELECTRONIC_PRODUCTS, ERROR, FURNITURE_PRODUCTS, LOADING, RECOMMENDED_PRODUCTS, SEARCH_PRODUCTS, SORT_BY, STAR_FILTER_INDEX, TOP_PRODUCTS } from "./filterTypes"


const initialState = {
    search: "",
    electronicProducts: [],
    furnitureProducts: [],
    topProducts: [],
    recommendedProducts: [],
    loading: false,
    error: null,
    sortBy: "Price:Low to high",
    starFilterIndex: null
}


export const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_PRODUCTS:
            return {
                ...state,
                search: action.payload
            }

        case ELECTRONIC_PRODUCTS: {

            const products = action.payload;
            const filteredProducts = products.filter((item) => item.category.name.toLowerCase() === "electronics");

            return {
                ...state,
                electronicProducts: filteredProducts
            }
        }


        case FURNITURE_PRODUCTS: {

            const products = action.payload;
            const filteredProducts = products.filter((item) => item.category.name.toLowerCase() === "furniture");

            return {
                ...state,
                furnitureProducts: filteredProducts
            }

        }

        case TOP_PRODUCTS: {
            const products = action.payload;
            const filteredProducts = products.filter((item) => item.rating >= 4);

            return {
                ...state,
                topProducts: filteredProducts
            }

        }
        case RECOMMENDED_PRODUCTS: {
            const products = action.payload;
            const filteredProducts = products.filter((item) => item.rating >= 2 && item.reviewCount >= 100);

            return {
                ...state,
                recommendedProducts: filteredProducts
            }
        }

        case LOADING: {
            return {
                ...state,
                loading: action.payload
            }
        }

        case ERROR: {
            return {
                ...state,
                Error: action.payload
            }
        }

        case SORT_BY: {
            return {
                ...state,
                sortBy: action.payload
            }
        }

        case STAR_FILTER_INDEX: {
            return {
                ...state,
                starFilterIndex: action.payload
            }
        }
        default: return state
    }
}