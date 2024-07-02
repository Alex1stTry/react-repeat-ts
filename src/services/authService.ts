import {IAuth, ITokenPair, IUser} from "../interfaces";
import {apiService} from "./apiService";
import {urls} from "../constants";
import {IRes} from "../types";


const accessToken = 'access'
const refreshToken = 'refresh'

const authService = {
    register(user: IAuth): IRes<IUser> {
        console.log(user)
        return apiService.post(urls.users.register, user)
    },

    async login(user: IAuth): Promise<IUser> {
        const {data} = await apiService.post(urls.users.login, user);
        this.setTokens(data)
        const {data: me} = await this.me()
        return me
    },
    async refresh(): Promise<void> {
        const refresh = this.getRefresh();
        const {data} = await apiService.post(urls.users.refresh, {refresh});
        this.setTokens(data)
    },

    me(): IRes<IUser> {
        return apiService.get(urls.users.me);
    },

    setTokens({access, refresh}: ITokenPair) {
        localStorage.setItem(accessToken, access)
        localStorage.setItem(refreshToken, refresh)
    },
    getAccess(): string {
        return localStorage.getItem(accessToken)
    },
    getRefresh(): string {
        return localStorage.getItem(refreshToken)
    },
    deleteTokens(): void {
        localStorage.removeItem(accessToken)
        localStorage.removeItem(refreshToken)
    },
}

export {
    authService
}