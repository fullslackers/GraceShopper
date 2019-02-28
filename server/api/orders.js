const router = require('express').Router()
const {Order, Product} = require('../db/models')
const {loginCheckMiddleware, adminCheckMiddleware} = require('./middleware')
module.exports = router

// Decided to give orders its own api route, but potentially should be nested under '/users/:userId/orders'

// Only administrators should have access to all orders

router.get('/', adminCheckMiddleware, async (req, res, next) => {
  try {
    const allOrders = await Order.findAll()
    res.json(allOrders)
  } catch (err) {
    next(err)
  }
})

// Associated non-admin User instance should also have access to these specific routes

router.get(
  '/user/:userId',
  loginCheckMiddleware,
  adminCheckMiddleware,
  async (req, res, next) => {
    try {
      const whichOrders = await Order.findAll({
        where: {
          userId: req.params.userId
        }
      })
      if (whichOrders) res.json(whichOrders)
      else res.sendStatus(401)
    } catch (err) {
      next(err)
    }
  }
)

router.get(
  '/:orderId',
  loginCheckMiddleware,
  adminCheckMiddleware,
  async (req, res, next) => {
    try {
      const whichOrder = await Order.findOne({
        include: [Product],
        where: {
          id: req.params.orderId,
          userId: req.user.id
        }
      })
      if (whichOrder) res.json(whichOrder)
      else res.sendStatus(401)
    } catch (err) {
      next(err)
    }
  }
)

// Non-admin user only (completed sale)

router.post('/', loginCheckMiddleware, async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body)
    res.status(201).json(newOrder)
  } catch (err) {
    next(err)
  }
})

// Admin-only, to update order status

router.put('/:orderId', adminCheckMiddleware, async (req, res, next) => {
  try {
    const whichOrder = await Order.findById(req.params.orderId)
    const updatedOrder = await whichOrder.update(req.body)
    res.status(204).json(updatedOrder)
  } catch (err) {
    next(err)
  }
})
