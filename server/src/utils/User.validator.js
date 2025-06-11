class UserValidator {

  static validateMail(mail) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(mail)
  }

  static validatePassword(password) {
    const hasUpperCase = /[A-Z]/; // Проверка на наличие заглавной буквы
    const hasLowerCase = /[a-z]/; // Проверка на наличие строчной буквы
    const hasNumbers = /\d/; // Проверка на наличие цифры
    const hasSpecialCharacters = /[!@#$%^&*()-,.?":{}|<>]/; // Проверка на наличие спецсимвола
    const isValidLength = password.length >= 8; // Проверка на минимальную длину
  
    if (!hasUpperCase.test(password) || !hasLowerCase.test(password) ||
        !hasNumbers.test(password) || !hasSpecialCharacters.test(password) ||
        !isValidLength
    ) {
      return false
    } else {
      return true
    }
  }

  static validate({ login, mail, password }) {
    if (!login || !mail || !password ||
        typeof login !== 'string' || typeof mail !== 'string' || typeof password !== 'string' ||
        login.trim().length === 0 || mail.trim().length === 0 || password.trim().length === 0
    ) {
      return { isValid: false, error: 'Создание пользователя с такими полями не доступно' }
    }

    if (!this.validateMail(mail)) {
      return { isValid: false, error: 'Неподдерживаемый формат почты' }
    }
    if (!this.validatePassword(password)) {
      return { isValid: false, error: 'Неподдерживаемый формат пароля. Должен быть сиввол, большая буква, маленькая, цифра и не менее 8 символов.' }
    }

    return { isValid: true, error: null }
  }
 // ! qQ1*qqqqqqqq
}

module.exports = UserValidator
