import { configureStore } from "@reduxjs/toolkit";
import pizzaSlice from './reducers/pizzaSlice.js'
import authSlice from './reducers/authSlice.js'
import featuresSlice from './reducers/featuresSlice.js'
import cartSlice from './reducers/cartSlice.js'
import couponSlice from './reducers/couponSlice.js'
import orderSlice from './reducers/orderSlice.js'


const store = configureStore({
    reducer : {
        pizzaSlice : pizzaSlice,
        auth : authSlice,
        features: featuresSlice,
        cartSlice:cartSlice,
        couponSlice: couponSlice,
        orderSlice: orderSlice
    }
})

export default store ;