import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchSelectedUserOrders} from '../store/orders'
import {Link} from 'react-router-dom'
/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  componentDidMount() {
    const {id} = this.props.currentUser
    this.props.fetchUserOrders(id)
  }

  render() {
    const {email, firstName, lastName, isAdmin} = this.props.currentUser
    const orders = this.props.curUserOrders
    const name = firstName ? ` ${firstName}` : ''
    const noOrders =
      orders.length === 0 ? `You haven't place any orders yet!` : ''

    return (
      <div>
        <h1 align="center">My Account</h1>
        <h3 align="center">Hello{name}!</h3>
        <h3>ACCOUNT DETAILS</h3>
        {firstName || lastName ? (
          <h5>
            Name: {firstName} {lastName}
          </h5>
        ) : (
          ''
        )}
        <h5>Email: {email}</h5>

        <h3>ORDER HISTORY</h3>
        <table>
          <tbody>
            <tr>
              <th>Order Number</th>
              <th>Order Date</th>
              <th>Status</th>
            </tr>
            {orders.map(order => {
              return (
                <tr key={order.id}>
                  <td>
                    <Link className="link" to={`/orders/${order.id}`}>
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td>{order.orderDate.slice(0, 10)}</td>
                  <td>{order.status}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div>{noOrders}</div>
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
