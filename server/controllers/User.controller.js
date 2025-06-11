
const UserService = require('../services/User.service')
const { formatResponse } = require('../utils/formatResponse')

class UserController {
  // * контроллер на получение всех
  static async getAll(req, res) {
    try {
      const result = await UserService.getAllUsers()
      res.status(200).json(formatResponse({
        statusCode: 200, message: 'Все пользователи',
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
      const user = await UserService.getOneUser(id)
      res.status(200).json(formatResponse({
        statusCode: 200, message: 'Один пользователь',
        data: user
      }))
    } catch (error) {
      console.log(error)
      res.status(500).json(formatResponse({
        statusCode: 500, message: 'Не удалось получить пользователя',
        error: error.message
      }))
    }
  }
  // * контроллер на создание
  // static async register(req, res) {
  //   try {
  //     const { login, mail, password } = req.body
  //     // * Применяем валидатор
  //     const { isValid, error } = UserValidator.validate({
  //       login, mail, password
  //     })
      
  //     if (!isValid) {
  //       res.status(400).json(formatResponse({
  //         statusCode: 400, message: 'Валидация не прошла',
  //         error
  //       }))
  //     } else {
  //       // * хэширование паролей
  //       const hashedPassword = await bcrypt.hash(password, 10);
  //       const normalizedEmail = mail.toLowerCase();
  //       // * Проверка почты
  //       const userFound = await UserService.getByEmail(normalizedEmail);
  //       if (userFound) {
  //         res.status(400).json(formatResponse({
  //           statusCode: 400, message: 'Пользователь с такой почтой уже зарегистрирован',
  //           error: 'Пользователь с такой почтой уже зарегистрирован'
  //         }))
  //       } else {
  //         const user = await UserService.registerUser({
  //           login, mail: normalizedEmail, password: hashedPassword
  //         })
  //         // * Удаление пароля
  //         delete user.password
  //         console.log(" user:", user)

  //         res.status(200).json(formatResponse({
  //           statusCode: 200, message: 'Пользователь успешно зарегистрирован',
  //           data: user
  //         }))
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     res.status(500).json(formatResponse({
  //       statusCode: 500, message: 'Не удалось создать пользователя',
  //       error: error.message
  //     }))
  //   }
  // }
  // *  контроллер на удаление
  static async delete(req, res) {
    try {
      const { id } = req.params
      console.log(" id:", id)
      const result = await UserService.deleteUser(id)
      console.log(" result:", result)
      res.status(200).json(formatResponse({
        statusCode: 200, message: 'Пользователь успешно удалён',
        data: result
      }))
    } catch (error) {
      console.log(error)
      res.status(500).json(formatResponse({
        statusCode: 500, message: 'Не удалось удалить пользователя',
        error: error.message
      }))
    }
  }
  // * обновление
  static async update(req, res) {
    try {
      const { id } = req.params
      const { login, mail, password } = req.body
      const updatedUser = await UserService.updateUser(id, { login, mail, password })
      res.status(200).json(formatResponse({
        statusCode: 200, message: 'Пользователь успешно обновлён',
        data: updatedUser
      }))
    } catch (error) {
      res.status(500).json(formatResponse({
        statusCode: 500, message: 'Не удалось обновить пользователя',
        error: error.message
      }))
    }
  }

}

module.exports = UserController
