import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchSelectedUserOrders} from '../store/orders'
import {Table, Button, Header, Divider} from 'semantic-ui-react'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  componentDidMount() {
    const {id} = this.props.currentUser
    this.props.fetchUserOrders(id)
  }

  viewOrder = (event, id) => {
    this.props.history.push(`/orders/${id}`)
  }

  render() {
    const {email, firstName, lastName, isAdmin} = this.props.currentUser
    const orders = this.props.curUserOrders
    const name = firstName ? ` ${firstName}` : ''
    const noOrders =
      orders.length === 0 ? `You haven't place any orders yet!` : ''

    return (
      <div>
        <Divider hidden />
        <Header as="h1" align="center">
          My Account
        </Header>
        <Header as="h3" align="center">
          Hello{name}!
        </Header>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="3">ACCOUNT DETAILS</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>name</Table.Cell>
              <Table.Cell>
                {firstName} {lastName}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>email</Table.Cell>
              <Table.Cell>{email}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <Header>ORDER HISTORY</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Order Number</Table.HeaderCell>
              <Table.HeaderCell>Order Date</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>View Order</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {orders.map(order => {
              return (
                <Table.Row key={order.id}>
                  <Table.Cell>{order.orderNumber}</Table.Cell>
                  <Table.Cell>{order.orderDate.slice(0, 10)}</Table.Cell>
                  <Table.Cell>{order.status}</Table.Cell>
                  <Table.Cell>
                    <Button
                      id={order.id}
                      onClick={(event, name) => this.viewOrder(event, name.id)}
                    >
                      view order
                    </Button>
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
        <Header align="center">{noOrders}</Header>
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    currentUser: state.currentUser,
    email: state.currentUser.email,
    curUserOrders: state.orders.userOrders
  }
}
const mapDispatch = dispatch => ({
  fetchUserOrders: id => dispatch(fetchSelectedUserOrders(id))
})

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
