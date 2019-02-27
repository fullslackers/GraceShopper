import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createProduct} from './../store/products'

class NewProduct extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      description: '',
      imageUrl: '',
      price: 0,
      inventory: 0
    }
  }

  submitHandler = event => {
    event.preventDefault()
    if (this.state.title && this.state.price) {
      const newProduct = {}
      Object.keys(this.state).forEach(key => {
        if (this.state[key]) newProduct[key] = this.state[key]
      })
      this.props.createProduct(newProduct)
      this.props.history.push('/')
    }
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <h1>Create New Product</h1>
        <form onSubmit={this.submitHandler}>
          <label htmlFor="title">Title: </label>
          <input
            name="title"
            type="text"
            value={this.state.title}
            onChange={this.changeHandler}
          />

          <label htmlFor="description">Description: </label>
          <input
            name="description"
            type="text"
            value={this.state.description}
            onChange={this.changeHandler}
          />

          <label htmlFor="imageUrl">Image URL: </label>
          <input
            name="imageUrl"
            type="text"
            value={this.state.imageUrl}
            onChange={this.changeHandler}
          />

          <label htmlFor="price">Price: </label>
          <input
            name="price"
            type="number"
            value={this.state.price}
            onChange={this.changeHandler}
          />

          <label htmlFor="inventory">Inventory: </label>
          <input
            name="inventory"
            type="number"
            value={this.state.inventory}
            onChange={this.changeHandler}
          />

          <button type="submit">Submit</button>
        </form>

        {!this.state.title ? <div>Please enter a title.</div> : ''}
        {!this.state.price ? (
          <div>Please enter a price greater than zero.</div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createProduct: product => dispatch(createProduct(product))
})

export default connect(null, mapDispatchToProps)(NewProduct)
