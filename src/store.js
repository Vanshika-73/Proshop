import { configureStore, createReducer } from "@reduxjs/toolkit";
import ProductReducer from './slices/ProductSlice';
import SingleProductReducer from './slices/SingleProductSlice'
import UserReducer from "./slices/UserSlice";
import carteReducer from './slices/CartSlice.js';
const store = configureStore({
    reducer:{
        products:ProductReducer,
        singleProduct: SingleProductReducer,
        user : UserReducer,
        cart : carteReducer
    }
})

export default store;