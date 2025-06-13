const jwt = require('jsonwebtoken')

const { formatResponse } = require('../utils/formatResponse')

const { SECRET_ACCESS_TOKEN } = process.env;

const verifyAccessToken = (req, res, next) => {
  try {
    // * из заголовков по ключу authorization получаем строку `Bearer, ${accessToken}`
    // * сплитим её и достаё второй элемент
    const accessToken = req.headers.authorization.split(' ')[1]
    console.log(" accessToken:", accessToken)
    const { user } = jwt.verify(accessToken, SECRET_ACCESS_TOKEN)
    res.locals.user = user
    next()
  } catch (error) {
    console.log('Invalid access token', error)
    res.status(401).clearCookie("refreshTokenWhales")
      .json(formatResponse({
        statusCode: 401, message: 'Неверный аксесс токен',
        error: error.message
      }))
  }
}

module.exports = verifyAccessToken
