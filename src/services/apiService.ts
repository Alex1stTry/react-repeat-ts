import axios, {AxiosError} from "axios";

import {baseURL, urls} from "../constants";
import {router} from "../router";
import {authService} from "./authService";


let isRefresh = false

type iWaitList = () => void
const waitList: iWaitList[] = []

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
            if (!isRefresh) {
                isRefresh = true

                try {
                    await authService.refresh()
                    isRefresh = false
                    runAfterRefresh()
                    return apiService(originalRequest)
                } catch (e) {
                    authService.deleteTokens()
                    isRefresh = false
                    await router.navigate('/login?Session_Expired=true')
                    return Promise.reject(error)
                }
            }
            if (originalRequest.url === urls.users.refresh) {
                return Promise.reject(error)
            }
            return new Promise(resolve => {
                addToArray(() => {
                    resolve(apiService(originalRequest))
                })
            })

        }
        return Promise.reject(error)
    }
)

const addToArray = (cb: iWaitList): void => {
    waitList.push(cb)
}
const runAfterRefresh = (): void => {
    while (waitList.length) {
        const cb = waitList.pop()
        cb()
    }
}

export {
    apiService
}