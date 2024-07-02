import {ICar} from "./carInterface";

export interface ICarPagination {
    total_items: number,
    total_pages: number,
    prev: string,
    next: string,
    items: ICar[]
}

