const router = require('express').Router()
router.get('/', (request, response) => {
response.send(`
<link rel='stylesheet' href='../styles/styles.css' >
<h1 class='header'>${response.locals.greetings}</h1>
<img src='../images/4big.jpg' alt='whales' class='whales' />
<a href='/api/v1.0/users'>Все пользователи</a>  
<a href='/api/v1.0/users/register'>Создать пользователя</a>
`)
})
module.exports = router