import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchSelectedUserOrders} from '../store/orders'
import {Link} from 'react-router-dom'
/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    const id = this.props.id
    this.props.fetchUserOrders(id)
  }

  render() {
    const {email} = this.props
    const orders = this.props.userOrders
    if (orders.length === 0) {
      return <h3>You don't have any orders</h3>
    }
    return (
      <div>
        <h3>Welcome, {email}</h3>
        <h4>Your orders</h4>
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
                      {order.id}
                    </Link>
                  </td>
                  <td>{order.orderDate.slice(0, 10)}</td>
                  <td>{order.status}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.currentUser.email,
    id: state.currentUser.id,
    isAdmin: state.currentUser.isAdmin,
    userOrders: state.orders.userOrders
  }
}
const mapDispatch = dispatch => {
  return {
    fetchUserOrders: id => dispatch(fetchSelectedUserOrders(id))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
