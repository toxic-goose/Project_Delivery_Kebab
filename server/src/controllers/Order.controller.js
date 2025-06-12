const OrderService = require('../services/Order.service')
const { formatResponse } = require('../utils/formatResponse')

class OrderController {
  // * контроллер на получение всех
static async getAll(req, res) {
    try {
    const result = await OrderService.getAllOrders()
    res.status(200).json(formatResponse({
        statusCode: 200, message: 'Все заказы',
        data: result
    }))
    } catch (error) {
    console.log(error)
    res.status(401).json(formatResponse({
        statusCode: 401, message: 'У тебя нет прав',
        error: error.message
    }))
    }
}
  // * контроллер на получение одного
static async getOne(req, res) {
    try {
    const { id } = req.params
    const user = await OrderService.getOneOrder(id)
    console.log(user);
    res.status(200).json(formatResponse({
        statusCode: 200, message: 'Один заказ',
        data: user
    }))
    } catch (error) {
    console.log(error)
    res.status(500).json(formatResponse({
        statusCode: 500, message: 'Невозможно просмотреть заказ',
        error: error.message
    }))
    }
}
  // * контроллер на создание
static async register(req, res) {
    try {
    const { order_name, img_path, description, price, sale, location } = req.body
    
    const order = await OrderService.registerOrder({
        order_name, img_path, description, price, sale, location
    })
    res.status(200).json(formatResponse({
        statusCode: 200, message: 'Заказ успешно добавлен',
        data: order
    }))

    } catch (error) {
    console.log(error)
    res.status(500).json(formatResponse({
        statusCode: 500, message: 'Не удалось создать заказ',
        error: error.message
    }))
}
}
  // *  контроллер на удаление
static async delete(req, res) {
    try {
    const { id } = req.params
    
    const order = await OrderService.deleteOrder(id)
    
    res.status(200).json(formatResponse({
        statusCode: 200, message: 'Заказ успешно удалён',
        data: order
    }))
    } catch (error) {
    console.log(error)
    res.status(500).json(formatResponse({
        statusCode: 500, message: 'Не удалось удалить заказ',
        error: error.message
    }))
    }
}
  // * обновление
static async update(req, res) {
    try {
    const { id } = req.params
    const { order_name, img_path, description, price, sale, location } = req.body
    const updatedUser = await OrderService.updateOrder(id, { order_name, img_path, description, price, sale, location })
    res.status(200).json(formatResponse({
        statusCode: 200, message: 'Заказ успешно обновлён',
        data: updatedUser
    }))
    } catch (error) {
    res.status(500).json(formatResponse({
        statusCode: 500, message: 'Не удалось обновить заказ',
        error: error.message
    }))
    }
}

}

module.exports = OrderController