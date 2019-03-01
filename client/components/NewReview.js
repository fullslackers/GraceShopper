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
      isMistake: true
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
    const productId = this.props.location.pathname.split('/')[3]
    const rating = '5'
    this.setState({newReview: {description, rating, productId}})
    console.log(this.state.newReview)
  }

  render() {
    const userIdWhoCanWriteReview = this.props.location.pathname.split('/')[4]
    //for what products user can write a review?
    console.log(this.props.params)
    if (
      this.props.currentUser.id === Number(userIdWhoCanWriteReview) ||
      this.props.currentUser.isAdmin
    ) {
      return (
        <div>
          <h1>Write a review</h1>
          <form onSubmit={this.saveNewReview}>
            <input type="text" onChange={this.changeFormFields} />
            <button type="submit">Submit</button>
          </form>
        </div>
      )
    }

    return <div />
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
