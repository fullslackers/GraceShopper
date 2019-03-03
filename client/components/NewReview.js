/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {createReview} from '../store/reviews'
import StarRatingComponent from 'react-star-rating-component'

class NewReview extends React.Component {
  constructor() {
    super()
    this.state = {
      newReview: {
        description: '',
        productId: null
      },
      isSubmitted: false,
      isMistake: false,
      rating: null
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

  onStarClick = (nextValue, prevValue, name) => {
    this.setState({rating: nextValue})
  }

  saveNewReview = event => {
    event.preventDefault()
    if (this.state.newReview.description && this.state.rating) {
      const rating = this.state.rating.toString()
      const {description, productId} = this.state.newReview
      const obj = {rating, description, productId}
      this.props.createReview(obj)
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
    const productId = Number(this.props.location.state.productId)
    this.setState({newReview: {description, productId}})
  }

  render() {
    let name = this.props.currentUser.email
    const {firstName, lastName} = this.props.currentUser
    const {rating} = this.state
    if (firstName) name = firstName
    if (lastName && firstName) name = name + lastName.slice(0, 1).toUpperCase()
    let text
    if (this.state.isMistake && !rating && this.state.newReview.description)
      text = 'You have to give a star rating'
    else
      text =
        this.state.isMistake &&
        this.state.newReview.description === '' &&
        this.state.rating
          ? 'You have to write a review!'
          : 'You have to write a review and give a star rating!'

    if (this.props.location.state) {
      return (
        <div>
          <h1>{name}'s Review</h1>
          <div>
            {this.state.rating ? (
              <h2>Thank you for {rating} star review!</h2>
            ) : (
              <h3>Give a star review</h3>
            )}
            <StarRatingComponent
              name="rate1"
              starCount={5}
              value={rating}
              onStarClick={this.onStarClick}
            />
          </div>
          <br />
          <form onSubmit={this.saveNewReview}>
            <textarea
              type="text"
              rows="4"
              cols="50"
              name="review"
              placeholder="write a review"
              onChange={this.changeFormFields}
            />
            <br />
            <br />
            <input type="submit" className="btn btn-default" />
          </form>
          {this.state.isMistake ? <div>{text}</div> : ''}
        </div>
      )
    }
    return <h3>You need to go to your profile to write a review</h3>
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
