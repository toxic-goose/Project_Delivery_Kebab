import { axiosInstance } from '../../shared/lib/axiosInstance'

export class UserApi {
    static async register(inputs){
        const {data } = await axiosInstance.post('/auth/register',
            inputs
        )
        return data
    }

    static async login(inputs){
        const {data } = await axiosInstance.post('/auth/login',
            inputs
        )
        return data
    }

    static async logout(){
        const { data } = await axiosInstance.post('/auth/logout')
        return data
    }

    static async refresh(){
        const { data } = await axiosInstance.get('/auth/refresh')
        return data
    }
}
