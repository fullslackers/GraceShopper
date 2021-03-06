import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  HomePage,
  SingleProduct,
  NewProduct,
  EditProduct,
  NewReview,
  SingleOrder,
  Cart,
  Admin
} from './components'
import {me} from './store'
import {fetchProducts} from './store/products'
import {fetchCategories} from './store/categories'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.fetchedProducts()
    this.props.fetchedCategories()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/page=:pageid" component={HomePage} />
        <Route path="/products/reviews/new" component={NewReview} />
        <Route exact path="/products/new" component={NewProduct} />
        <Route path="/products/:productId/edit" component={EditProduct} />
        <Route path="/products/:productId" component={SingleProduct} />
        <Route exact path="/categories/:category" component={HomePage} />
        <Route
          exact
          path="/categories/:category?page=pageid"
          component={HomePage}
        />
        <Route exact path="/orders/:orderId" component={SingleOrder} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    // Being 'logged in' for our purposes will be defined has having a state.currentUser that has a truthy id.
    // Otherwise, currentUser will be an empty object, and state.currentUser.id will be falsey
    isLoggedIn: !!state.currentUser.id
  }
}

const mapDispatch = dispatch => {
  return {
    fetchedProducts: () => dispatch(fetchProducts()),
    fetchedCategories: () => dispatch(fetchCategories()),
    loadInitialData: () => dispatch(me())
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
