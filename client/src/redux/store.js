import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import bannerReducer from "./banner/bannerReducer";

import cartReducer from "./cart/cartReducer";

// Combine your reducers here
const rootReducer = combineReducers({
    banner: bannerReducer,
    cart: cartReducer
});


const store = createStore(rootReducer, applyMiddleware(thunk));

export default store; 
