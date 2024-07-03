import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {carValidator} from "../../validators";
import {ICar} from "../../interfaces";
import css from './Form.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks";
import {carActions} from "../../store";
import {useEffect} from "react";
import {Button, TextField} from "@mui/material";

const CarsForm = () => {
    const {register, reset, formState: {errors, isValid}, handleSubmit,setValue} = useForm<ICar>({
        mode: 'all',
        resolver: joiResolver(carValidator)
    });
const {carForUpdate} = useAppSelector(state => state.cars);
    const dispatch = useAppDispatch();

    const saveCar: SubmitHandler<ICar> = async (car) => {
        dispatch(carActions.create({car}))
        reset()
    }
    const updateCar:SubmitHandler<ICar> = async (car) =>{
        dispatch(carActions.update({id:carForUpdate.id,carData:car}))
    }

    useEffect(() => {
        if (carForUpdate) {
            setValue('brand', carForUpdate.brand)
            setValue('price', carForUpdate.price)
            setValue('year', carForUpdate.year)
        }
    }, [carForUpdate,setValue]);

    return (
        <form className={css.Form} onSubmit={handleSubmit(carForUpdate? updateCar : saveCar)}>

            <TextField label="Brand" variant="filled" {...register('brand')}/>
            {errors.brand && <div>{errors.brand.message}</div>}
            <TextField label="Price" variant="filled" {...register('price',{valueAsNumber:true})}/>
            {errors.price && <div>{errors.price.message}</div>}
            <TextField label="Year" variant="filled" {...register('year',{valueAsNumber:true})}/>
            {errors.year && <div>{errors.year.message}</div>}
            <Button variant="contained" type="submit" disabled={!isValid}>{carForUpdate? 'update': 'save'}</Button>
        </form>
    );
};

export {CarsForm};