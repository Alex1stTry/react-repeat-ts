import { FC, SyntheticEvent } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ICar } from "../../interfaces";
import { Accordion, AccordionDetails, AccordionSummary, Button, ButtonGroup, Typography } from "@mui/material";
import { useAppDispatch } from "../../hooks";
import { carActions } from "../../store";

interface IProps {
    car: ICar;
    expanded: string | false;
    handleChange: (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => void;
}

const Car: FC<IProps> = ({ car, expanded, handleChange }) => {
    const dispatch = useAppDispatch();
    const { id, brand, price, year } = car;

    const handleUpdate = () => {
        dispatch(carActions.setCarForUpdate(car));
    };

    const handleDelete = () => {
        dispatch(carActions.deleteCar({ id: car.id }));
    };

    return (
        <div>
            <Accordion
                expanded={expanded === `panel${id}`}
                onChange={handleChange(`panel${id}`)}
                sx={{ backgroundColor: 'lightgrey', border: '1px solid black', margin: '4px' }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${id}bh-content`}
                    id={`panel${id}bh-header`}
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Id: {id}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>Brand: {brand}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div>brand: {brand}</div>
                        <div>price: {price} $</div>
                        <div>year: {year}</div>
                    </Typography>

                    <ButtonGroup orientation="horizontal">
                        <Button onClick={handleUpdate}>Update</Button>
                        <Button onClick={handleDelete}>Delete</Button>
                    </ButtonGroup>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export { Car };
