const { Backet } = require("../db/models");
const { Order } = require("../db/models");
const { User } = require('../db/models')

class BasketService {
  //* Получение всех получение заказов

  static async getAllBaskets() {
    const baskets = await Backet.findAll();
    const result = baskets.map((el) => el.get({ plain: true }));
    return result;
  }

  //* Получение одного заказа

  static async getOneBasket(id) {
    const basket = await Backet.findByPk(id);
    const result = basket.get({ plain: true });
    return result;
  }

  //* удаление заказа

  static async deleteBasket(id) {
    const basket = await Backet.findByPk(id);
    basket.destroy();
    return id;
  }

  //* получение всех заказов по конкретному пользователю

  static async getOrdersByUser(){
    const ordersAsBuyer = await Backet.findAll(
        
        {
            where: {
              buyer_id: 1 // Фильтруем по ID покупателя
            },
            include: [{
              model: Order,
              as: 'Order', // Используем уникальный алиас
              attributes: ['id', 'order_name', 'price', 'location', 'description', 'img_path', 'sale'],
              include: [{
                model: User,
                as: 'Courier', // Алиас для курьера
                attributes: ['id', 'user_name', 'email']
              }]
            }],
            attributes: [] // Если не нужно возвращать поля из Backet
          }
    );
      return ordersAsBuyer

  }
}

module.exports = BasketService;
