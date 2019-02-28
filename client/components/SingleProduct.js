import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSelectedProduct} from './../store/products'
import {Link} from 'react-router-dom'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.fetchSelectedProduct()
  }
  render() {
    console.log(this.props.user)
    return (
      <div className="single-product-view">
        <h1>{this.props.selectedProduct.title}</h1>
        <img src={this.props.selectedProduct.imageUrl} />
        <h3 className="description">
          {this.props.selectedProduct.description}
        </h3>

        <h4>${this.props.selectedProduct.price}</h4>
        <h5>
          Item #: {this.props.selectedProduct.id} / Inventory:
          {this.props.selectedProduct.inventory}
        </h5>
        <Link to={`/products/${this.props.selectedProduct.id}/edit`}>
          Edit Product
        </Link>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSelectedProduct: () => {
      const productId = ownProps.match.params.productId
      dispatch(fetchSelectedProduct(productId))
    }
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    selectedProduct: state.products.selectedProduct
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
