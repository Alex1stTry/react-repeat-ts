import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {ICar, ICarPagination} from "../../interfaces";
import {AxiosError} from "axios";
import {carService} from "../../services";

interface IState {
    cars: ICar[],
    trigger: boolean,
    prev: string,
    next: string,
    carForUpdate: ICar

}

const initialState: IState = {
    cars: null,
    trigger: null,
    prev: null,
    next: null,
    carForUpdate: null
}
const getAll = createAsyncThunk<ICarPagination<ICar>, { page: string }>(
    'carSlice/getAll',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await carService.getAll(page);
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
const deleteCar = createAsyncThunk<void, { id: number }>(
    'carSlice/delete',
    async ({id}, {rejectWithValue}) => {
        try {
            await carService.delete(id)
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
                state.prev = action.payload.prev
                state.next = action.payload.next
            })
            .addMatcher(isFulfilled(create, update,deleteCar), state => {
                state.trigger = !state.trigger
                state.carForUpdate = null
            })

});

const {reducer: carReducer, actions} = carSlice;
const carActions = {
    ...actions,
    getAll,
    create,
    update,
    deleteCar
}

export {
    carReducer,
    carActions
}