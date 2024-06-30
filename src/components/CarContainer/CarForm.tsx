import {FC, useEffect} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {ICar} from "../../interfaces/car.interface";
import {carService} from "../../services/carService";
import {ISetState} from "../../types/setState.type";


interface IProps {
    changeTrigger: () => void
    carForUpdate: ICar
    setCarForUpdate: ISetState<ICar>
}

const CarForm: FC<IProps> = ({changeTrigger, setCarForUpdate, carForUpdate}) => {
    const {reset, register, setValue, handleSubmit} = useForm<ICar>();

    const save: SubmitHandler<ICar> = async (car) => {
        await carService.create(car)
        changeTrigger()
        reset()

    }
    useEffect(() => {
        if (carForUpdate) {
            setValue('brand', carForUpdate.brand, {shouldValidate: true})
            setValue('price', carForUpdate.price, {shouldValidate: true})
            setValue('year', carForUpdate.year, {shouldValidate: true})
        }
    }, [carForUpdate,setValue]);

    const update: SubmitHandler<ICar> = async (car) => {
        await carService.updateById(carForUpdate.id, car)
        changeTrigger()
        setCarForUpdate(null)
        reset()
    }
    return (
        <form onSubmit={handleSubmit(carForUpdate ? update : save)}>
            <input type="text" placeholder={'brand'} {...register('brand')}/>
            <input type="text" placeholder={'price'} {...register('price', {
                valueAsNumber: true
            })}/>
            <input type="text" placeholder={'year'} {...register('year', {
                valueAsNumber: true
            })}/>
            <button>{carForUpdate ? 'update' : 'save'}</button>
        </form>
    );
};

export {
    CarForm
};