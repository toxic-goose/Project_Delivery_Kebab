module.exports = {
  access: {
    expiresIn: `${1000 * 60 * 3}`, // * время жизни access токена, живёт не долго, будет обновляться
  },
  refresh: {
    expiresIn: `${1000 * 60 * 60 * 12}` // * время жизни refresh токена,  живёт долго, хранит инфу об юзере
  }
}
