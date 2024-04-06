import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import bannerReducer from "./banner/bannerReducer";
import cartReducer from "./cart/cartReducer";
import { composeWithDevTools } from '@redux-devtools/extension';
import { dataReducer } from './data/dataReducer';
import { filterReducer } from './filters/filterReducer';
import { likeReducer } from './like/likeReducer';
import userReducer from './user/userReducer';
import { shippingReducer } from './shipping/shippingReducer';
import { toastReducer } from './toast/toastReducer';

// Combine your reducers here
const rootReducer = combineReducers({
    banner: bannerReducer,
    cart: cartReducer,
    filters: filterReducer,
    data: dataReducer,
    like: likeReducer,
    userDetails : userReducer,
    shipping : shippingReducer,
    toast : toastReducer
});


const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk),
),);

export default store; 
