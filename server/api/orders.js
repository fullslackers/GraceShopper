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

router.get('/:orderId', loginRequired, async (req, res, next) => {
  try {
    const whichOrder = await Order.findOne({
      where: {
        id: req.params.orderId,
        userId: req.params.user
      },
      include: [{
        model: BuyingGroup,
        where: {/* buying group includes user */}
        required: true
      }]
    })
    if (whichOrder) {
      res.json(whichOrder)
    }
    else {
      // 403
    }

    const whichOrder = await Order.findById(req.params.orderId)
    if (whichOrder.userId === req.user.id) {
      res.json(whichOrder)
    }
    else {
      res.sendStatus(403)
    }
  } catch (err) { next(err) }
})

// Non-admin user only (completed sale)

//const handleHttpRequest = (req, res) {
//  const endpoint = findEndPointMatchingRequest(req, res)
//  const next = makeMagicNext()
//  try {
//    endpoint(req, res, next)
//  }
//  catch (error) {
//    console.log(next(error))
//  }
//}

function catchAsync (middleware) {
  return function (req, res, next) {
    try {
      await middleware(req, res, next)
    }
    catch (error) {
      next(error)
    }
  }
}

// REVIEW: lets discuss why we have to catch these errors
router.post('/', catchAsync(async (req, res, next) => {
  const newOrder = await Order.create(req.body)
  res.status(201).json(newOrder)
}))

// Admin-only, to update order status

router.put('/:orderId', async (req, res, next) => {
  try {
    const whichOrder = await Order.findById(req.params.orderId)
    const updatedOrder = await whichOrder.update(req.body)
    res.status(204).json(updatedOrder)
  } catch (err) { next(err) }
})
