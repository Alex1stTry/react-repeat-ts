import {Car} from "./Car";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useEffect} from "react";
import {carActions} from "../../store";
import {useSearchParams} from "react-router-dom";

const Cars = () => {
    const {cars} = useAppSelector(state => state.cars);
    const dispatch = useAppDispatch();
    const [query,setQuery] = useSearchParams('page');



    useEffect(() => {
        dispatch(carActions.getAll({page}))
    }, []);
    return (
        <div>
            {cars.map(car => <Car key={car.id} car={car}/>)}
        </div>
    );
};

export {Cars};