const indexRouter = require('express').Router()

const mainRouter = require('./main.router')
const userRouter = require('./user.router')
const authRouter = require('./auth.router')

indexRouter.use('/', mainRouter)
indexRouter.use('/users', userRouter)
indexRouter.use('/auth', authRouter)

indexRouter.use((req, res) => {
  res.status(404).send('Страница не найдена');
});

module.exports = indexRouter
