const router = require('express').Router()


// const { checkBody, checkId } = require('../middlewares/checkBody')

const OrderController = require('../controllers/Order.controller')






// router.get('/register', (req, res) => {
// console.log(req.query)
// res.status(200).sendFile(path.resolve(__dirname, '../registerForm.html'))
// })

router
.get('/', OrderController.getAll)
.post('/createOrder', OrderController.register)
.delete('/:id', OrderController.delete)
.get('/:id', OrderController.getOne)
.put('/:id', OrderController.update)

module.exports = router