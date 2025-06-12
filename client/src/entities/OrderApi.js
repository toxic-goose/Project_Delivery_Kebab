import { axiosInstance } from '../shared/lib/axiosInstance'

export default class OrderApi {
    static async createOrder(inputs){
        const { data } = await axiosInstance.post('/order/createOrder', 
            inputs
        )
        return data
    }

}