import React, {Component} from 'react'
import {connect} from 'react-redux'
import {removeFromCart, updateQuantity} from './../store/cart'
import {Table, Header, Button, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class CartItem extends Component {
  refreshQuantity = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const {id, title, imageUrl, price, quantity} = this.props.item
    return (
      <Table.Row>
        <Table.Cell>
          <Header as="h3" image>
            <Image src={imageUrl} rounded size="medium" />
            <Header.Content>
              <Link to={`/products/${id}`}>{title}</Link>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell singleLine>{`$${price}`}</Table.Cell>
        <Table.Cell>
          {quantity > 1 ? (
            <Button
              onClick={() =>
                this.props.updateQuantity(this.props.item, 'decrement')
              }
              type="button"
            >
              -
            </Button>
          ) : (
            ''
          )}
          {`${quantity}  `}

          <Button
            onClick={() =>
              this.props.updateQuantity(this.props.item, 'increment')
            }
            type="button"
          >
            +
          </Button>
        </Table.Cell>
        <Table.Cell textAlign="center">
          ${(quantity * price).toFixed(2)}
        </Table.Cell>
        <Table.Cell>
          <Button
            negative
            basic
            onClick={() => this.props.removeFromCart(this.props.item)}
          >
            Remove Item
          </Button>
        </Table.Cell>
      </Table.Row>

      // <div>
      //   <div>
      //     {id}
      //     {title}
      //     {imageUrl}
      //     {price}
      //   </div>
      //   <div>
      //     {quantity > 1 ? (
      //       <button
      //         onClick={() =>
      //           this.props.updateQuantity(this.props.item, 'decrement')
      //         }
      //         type="button"
      //       >
      //         -
      //       </button>
      //     ) : (
      //       ''
      //     )}
      //     {quantity}
      //     <button
      //       onClick={() =>
      //         this.props.updateQuantity(this.props.item, 'increment')
      //       }
      //       type="button"
      //     >
      //       +
      //     </button>
      //   </div>
      //   <button
      //     type="button"
      //     onClick={() => this.props.removeFromCart(this.props.item)}
      //   >
      //     Remove Item
      //   </button>
      // </div>
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
