import axios, {AxiosError} from "axios";

import {baseURL, urls} from "../constants";
import { router } from "../router";
import {authService} from "./authService";


let isRefresh = false

const apiService = axios.create({baseURL})

apiService.interceptors.request.use(req => {
        const accessToken = authService.getAccess()

        if (accessToken) {
            req.headers.Authorization = `Bearer ${accessToken}`
        }
        return req
    }
)

apiService.interceptors.response.use(
    res => res,
    async (error: AxiosError) => {
        const originalRequest = error.config
        if (error.response.status === 401) {
            if (isRefresh) {
                isRefresh = true

                try {
                    await authService.refresh()
                    isRefresh = false

                    return apiService(originalRequest)
                } catch (e) {
                    authService.deleteTokens()
                    isRefresh = false
                    await router.navigate('/login?SessionExpired=true')
                    return Promise.reject(error)
                }
            }
        }
        if (originalRequest.url === urls.users.refresh){
            return Promise.reject(error)
        }
        return Promise.reject(error)
    }
)

export {
    apiService
}