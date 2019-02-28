import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSelectedProduct, updateProduct} from './../store/products'

class EditProduct extends Component {
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
  componentDidMount() {
    this.props.fetchSelectedProduct()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.selectedProduct !== this.props.selectedProduct) {
      this.setState(this.props.selectedProduct)
    }
  }

  saveEditedProduct = async event => {
    event.preventDefault()
    if (this.state.title && this.state.price) {
      const newProduct = {}
      Object.keys(this.state).forEach(key => {
        if (this.state[key]) newProduct[key] = this.state[key]
      })
      await this.props.updateProduct(this.props.selectedProduct.id, newProduct)
      this.props.history.push(`/products/${this.props.selectedProduct.id}`)
    }
  }

  changeFormFields = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    if (!this.props.isAdmin) {
      return <div>You are not an admin</div>
    }
    return (
      <div>
        <h1>Edit Product</h1>
        <form
          onSubmit={this.saveEditedProduct}
          onChange={this.changeFormFields}
        >
          <label htmlFor="title">Title: </label>
          <input name="title" type="text" value={this.state.title} />

          <label htmlFor="description">Description: </label>
          <input
            name="description"
            type="text"
            value={this.state.description}
          />

          <label htmlFor="imageUrl">Image URL: </label>
          <input name="imageUrl" type="text" value={this.state.imageUrl} />

          <label htmlFor="price">Price: </label>
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={this.state.price}
          />

          <label htmlFor="inventory">Inventory: </label>
          <input name="inventory" type="number" value={this.state.inventory} />

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

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchSelectedProduct: () => {
    const productId = ownProps.match.params.productId
    dispatch(fetchSelectedProduct(productId))
  },
  updateProduct: (id, updatedProduct) =>
    dispatch(updateProduct(id, updatedProduct))
})

const mapStateToProps = (state, ownProps) => {
  return {
    selectedProduct: state.products.selectedProduct,
    isAdmin: state.currentUser.isAdmin
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)
