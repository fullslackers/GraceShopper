const router = require('express').Router()
// const {STRIPE_SK_TEST} = require('../../secrets')
const stripe = require('stripe')(process.env.STRIPE_SK_TEST)

router.post('/', async (req, res, next) => {
  try {
    const {token, amount} = req.body
    const charge = await stripe.charges.create({
      amount: amount,
      currency: 'usd',
      source: token.id
    })
    res.json(charge)
  } catch (err) {
    next(err)
  }
})

module.exports = router
