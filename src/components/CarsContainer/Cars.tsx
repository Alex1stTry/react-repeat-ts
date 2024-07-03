import { FC, useEffect, useState, SyntheticEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { carActions } from "../../store";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Car } from "./Car";
import css from './Form.module.css';

const Cars: FC = () => {
    const { trigger, cars } = useAppSelector(state => state.cars);
    const { isLoading } = useAppSelector(state => state.loading);
    const dispatch = useAppDispatch();
    const [query] = useSearchParams({ page: '1' });

    const [expanded, setExpanded] = useState<string | false>(false);

    const page = query.get('page');

    const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        dispatch(carActions.getAll({ page }));
    }, [trigger, page]);

    return (
        <div>
            {isLoading ? (
                <div className={css.Center}><CircularProgress /></div>
            ) : (
                <div>
                    {cars && cars.map(car => (
                        <Car key={car.id} car={car} expanded={expanded} handleChange={handleChange} />
                    ))}
                </div>
            )}
        </div>
    );
};

export { Cars };
