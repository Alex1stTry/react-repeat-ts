import {useEffect, useState} from "react";

import {CarForm} from "./CarForm";
import {Cars} from "./Cars";
import {ICar} from "../../interfaces/car.interface";
import {carService} from "../../services/carService";

const CarContainer = () => {
    const [cars, setCars] = useState<ICar[]>([])
    const [trigger, setTrigger] = useState<boolean>(null)
    const [carForUpdate, setCarForUpdate] = useState<ICar>(null)

    useEffect(() => {
        carService.getAll().then(({data}) => setCars(data))
    }, [trigger]);

    const changeTrigger = () => {
        setTrigger(prevState => !prevState)
    }
    console.log(carForUpdate)
    return (
        <div>
            <CarForm changeTrigger={changeTrigger} setCarForUpdate={setCarForUpdate} carForUpdate={carForUpdate} />
            <hr/>
            <Cars cars={cars} changeTrigger={changeTrigger} setCarForUpdate={setCarForUpdate}/>
        </div>
    );
};

export {CarContainer};