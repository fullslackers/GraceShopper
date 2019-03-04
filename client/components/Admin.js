import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchOrders} from '../store/orders'
import {fetchUsers} from '../store/allusers'
import {fetchCategories} from '../store/categories'
import {AllUsers} from './AllUsers'
import {AllOrders} from './AllOrders'
import {AllCategories} from './AllCategories'
import {withRouter, Route, Switch} from 'react-router-dom'

/**
 * COMPONENT
 */
export class AdminHome extends React.Component {
  constructor() {
    super()
    this.state = {
      selected: null
    }
  }

  componentDidMount() {
    this.props.fetchAllOrders()
    this.props.fetchAllUsers()
    this.props.fetchAllCategories()
  }

  selectContent = event => {
    event.preventDefault()
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

        {/* <form className="tab" onSubmit={this.selectContent}>
          <button className="tablinks" type="submit">
            <Link to={{pathname: '/categories', state: {'categories':{allCategories}}}}>all categories</Link>
          </button>
          <button className="tablinks" type="submit" >
            <Link to={{pathname: '/orders'}}>all orders</Link>
          </button>
          <button className="tablinks" type="submit" >
            <Link to={{pathname: '/users'}}>all users</Link>
          </button>
        </form> */}
        {/* <Switch>
          <Route to="/users" component={AllUsers} />
          <Route to="orders" component={AllOrders} />
          <Route to="/categories" component={AllCategories} />
        </Switch> */}
        <AllUsers users={allUsers} />
        <AllOrders orders={allOrders} />
        <AllCategories categories={allCategories} />
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

export default connect(mapState, mapDispatch)(AdminHome)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   isAdmin: PropTypes.bool.isRequired,
// }
