const indexRouter = require('express').Router()
const orderRouter = require('./order.router')
const mainRouter = require('./main.router')
const authRouter = require('./auth.router')
const basketRouter = require('./basket.router')

indexRouter.use('/', mainRouter)
indexRouter.use('/auth', authRouter)
indexRouter.use('/order', orderRouter)
indexRouter.use('/basket', basketRouter)

indexRouter.use((req, res) => {
  res.status(404).send('Страница не найдена');
});

module.exports = indexRouter
