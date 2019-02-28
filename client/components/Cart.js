import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'

class Cart extends Component {
  render() {
    return this.props.cart ? (
      <div>
        {this.props.cart.map(item => <CartItem key={item.id} item={item} />)}
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
