import React from 'react'
import {connect} from 'react-redux'
import {ProductForHomePage} from './productForHomePage'

export class HomePage extends React.Component {
  // constructor () {
  //   super()
  // }

  render() {
    return (
      <div>
        <h1>All Products</h1>
        {this.state.filteredProducts.map(product => {
          return <ProductForHomePage key={product.id} product={product} />
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products.allProducts
  }
}

export default connect(mapState)(HomePage)
