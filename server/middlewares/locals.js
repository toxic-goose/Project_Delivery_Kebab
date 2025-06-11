function getGreetings(req, res, next) {
  res.locals.greetings = 'Привет Китам!'
  console.log(res.locals)
  next()
} 

module.exports = getGreetings
