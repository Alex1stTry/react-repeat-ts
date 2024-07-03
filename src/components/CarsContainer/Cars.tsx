import {Car} from "./Car";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useEffect} from "react";
import {carActions} from "../../store";

const Cars = () => {
    const {trigger,cars} = useAppSelector(state => state.cars);
    const {isLoading} = useAppSelector(state => state.loading);
    const dispatch = useAppDispatch();

    console.log(cars)

    useEffect(() => {
        dispatch(carActions.getAll())

    }, [trigger]);
    return (

        <div>
            {isLoading ?
                (
                    <div>{'Loading......'}</div>
                )
                :
                (
                    <div> {cars && cars.map(car => <Car key={car.id} car={car}/>)}</div>
                )
            }
        </div>
    );
};

export {Cars};