import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'
import {checkout} from './../store/cart'

class Cart extends Component {
  render() {
    return this.props.cart ? (
      <div>
        <div>
          {this.props.cart.map(item => <CartItem key={item.id} item={item} />)}
        </div>
        <div>
          {`Total: $${this.props.cart
            .reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
            .toFixed(2)}`}
          {/* Rendering the submit order button here until we figure out where it needs to go. */}
          <button
            type="button"
            onClick={() => this.props.checkout(this.props.cart)}
          >
            Submit Order
          </button>
        </div>
      </div>
    ) : (
      ''
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  cart: state.cart
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  checkout: cart => {
    dispatch(checkout(cart))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
