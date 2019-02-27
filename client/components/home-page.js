import React from 'react'
import {connect} from 'react-redux'
import {ProductForHomePage} from './productForHomePage'

const filter = (products, selectedOption) => {
  if (selectedOption === 'sort by category') return products
  let allProducts = products.filter(product => {
    if (product.categories.length > 0) {
      return product.categories[0].title === selectedOption
    }
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
      : filter(this.props.products, this.state.selectedOption)
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
