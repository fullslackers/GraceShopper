import React from 'react'
import axios from 'axios'
import {PAYMENT_SERVER_URL, STRIPE_PUBLISHABLE} from '../../secrets'
import StripeCheckout from 'react-stripe-checkout'

const successPayment = data => {
  alert('Payment Successful!')
}

const errorPayment = data => {
  alert('Payment Error!')
}

const onToken = async token => {
  try {
    await axios.post('/api/checkout', {
      token,
      amount: 123
    })
  } catch (err) {
    errorPayment(err)
  }
}

const Checkout = ({amount}) => (
  <StripeCheckout
    token={onToken}
    stripeKey={STRIPE_PUBLISHABLE}
    amount={Number(amount)}
  />
)

export default Checkout
