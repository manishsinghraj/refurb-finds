import { ELECTRONIC_PRODUCTS, ERROR, FURNITURE_PRODUCTS, LOADING, RECOMMENDED_PRODUCTS, SEARCH_PRODUCTS, SORT_BY, STAR_FILTER_INDEX, TOP_PRODUCTS } from "./filterTypes"

export const searchProducts = (searchText) => {
    return {
        type: SEARCH_PRODUCTS,
        payload: searchText
    }
}


export const electronicProducts = (products) => {
    return {
        type: ELECTRONIC_PRODUCTS,
        payload: products
    }
}


export const furnitureProducts = (products) => {
    return {
        type: FURNITURE_PRODUCTS,
        payload: products
    }
}


export const topProducts = (products) => {
    return {
        type: TOP_PRODUCTS,
        payload: products
    }
}


export const recommendedProducts = (products) => {
    return {
        type: RECOMMENDED_PRODUCTS,
        payload: products
    }
}  


export const setLoading = (isLoading) => {
    return {
        type: LOADING,
        payload: isLoading
    }
}  


export const setError = (errorMessage) => {
    return {
        type: ERROR,
        payload: errorMessage
    }
}  

export const sortBy = (sort) => {
    return {
        type: SORT_BY,
        payload: sort
    }
}  

export const starFilterIndex = (index) => {
    return {
        type: STAR_FILTER_INDEX,
        payload: index
    }
}  