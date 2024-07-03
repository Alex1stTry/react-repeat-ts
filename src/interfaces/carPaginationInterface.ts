import {ICar} from "./carInterface";

export interface ICarPagination <T>{
    total_items: number,
    total_pages: number,
    prev: string,
    next: string,
    items: T[]
}

