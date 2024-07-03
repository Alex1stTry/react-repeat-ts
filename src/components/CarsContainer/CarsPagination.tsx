import {useAppSelector} from "../../hooks";
import {useSearchParams} from "react-router-dom";
import {Button, Typography} from "@mui/material";

const CarsPagination = () => {
    const {next, prev} = useAppSelector(state => state.cars);
    const [query, setQuery] = useSearchParams({page: '1'});

    const value = query.get('page')

    const nextPage = () => {
        setQuery(value => {
            value.set('page', (+value.get('page') + 1).toString())
            return value
        })
    }
    const prevPage = () => {
        setQuery(value => {
            value.set('page', (+value.get('page') - 1).toString())
            return value
        })
    }
    return (
        <div>
            <div>

                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px'}}>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!prev}
                        onClick={prevPage}
                        style={{marginRight: '10px'}}
                    >
                        Prev
                    </Button>
                    <Typography variant="body1" component="span">
                        Page: {value}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!next}
                        onClick={nextPage}
                            style={{marginLeft: '10px'}}
                    >
                        Next
                    </Button>
                </div>

            </div>
        </div>
    );
};

export {CarsPagination};