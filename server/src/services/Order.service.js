const { Order } = require('../db/models')

class OrderService {
    // * получение всех заказов
    static async getAllOrders() {
    const orders = await Order.findAll()
    const result = orders.map((el) => el.get({ plain: true }))
    return result
    }
    // * Получение одного заказа
    static async getOneOrder(id) {
    const user = await Order.findByPk(id)
    const result = user.get({ plain: true })
    return result
    }
    // * создание заказа
    static async registerOrder({ order_name, img_path, description, price, sale, location}) {
    const order = await Order.create({ 
        order_name, img_path, description, price, sale, location
    })
    const result = order.get({ plain: true })
    return result
    }
   // * удаление
    static async deleteOrder(id) {
    const order = await Order.findByPk(id)
    order.destroy()
    return id
    }
    // * обновление
    static async updateOrder(id, data) { // { login: 'sdsad', mail, password }
    const order = await Order.update(data, { where: { id }})
    if (order) {
        return order 
    } else {
        return false
    }
    }
    // * Получение юзера по почте
    // static async getByEmail(mail) {
    // const user = await Order.findOne({ where: { mail } });
    // if (!user) {
    //     return null;
    // } else {
    //     const result = user.get({ plain: true })
    //     return result
    // }
    // }
}

module.exports = OrderService