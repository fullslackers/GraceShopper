import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSelectedProduct} from './../store/products'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.fetchSelectedProduct()
  }
  render() {
    return (
      <ul>
        {this.props.selectedProduct.map(product => {
          return (
            <li key={product.id}>
              {product.title} {product.description} {product.imageUrl}{' '}
              {product.price} {product.inventory}
            </li>
          )
        })}
      </ul>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    selectedProduct: state.products.selectedProduct
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
