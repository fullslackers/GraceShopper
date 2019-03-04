import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {
  Form,
  Container,
  Header,
  Divider,
  Button,
  Message
} from 'semantic-ui-react'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <Container>
      <Divider hidden />
      <Header as="h1">{displayName}</Header>
      <div>
        <Form
          onSubmit={handleSubmit}
          name={name}
          className={error ? 'error' : ''}
        >
          <Form.Group>
            <Form.Field width={4}>
              <div>
                <label htmlFor="email">
                  <small>Email</small>
                </label>
                <input required name="email" type="text" />
              </div>
            </Form.Field>
            <Form.Field width={4}>
              <div>
                <label htmlFor="password">
                  <small>Password</small>
                </label>
                <input required name="password" type="password" />
              </div>
            </Form.Field>
          </Form.Group>
          {error &&
            error.response && (
              <Message error header="Fail" content={error.response.data} />
            )}
          <Form.Button type="submit">{displayName}</Form.Button>
          <h5>or</h5>
          <Button as="a" href="/auth/google">
            {displayName} with Google
          </Button>
        </Form>
      </div>
    </Container>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.currentUser.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.currentUser.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
