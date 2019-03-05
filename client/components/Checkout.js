import React, {Component} from 'react'
import axios from 'axios'
import {PAYMENT_SERVER_URL, STRIPE_PUBLISHABLE} from '../../secrets'
import StripeCheckout from 'react-stripe-checkout'
import {connect} from 'react-redux'
import {checkout} from './../store/cart'
import {fetchOrders} from './../store/orders'

class Checkout extends Component {
  constructor() {
    super()
    this.onToken = this.onToken.bind(this)
    this.successPayment = this.successPayment.bind(this)
    this.errorPayment = this.errorPayment.bind(this)
  }

  onToken(amount) {
    return async token => {
      try {
        await axios.post('/api/checkout', {
          token,
          amount
        })
        this.successPayment()
      } catch (err) {
        this.errorPayment(err)
      }
    }
  }

  async successPayment() {
    const {checkout, cart, fetchOrders, orders} = this.props
    await checkout(cart)
    await fetchOrders()
    await console.log(orders)
  }
  errorPayment(data) {
    console.log(data)
  }
  render() {
    const {amount} = this.props
    return (
      <StripeCheckout
        token={this.onToken(amount)}
        stripeKey={STRIPE_PUBLISHABLE}
        amount={Number(amount)}
      />
    )
  }
}

const mapStateToProps = state => ({
  amount: parseInt(
    (
      (state.cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0) +
        10) *
      100
    ).toFixed(2),
    10
  ),
  cart: state.cart,
  orders: state.orders
})

const mapDispatchToProps = dispatch => ({
  checkout: cart => {
    dispatch(checkout(cart))
  },
  fetchOrders: () => {
    dispatch(fetchOrders())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
