import {CarsForm} from "./CarsForm";
import {Cars} from "./Cars";
import {CarsPagination} from "./CarsPagination";

const CarsContainer = () => {
    return (
        <div>
            <CarsForm/>
            <Cars/>
            <CarsPagination/>
        </div>
    );
};

export {CarsContainer};