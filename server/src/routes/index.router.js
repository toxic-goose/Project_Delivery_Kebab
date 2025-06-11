const indexRouter = require('express').Router()
const orderRouter = require('./order.router')
const mainRouter = require('./main.router')
const authRouter = require('./auth.router')

indexRouter.use('/', mainRouter)
indexRouter.use('/auth', authRouter)
indexRouter.use('/order', orderRouter)

indexRouter.use((req, res) => {
  res.status(404).send('Страница не найдена');
});

module.exports = indexRouter
