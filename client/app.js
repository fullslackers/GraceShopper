import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = (props) => {
  /*
  if (props.unknownError) {
    return <div>ERROR: {props.unknownError.message}. Please contact support.</div>
  }
  if (props.unauthenticatedError) {
    return <Login/>
  }
  */
  return (
    <div>
      <Navbar />
      {props.unknownError ? <div>Error</div> : <Routes/>}
    </div>
  )
}

const mapState = (state) => {
  return { unknownError: state.error.unknownError }
}

export default connect(mapState, undefined)(App)
