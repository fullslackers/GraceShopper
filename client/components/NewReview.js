import React from 'react'
import {connect} from 'react-redux'
import {createReview} from '../store/reviews'

class NewReview extends React.Component {
  constructor() {
    super()
    this.state = {
      newReview: {
        description: '',
        productId: null,
        rating: null
      },
      isSubmitted: false,
      isMistake: false
    }
  }

  componentDidUpdate() {
    if (this.state.isSubmitted) {
      let path = '/home/'
      this.props.history.push(path)
      this.setState({
        isSubmitted: false,
        isMistake: false
      })
    }
  }

  saveNewReview = event => {
    event.preventDefault()
    console.log(this.state.newReview)
    if (this.state.newReview.description) {
      this.props.createReview(this.state.newReview)
      this.setState({
        isSubmitted: true
      })
    } else {
      this.setState({
        isMistake: true
      })
    }
  }

  changeFormFields = event => {
    const description = event.target.value
    //const productId = this.props.location.pathname.split('/')[3]
    const productId = this.props.location.state.productId
    const rating = '5'
    this.setState({newReview: {description, rating, productId}})
    console.log(this.state.newReview)
  }

  render() {
    if (this.props.location.state) {
      return (
        <div>
          <h1>Write a review</h1>
          <form onSubmit={this.saveNewReview}>
            <input type="text" onChange={this.changeFormFields} />
            <button type="submit">Submit</button>
          </form>
          {this.state.isMistake ? (
            <div className="center">You have to write a review!</div>
          ) : (
            ''
          )}
        </div>
      )
    }
    return <div>You need to go to your profile to write a review</div>
  }
}

const mapState = state => {
  return {
    currentUser: state.currentUser,
    orders: state.orders.allOrders,
    products: state.products.allProducts,
    selectedOrder: state.orders.selectedOrder
  }
}

const mapDispatch = dispatch => ({
  createReview: review => dispatch(createReview(review))
})

export default connect(mapState, mapDispatch)(NewReview)
