import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {carValidator} from "../../validators";
import {ICar} from "../../interfaces";
import css from './Form.module.css'

const CarsForm = () => {
    const {register,reset,formState:{errors,isValid},handleSubmit} = useForm<ICar>({
        mode:'all',
        resolver: joiResolver(carValidator)
    });
    const saveCar:SubmitHandler<ICar> = async (car) =>{

    }
    return (
        <form className={css.Form} onSubmit={handleSubmit(saveCar)}>
            <input type="text" placeholder={'brand'} {...register('brand')}/>
            {errors.brand && <div>{errors.brand.message}</div>}
            <input type="text" placeholder={'price'} {...register('price' , {valueAsNumber:true})}/>
            {errors.price && <div>{errors.price.message}</div>}
            <input type="text" placeholder={'year'} {...register('year' , {valueAsNumber:true})}/>
            {errors.year && <div>{errors.year.message}</div>}
            <button disabled={!isValid}></button>
        </form>
    );
};

export {CarsForm};