import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSelectedProduct} from './../store/products'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.fetchSelectedProduct()
  }
  render() {
    return (
      <div>
        {this.props.selectedProduct.id}
        {this.props.selectedProduct.title}
        {this.props.selectedProduct.description}
        {this.props.selectedProduct.imageUrl}
        {this.props.selectedProduct.price}
        {this.props.selectedProduct.inventory}
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
