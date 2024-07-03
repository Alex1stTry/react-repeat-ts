import {ICar, ICarPagination} from "../interfaces";
import {apiService} from "./apiService";
import {urls} from "../constants";
import {IRes} from "../types";

const carService = {
    getAll: (page:string): IRes<ICarPagination<ICar>> => apiService.get(urls.cars.base,{params:{page}}),
    create: (car: ICar): IRes<ICar> => apiService.post(urls.cars.base, car),
    updateById: (id: number, car: ICar): IRes<ICar> => apiService.put(urls.cars.byId(id), car),
    delete: (id: number): IRes<void> => apiService.delete(urls.cars.byId(id))
}

export {
    carService
}