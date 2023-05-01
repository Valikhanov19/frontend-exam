import { combineReducers } from "redux";
import {reducer, emailReducer, searchedReducer, basketReducer, wishlistReducer } from './reducer';

const rootReducer = combineReducers({
    login: emailReducer,
    category: reducer,
    search: searchedReducer,
    basketed: basketReducer,
    like: wishlistReducer
})

export default rootReducer