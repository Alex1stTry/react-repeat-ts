import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ICar, ICarPagination} from "../../interfaces";
import {AxiosError} from "axios";
import {carService} from "../../services";

interface IState {
    result: ICarPagination
    cars: ICar[]
    trigger: string
}

const initialState: IState = {
    result: null,
    cars: null,
    trigger: null
}
const getAll = createAsyncThunk<{ data:ICarPagination }, { page: string }>(
    'carSlice/getAll',
    async ({page}, {rejectWithValue}) => {
        try {
            await carService.getAll(page)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)
const carSlice = createSlice({
    name: 'carSlice',
    initialState,
    reducers: {

    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled,(state, action) =>{
                state.result = action.payload.data
                state.cars = action.payload.data.items
            })

});

const {reducer:carReducer, actions} = carSlice;
const carActions = {
    ...actions,
    getAll
}

export {
    carReducer,
    carActions
}