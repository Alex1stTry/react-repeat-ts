import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {ICar, ICarPagination} from "../../interfaces";
import {AxiosError} from "axios";
import {carService} from "../../services";

interface IState {
    cars: ICar[],
    trigger: boolean,
    prevPage: string,
    nextPage: string,
    carForUpdate: ICar

}

const initialState: IState = {
    cars: null,
    trigger: null,
    prevPage: null,
    nextPage: null,
    carForUpdate: null
}
const getAll = createAsyncThunk<ICarPagination<ICar>, void>(
    'carSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await carService.getAll();
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)
const create = createAsyncThunk<void, { car: ICar }>(
    'carSlice/create',
    async ({car}, {rejectWithValue}) => {
        try {
            await carService.create(car)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)
const update = createAsyncThunk<ICar, { id: number, carData: ICar }>(
    'carSlice/update',
    async ({id, carData}, {rejectWithValue}) => {
        try {
            const {data} = await carService.updateById(id, carData)
            return data
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
        setCarForUpdate: (state, action) => {
            state.carForUpdate = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.cars = action.payload.items
                state.prevPage = action.payload.prev
                state.nextPage = action.payload.next
            })
            .addMatcher(isFulfilled(create, update), state => {
                state.trigger = !state.trigger
                state.carForUpdate = null
            })

});

const {reducer: carReducer, actions} = carSlice;
const carActions = {
    ...actions,
    getAll,
    create,
    update
}

export {
    carReducer,
    carActions
}