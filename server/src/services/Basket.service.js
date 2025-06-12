const { Backet } = require ('../db/models')
const { Order } = require('../db/models')

class BasketService {

    //* Получение всех получение заказов

    static async getAllBaskets() {
        const baskets = await Backet.findAll()
        const result = baskets.map((el) => el.get({ plain: true }))
    return result
    }

    //* Получение одного заказа

    static async getOneBasket(id) {
        const basket = await Backet.findByPk(id);
        const result = basket.get({ plain: true })
    return result
    }

    

    //* удаление заказа

    static async deleteBasket(id){
        const basket = await Basket.findByPk(id)
        basket.destroy()
        return id
    }
}

module.exports = BasketService