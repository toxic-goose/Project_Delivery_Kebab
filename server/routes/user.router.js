const router = require('express').Router()

const path = require('path')

const { checkBody, checkId } = require('../middlewares/checkBody')

const UserController = require('../controllers/User.controller')

// * /users/
// router.get('/', UserController.getAll)

// * /users/register
// * ? - req.query - объект адресной строки (небезопасно)
// router.get('/register', (req, res) => {
//   console.log(req.query)
//   res.status(200).sendFile(path.resolve(__dirname, '../registerForm.html'))
// })

// * ? req.body
// * /users/register
// router.post('/register', checkBody, UserController.register)

// * /users
// router.delete('/', checkId, async (req, res) => {
//   const { id } = req.body;
//   try {
//     const user = await User.findByPk(id)
//     user.destroy()
//     res.status(200).send('Пользователь удалён')
//   } catch (error) {
//     console.log(error)
//     res.sendStatus(500)
//   }
// })

// router.delete('/:id', checkId, UserController.delete)

// ! Все параметризированные пиши после остальных!
// * /users/:id
// router.get('/:id', UserController.getOne)


const verifyAccessToken = require('../middlewares/verifyAccessToken')


router.get('/register', (req, res) => {
  console.log(req.query)
  res.status(200).sendFile(path.resolve(__dirname, '../registerForm.html'))
})

router
  .get('/', UserController.getAll)
  // .post('/register', checkBody, UserController.register)
  .get('/:id', UserController.getOne)
  .delete('/:id', verifyAccessToken, checkId, UserController.delete)
  .put('/:id', verifyAccessToken, UserController.update)

module.exports = router
