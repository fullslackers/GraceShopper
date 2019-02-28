import React, {Component} from 'react'
import {connect} from 'react-redux'
import {removeFromCart, updateQuantity} from './../store/cart'

class CartItem extends Component {
  refreshQuantity = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const {id, title, imageUrl, price, quantity} = this.props.item
    return (
      <div>
        <div>
          {id}
          {title}
          {imageUrl}
          {price}
        </div>
        <div>
          {quantity > 1 ? (
            <button
              onClick={() =>
                this.props.updateQuantity(this.props.item, 'decrement')
              }
              type="button"
            >
              -
            </button>
          ) : (
            ''
          )}
          {quantity}
          <button
            onClick={() =>
              this.props.updateQuantity(this.props.item, 'increment')
            }
            type="button"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={() => this.props.removeFromCart(this.props.item)}
        >
          Remove Item
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  cart: state.cart
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  removeFromCart: product => {
    dispatch(removeFromCart(product))
  },
  updateQuantity: (product, opType) => {
    dispatch(updateQuantity(product, opType))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CartItem)
