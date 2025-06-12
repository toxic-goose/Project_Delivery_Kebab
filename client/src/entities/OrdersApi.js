import { axiosInstance } from '../shared/lib/axiosInstance'

export class OrdersApi {

    static async getAll() {
        const { data } = await axiosInstance.get('/order')
        return data
    }

    static async register(inputs) {
        const { data } = await axiosInstance.post('/order/register', inputs)
        return data
    }

    static async delete(id) {
        const { data } = await axiosInstance.delete(`/order/${id}`)
        return data
    }

    static async getOne(id) {
        const { data } = await axiosInstance.get(`/order/${id}`)
        return data
    }

    static async update(id, inputs) {
        const { data } = await axiosInstance.put(`/order/${id}`, inputs)
        return data
    }
}