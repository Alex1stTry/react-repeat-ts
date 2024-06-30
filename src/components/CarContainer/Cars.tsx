import {FC} from "react";
import {Car} from "./Car";
import {ICar} from "../../interfaces/car.interface";
import {ISetState} from "../../types/setState.type";

interface IProps {
    cars: ICar[]
    changeTrigger: () => void
    setCarForUpdate:ISetState<ICar>
}

const Cars: FC<IProps> = ({cars,changeTrigger,setCarForUpdate}) => {
    return (
        <div>
            {cars.map(car => <Car key={car.id} car={car} changeTrigger={changeTrigger} setCarForUpdate={setCarForUpdate}/>)}
        </div>
    );
};

export {Cars};