import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {carValidator} from "../../validators";
import {ICar} from "../../interfaces";
import css from './Form.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks";
import {carActions} from "../../store";
import {useEffect} from "react";

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
            <input type="text" placeholder={'brand'} {...register('brand')}/>
            {errors.brand && <div>{errors.brand.message}</div>}
            <input type="text" placeholder={'price'} {...register('price', {valueAsNumber: true})}/>
            {errors.price && <div>{errors.price.message}</div>}
            <input type="text" placeholder={'year'} {...register('year', {valueAsNumber: true})}/>
            {errors.year && <div>{errors.year.message}</div>}
            <button disabled={!isValid}>{carForUpdate? 'update': 'save'}</button>
        </form>
    );
};

export {CarsForm};