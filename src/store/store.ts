import {configureStore} from "@reduxjs/toolkit";
import {authReducer, carReducer} from "./slices";

const store = configureStore({
    reducer: {
        auth: authReducer,
        cars: carReducer
    }
})
export {
    store
}