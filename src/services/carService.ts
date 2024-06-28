import {apiService} from "./apiService";

import {urls} from "../components/urls";
import {ICar} from "../interfaces/car.interface";
import {IRes} from "../types/response.type";

const carService = {
    getAll: (): IRes<ICar[]> => apiService.get(urls.cars.base)
}