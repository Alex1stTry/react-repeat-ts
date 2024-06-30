import {FC} from "react";
import {ICar} from "../../interfaces/car.interface";
import {carService} from "../../services/carService";
import {ISetState} from "../../types/setState.type";

interface IProps {
    car: ICar
    changeTrigger: () => void
    setCarForUpdate: ISetState<ICar>

}

const Car: FC<IProps> = ({car, changeTrigger, setCarForUpdate}) => {
    const {id, year, price, brand} = car;

    const deleteById = async () => {
        await carService.deleteById(id)
        changeTrigger()

    };

    return (
        <div>
            <div>id: {id}</div>
            <div>year: {year}</div>
            <div>price: {price}</div>
            <div>brand: {brand}</div>
            <button onClick={() => setCarForUpdate(car)}>update</button>
            <button onClick={deleteById}>delete</button>
            <hr/>
        </div>
    );
};

export {Car};