import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Menu, Icon, Button} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <Menu attached="top" stackable>
    <Menu.Item as={Link} to="/" id="logo">
      <h1>Pristine Pencillorum</h1>
    </Menu.Item>
    <Menu.Menu position="left">
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}

          <Menu.Item>
            <Link to="/home">
              <Button animated color="blue">
                <Button.Content visible>
                  {' '}
                  <Icon name="pencil alternate" />
                </Button.Content>
                <Button.Content hidden>User</Button.Content>
              </Button>
            </Link>

            <Link to="#" onClick={handleClick}>
              <Button animated>
                <Button.Content hidden>
                  {' '}
                  <Icon name="undo" />
                </Button.Content>
                <Button.Content visible>Logout</Button.Content>
              </Button>
            </Link>

            {isAdmin ? (
              <Link to="/admin">
                <Button animated color="blue">
                  <Button.Content visible>
                    {' '}
                    <Icon name="user secret" />
                  </Button.Content>
                  <Button.Content hidden>Capo</Button.Content>
                </Button>
              </Link>
            ) : (
              ''
            )}
          </Menu.Item>
        </div>
      ) : (
        <div>
          <Menu.Menu position="left">
            {/* The navbar will show these links before you log in */}

            <Menu.Item>
              <Link to="/login">
                <Button primary>Login</Button>
              </Link>

              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </Menu.Item>
          </Menu.Menu>
        </div>
      )}

      {isAdmin ? (
        <React.Fragment>
          <Menu.Item as={Link} to="/products/new">
            <Button>Create New Product</Button>
          </Menu.Item>
        </React.Fragment>
      ) : (
        ''
      )}
    </Menu.Menu>
    <Menu.Item position="right">
      <Link to="/cart">
        <Button animated color="blue">
          <Button.Content visible>
            {' '}
            <Icon name="shopping cart" />
          </Button.Content>
          <Button.Content hidden>Cart</Button.Content>
        </Button>
      </Link>
    </Menu.Item>
  </Menu>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.currentUser.id,
    isAdmin: state.currentUser.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
