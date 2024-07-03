import {useAppSelector} from "../../hooks";
import {useSearchParams} from "react-router-dom";

const CarsPagination = () => {
    const {nextPage, prevPage} = useAppSelector(state => state.cars);
    const [_, setQuery] = useSearchParams({page: '1'});

    const next = () => {
        setQuery(value => {
            value.set('page', (+value.get('page') + 1).toString())
            return value
        })
    }
    const prev = () => {
        setQuery(value => {
                value.set('page', (+value.get('page') - 1).toString())
            return value
            })
    }
    return (
        <div>
            <button disabled={!prevPage} onClick={prev}>prev</button>
            <button disabled={!nextPage} onClick={next}>next</button>
        </div>
    );
};

export {CarsPagination};