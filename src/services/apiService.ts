import axios from "axios";

import {baseURL} from "../components/urls";

const apiService = axios.create({baseURL})

export {
    apiService
}