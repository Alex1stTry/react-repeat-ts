import {Car} from "./Car";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useEffect} from "react";
import {carActions} from "../../store";
import {useSearchParams} from "react-router-dom";


const Cars = () => {
    const {trigger,cars} = useAppSelector(state => state.cars);
    const {isLoading} = useAppSelector(state => state.loading);
    const dispatch = useAppDispatch();
    const [query] = useSearchParams({page:'1'});

    const page = query.get('page')
    console.log(cars)

    useEffect(() => {
        dispatch(carActions.getAll({page}))
    }, [trigger,page]);
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