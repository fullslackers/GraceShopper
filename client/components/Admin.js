import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchOrders} from '../store/orders'
import {fetchUsers} from '../store/allusers'
import {fetchCategories} from '../store/categories'
import AllUsers from './AllUsers'
import AllOrders from './AllOrders'
import {AllCategories} from './AllCategories'
import {Tab} from 'semantic-ui-react'

export class AdminHome extends React.Component {
  constructor() {
    super()
    this.state = {
      curPageOrders: 1,
      curPageUsers: 1,
      curPageCategories: 1
    }
  }

  componentDidMount() {
    this.props.fetchAllOrders(this.state.curPageOrders)
    this.props.fetchAllUsers(this.state.curPageUsers)
    this.props.fetchAllCategories(this.state.curPageCategories)
  }

  selectContent = event => {
    event.preventDefault()
  }

  render() {
    const {isAdmin, allUsers, allOrders, allCategories} = this.props

    const panes = [
      {
        menuItem: {key: 'categories', icon: 'tag', content: 'all categories'},
        render: () => (
          <Tab.Pane>
            <AllCategories categories={allCategories} />
          </Tab.Pane>
        )
      },
      {
        menuItem: {key: 'orders', icon: 'pencil', content: 'all orders'},
        render: () => (
          <Tab.Pane>
            <AllOrders orders={allOrders} />
          </Tab.Pane>
        )
      },
      {
        menuItem: {key: 'users', icon: 'users', content: 'all users'},
        render: () => (
          <Tab.Pane>
            <AllUsers users={allUsers} />
          </Tab.Pane>
        )
      }
    ]

    if (!isAdmin) return <div />
    return (
      <div>
        <br />
        <br />
        <Tab
          menu={{fluid: true, vertical: true, tabular: true}}
          panes={panes}
        />
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
    allCategories: state.categories
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
