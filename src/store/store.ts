import {configureStore} from "@reduxjs/toolkit";
import {authReducer, carReducer, loadingReducer} from "./slices";

const store = configureStore({
    reducer: {
        auth: authReducer,
        cars: carReducer,
        loading: loadingReducer,
    }
})
export {
    store
};