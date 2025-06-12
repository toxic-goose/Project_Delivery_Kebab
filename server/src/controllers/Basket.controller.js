const BasketSevice = require("../services/Basket.service");
const { formatResponse } = require("../utils/formatResponse");

class BasketController {
  // * контроллер на получение всех
  static async getAll(req, res) {
    try {
      const result = await BasketSevice.getAllBaskets();
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Все заказы",
          data: result,
        })
      );
    } catch (error) {
      console.log(error);
      res.status(401).json(
        formatResponse({
          statusCode: 401,
          message: "У тебя нет прав",
          error: error.message,
        })
      );
    }
  }
  // * контроллер на получение одного заказа
  static async getOne(req, res) {
    try {
      const { id } = req.params;
      const basket = await BasketController.getOneBasket(id);
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Один заказ",
          data: basket,
        })
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Невозможно просмотреть заказ",
          error: error.message,
        })
      );
    }
  }

  // *  контроллер на удаление заказа
  static async delete(req, res) {
    try {
      const { id } = req.params;

      const basket = await BasketController.deleteBasket(id);

      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Заказ успешно удалён",
          data: basket,
        })
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось удалить заказ",
          error: error.message,
        })
      );
    }
  }
}

module.exports = BasketController;
