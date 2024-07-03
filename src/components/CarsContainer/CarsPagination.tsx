import {useAppSelector} from "../../hooks";
import {useSearchParams} from "react-router-dom";

const CarsPagination = () => {
    const {next, prev} = useAppSelector(state => state.cars);
    const [, setQuery] = useSearchParams({page: '1'});

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
            <button disabled={!prev} onClick={prevPage}>prev</button>
            <button disabled={!next} onClick={nextPage}>next</button>
        </div>
    );
};

export {CarsPagination};