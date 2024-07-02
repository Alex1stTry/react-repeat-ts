const baseURL = 'http://owu.linkpc.net/carsAPI/v2'

const cars = '/cars'
const users = '/users'
const auth = '/auth'

const urls = {
    cars:{
        base:cars,
        byId:(id:number) => `${cars}/${id}`
    },
    users: {
        register: users,
        login: auth,
        me: `${auth}/me`,
        refresh: `${auth}/refresh`
    }
}
export {
    baseURL,
    urls
}