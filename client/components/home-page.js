import React from 'react'
import {connect} from 'react-redux'
import {ProductForHomePage} from './productForHomePage'

export class HomePage extends React.Component {
  // constructor () {
  //   super()
  // }

  render() {
    console.log('QQQQQQQQQQQ', this.props)
    return (
      <div>
        <h1>All Products</h1>
        {this.props.products.map(product => {
          return <ProductForHomePage key={product.id} product={product} />
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.allProducts
  }
}

export default connect(mapState)(HomePage)
