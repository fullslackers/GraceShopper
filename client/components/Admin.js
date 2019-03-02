import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchOrders} from '../store/orders'
import {fetchUsers} from '../store/allusers'
import {fetchCategories} from '../store/categories'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.fetchAllOrders()
    this.props.fetchAllUsers()
    this.props.fetchAllCategories()
  }

  render() {
    const {
      isAdmin,
      allUsers,
      allOrders,
      allCategories,
      allProducts
    } = this.props
    return (
      <div>
        <div>users: {allUsers.length}</div>
        <div>orders: {allOrders.length}</div>
        <div>products: {allProducts.length}</div>
        <div>categories: {allCategories.length}</div>
        <ul className="tabClear">
          <li>
            <Link to="allUsers">all users</Link>
          </li>
          <li>
            <Link to="allOrders">all orders</Link>
          </li>
          <li>
            <Link to="allCatwgories">all categories</Link>
          </li>
        </ul>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isAdmin: state.currentUser.isAdmin,
    allUsers: state.users,
    allOrders: state.orders.allOrders,
    allCategories: state.categories,
    allProducts: state.products.allProducts
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllOrders: () => dispatch(fetchOrders()),
    fetchAllUsers: () => dispatch(fetchUsers()),
    fetchAllCategories: () => dispatch(fetchCategories())
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   isAdmin: PropTypes.bool.isRequired,
// }
