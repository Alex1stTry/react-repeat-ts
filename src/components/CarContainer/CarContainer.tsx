import {useEffect, useState} from "react";

import {CarForm} from "./CarForm";
import {Cars} from "./Cars";
import {ICar} from "../../interfaces/car.interface";
import {carService} from "../../services/carService";

const CarContainer = () => {
    const [cars, setCars] = useState<ICar[]>([])
    const [trigger, setTrigger] = useState<boolean>(null)

    useEffect(() => {
        carService.getAll().then(({data}) => setCars(data))
    }, [trigger]);

    const changeTrigger = () => {
        setTrigger(prevState => !prevState)
    }
    return (
        <div>
            <CarForm changeTrigger={changeTrigger} />
            <hr/>
            <Cars cars={cars}/>
        </div>
    );
};

export {CarContainer};