const { User } = require('../db/models')

function checkBody(req, res, next) {
  const { order_name, img_path, description, price, sale, location } = req.body
  if (order_name || !img_path || !description || !price || !sale || !location) {
    res.send('Все поля должны быть заполнены. ')
  } else {
    next()
  }
}

async function checkId(req, res, next) {
  const { id } = req.params
  if (Number(id)) {
    const user = await User.findByPk(id)
    if (user) {
      next()
    } else {
      res.status(400).send('Заказ не найден')
    }
  } else {
    res.status(400).send('Невалидный id. Должен быть числом')
  }
}

module.exports = { checkId, checkBody }
