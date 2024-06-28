import {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {ICar} from "../../interfaces/car.interface";
import {carService} from "../../services/carService";


interface IProps {
    changeTrigger: () => void
}

const CarForm: FC<IProps> = ({changeTrigger}) => {
    const {reset, register, setValue, handleSubmit} = useForm<ICar>();

    const save: SubmitHandler<ICar> = async (car) => {
        await carService.create(car)
        changeTrigger()
        reset()
    }

    return (
        <form onSubmit={handleSubmit(save)}>
            <input type="text" placeholder={'brand'} {...register('brand')}/>
            <input type="text" placeholder={'price'} {...register('price', {
                valueAsDate: true
            })}/>
            <input type="text" placeholder={'year'} {...register('year', {
                valueAsDate: true
            })}/>
            <button>save</button>
        </form>
    );
};

export {
    CarForm
};