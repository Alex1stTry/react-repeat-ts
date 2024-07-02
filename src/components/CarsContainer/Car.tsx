import {FC} from "react";
import {ICar} from "../../interfaces";

interface IProps {
    car: ICar
}

const Car: FC<IProps> = ({car}) => {
    const {id,brand,price,year} = car;
    return (
        <div>
            <div>id: {id}</div>
            <div>brand: {brand}</div>
            <div>price: {price}</div>
            <div>year: {year}</div>
        </div>
    );
};

export {Car}; 