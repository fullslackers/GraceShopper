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
import {Tabs, TabLink, TabContent} from 'react-tabs-redux'

const styles = {
  tabs: {
    width: '100%',
    display: 'inline-block',
    marginRight: '30px',
    verticalAlign: 'top'
  },
  tabLink: {
    height: '30px',
    lineHeight: '30px',
    padding: '0 15px',
    cursor: 'pointer',
    border: 'none',
    borderBottom: '2px solid transparent',
    display: 'inline-block'
  }
}

export class AdminHome extends React.Component {
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
    if (!isAdmin) return <div />
    return (
      <div>
        <div style={styles.center}>
          <div>users: {allUsers.length}</div>
          <div>orders: {allOrders.length}</div>
          <div>products: {allProducts.length}</div>
          <div>categories: {allCategories.length}</div>
        </div>
        <br />
        <br />
        <Tabs renderActiveTabContentOnly={true} style={styles.tabs}>
          <TabLink to="tab1" style={styles.tabLink}>
            all users
          </TabLink>
          <TabLink to="tab2" style={styles.tabLink}>
            all orders
          </TabLink>
          <TabLink to="tab3" style={styles.tabLink}>
            all categories
          </TabLink>
          <TabContent for="tab1">
            <AllUsers users={allUsers} />
          </TabContent>
          <TabContent for="tab2">
            <AllOrders orders={allOrders} />
          </TabContent>
          <TabContent for="tab3">
            <AllCategories categories={allCategories} />
          </TabContent>
        </Tabs>
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
