import React, {Component} from 'react'
import axios from 'axios'
import {PAYMENT_SERVER_URL, STRIPE_PUBLISHABLE} from '../../secrets'
import StripeCheckout from 'react-stripe-checkout'
import {connect} from 'react-redux'
import {checkout} from './../store/cart'
import {withRouter} from 'react-router'
import {Button, Modal, Header, Icon} from 'semantic-ui-react'
class Checkout extends Component {
  constructor() {
    super()
    this.state = {
      orderComplete: false
    }
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
    this.setState({
      orderComplete: true
    })
    const {checkout, cart, history} = this.props
    await checkout(cart)
  }
  errorPayment(data) {
    alert('Payment Error')
  }
  render() {
    const {amount, history, cart} = this.props
    return (
      <>
        {cart[0] && (
          <StripeCheckout
            token={this.onToken(amount)}
            stripeKey={STRIPE_PUBLISHABLE}
            amount={Number(amount)}
          />
        )}
        {this.state.orderComplete && (
          <Modal defaultOpen basic size="small">
            <Header icon="cart" content="Thank You!" />
            <Modal.Content>
              <p>Your order has been placed.</p>
            </Modal.Content>
            <Modal.Actions>
              <Button
                onClick={() => history.push('/home')}
                color="green"
                inverted
              >
                <Icon name="checkmark" /> Okay
              </Button>
            </Modal.Actions>
          </Modal>
        )}
      </>
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
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  checkout: cart => {
    dispatch(checkout(cart))
  }
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Checkout)
)
