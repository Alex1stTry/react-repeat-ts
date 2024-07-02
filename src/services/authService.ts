import {IAuth, ITokenPair, IUser} from "../interfaces";
import {apiService} from "./apiService";
import {urls} from "../constants";
import {IRes} from "../types";


const access = 'access'
const refresh = 'refresh'

const authService = {
    register(data: IAuth): IRes<IAuth> {
        return apiService.post(urls.users.register, data)
    },

    async login(user: IAuth): Promise<any> {
        const {data} = await apiService.post(urls.users.login, user);
        console.log(data)
        // const {data: me} = await this.me()
        // return me
    },
    async refresh():Promise<void>{
        const refresh = this.getRefresh();
        const {data} = await apiService.post(urls.users.refresh , {refresh});
        this.setTokens(data)
    },

    me(): IRes<IUser> {
        return apiService.get(urls.users.me);
    },

    setTokens({accessToken, refreshToken}: ITokenPair) {
        localStorage.setItem(access, accessToken)
        localStorage.setItem(refresh, refreshToken)
    },
    getAccess(): string {
        return localStorage.getItem(access)
    }, 
    getRefresh(): string {
        return localStorage.getItem(refresh)
    },
    deleteTokens(): void {
        localStorage.removeItem(access)
        localStorage.removeItem(refresh)
    },
}

export {
    authService
}