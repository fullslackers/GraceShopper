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
    return (
      <div>
        <h3>Welcome, {email}</h3>
        <h4>Your orders</h4>
        <table>
          <tbody>
            <tr>
              <th>Order Number</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
            {orders.map(order => {
              return (
                <tr key={order.id}>
                  <td>
                    <Link className="link" to={`/orders/${order.id}`}>
                      {order.id}
                    </Link>
                  </td>
                  <td>{order.quantity}</td>
                  <td>{order.price}</td>
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
