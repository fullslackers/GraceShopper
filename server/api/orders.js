const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

// Decided to give orders its own api route, but potentially should be nested under '/users/:userId/orders'

// Only administrators should have access to all orders

router.get('/', async (req, res, next) => {
  try {
    const allOrders = await Order.findAll()
    res.json(allOrders)
  } catch (err) { next(err) }
})

// Associated non-admin User instance should also have access to these specific routes

router.get('/:orderId', async (req, res, next) => {
  try {
    const whichOrder = await Order.findById(req.params.orderId)
    res.json(whichOrder)
  } catch (err) { next(err) }
})

// Non-admin user only (completed sale)

router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body)
    res.status(201).json(newOrder)
  } catch (err) { next(err) }
})

// Admin-only, to update order status

router.put('/:orderId', async (req, res, next) => {
  try {
    const whichOrder = await Order.findById(req.params.orderId)
    const updatedOrder = await whichOrder.update(req.body)
    res.status(204).json(updatedOrder)
  } catch (err) { next(err) }
})
