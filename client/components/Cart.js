import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'

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

export default connect(mapStateToProps)(Cart)
