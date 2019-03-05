import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'
// import Checkout from './Checkout'
import {checkout} from './../store/cart'
import {
  Table,
  Container,
  Divider,
  Header,
  Button,
  Message
} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

class Cart extends Component {
  render() {
    return !this.props.cart[0] ? (
      <Container>
        <Divider hidden />
        <NavLink to="/">
          <Button color="blue">
            Continue <strong>shopping...</strong>
          </Button>
        </NavLink>
      </Container>
    ) : (
      <Container>
        <Divider horizontal />
        <Header as="h1" content="Your cart" />
        <Divider horizontal />
        <Table padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Item subtotal</Table.HeaderCell>
              <Table.HeaderCell>Remove</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
            <Table.Row>
              <Table.Cell>Shipping</Table.Cell>
              <Table.Cell />
              <Table.Cell />
              <Table.Cell textAlign="center">$10.00</Table.Cell>
              <Table.Cell />
            </Table.Row>
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell>Grand Total</Table.HeaderCell>
              <Table.HeaderCell />
              <Table.HeaderCell />
              <Table.HeaderCell textAlign="center">
                {`Total: $${this.props.cart
                  .reduce((acc, cur) => acc + cur.price * cur.quantity + 10, 0)
                  .toFixed(2)}`}
              </Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Footer>
        </Table>
        <Button
          primary
          type="submit"
          onClick={() => this.props.checkout(this.props.cart)}
        >
          Check out
        </Button>
        <Divider horizontal />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  checkout: cart => {
    dispatch(checkout(cart))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
