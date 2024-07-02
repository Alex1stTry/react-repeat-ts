import {ICar} from "../interfaces";
import {apiService} from "./apiService";
import {urls} from "../constants";
import {IRes} from "../types/iResType";

const carService = {
    getAll: (): IRes<ICar[]> => apiService.get(urls.cars),
    create:(car:ICar):IRes<ICar> => apiService.post(urls.cars, car)
}

export {
    carService
}