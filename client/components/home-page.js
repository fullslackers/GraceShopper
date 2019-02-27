import React from 'react'
import {connect} from 'react-redux'
import {ProductForHomePage} from './productForHomePage'

const filter = (products, selectedOption) => {
  let allProducts = [...products]
  return allProducts.filter(product => {
    return product.categories.title === selectedOption
  })
}

const filter2 = (products, selectedOption) => {
  let allProducts = products.filter(product => {
    console.log('QQQQQQ', product)
    return product.categories[0].title === selectedOption
  })

  return allProducts
}

export class HomePage extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedOption: null
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const selectedOption = event.target.value
    this.setState({selectedOption})
  }

  render() {
    const products = !this.state.selectedOption
      ? this.props.products
      : filter2(this.props.products, this.state.selectedOption)
    console.log('PRODUCTS', products)
    console.log('SELECTED OPTION', this.state.selectedOption)
    return (
      <div>
        <select onChange={this.handleChange}>
          <option>sort by category</option>
          {this.props.categories.map(category => (
            <option key={category.id}>{category.title}</option>
          ))}
        </select>
        <div className="product-container">
          {products.map(product => {
            return <ProductForHomePage key={product.id} product={product} />
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products.allProducts,
    categories: state.categories
  }
}

export default connect(mapState)(HomePage)
