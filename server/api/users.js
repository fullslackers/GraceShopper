const router = require('express').Router()
const {User} = require('../db/models')

router.param('userId', async (req, res, next, id) => {
  try {
    const user = await User.findByPk(id)
    if (user) {
      req.user = user
      next()
    } else res.status(404).send('404 Error: User Not Found')
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', (req, res, next) => {
  try {
    res.send(req.user)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.send(user)
  } catch (error) {
    next(error)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const updatedUser = await req.user.update(req.body)
    res.send(updatedUser)
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    await req.user.destroy()
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

module.exports = router
