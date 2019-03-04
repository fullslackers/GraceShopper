import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSelectedProduct} from './../store/products'
import {Link} from 'react-router-dom'
import {addToCart} from './../store/cart'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.fetchSelectedProduct()
  }

  render() {
    const {isAdmin} = this.props

    return (
      <div className="single-product-view">
        <h1>{this.props.selectedProduct.title}</h1>
        <img src={this.props.selectedProduct.imageUrl} />
        <h3 className="description">
          {this.props.selectedProduct.description}
        </h3>

        <h4>${this.props.selectedProduct.price}</h4>
        {isAdmin ? (
          <div>
            <h5>
              Item #: {this.props.selectedProduct.id} / Inventory:
              {this.props.selectedProduct.inventory}
            </h5>
            <Link to={`/products/${this.props.selectedProduct.id}/edit`}>
              Edit Product
            </Link>
          </div>
        ) : (
          ''
        )}
        <button
          type="button"
          onClick={() =>
            this.props.addToCart({...this.props.selectedProduct, quantity: 1})
          }
        >
          Add to Cart
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSelectedProduct: () => {
      const productId = ownProps.match.params.productId
      dispatch(fetchSelectedProduct(productId))
    },
    addToCart: product => dispatch(addToCart(product))
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    selectedProduct: state.products.selectedProduct,
    isAdmin: state.currentUser.isAdmin
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
