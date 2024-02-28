import { createStore, applyMiddleware } from 'redux'; 
import {thunk} from 'redux-thunk';
import { bannerReducer } from "./banner/bannerReducer";

const store = createStore(bannerReducer, applyMiddleware(thunk)); 

export default store; 
