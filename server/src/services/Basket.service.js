const { Basket } = require ('../db/models')

class BasketService {

    //* Получение всех получение заказов

    static async getAllBaskets() {
        const baskets = await Basket.findAll()
        const result = baskets.map((el) => el.get({ plain: true }))
    return result
    }

    //* Получение одного заказа

    static async getOneBasket(id) {
        const basket = await Basket.findByPk(id);
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