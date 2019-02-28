import React from 'react'
import {connect} from 'react-redux'
import {ProductForHomePage} from './productForHomePage'
import {fetchProducts} from '../store/products'

export class HomePage extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedOption: null,
      isSelected: false
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const filter = this.props.location.pathname.split('/')[2]
    if (filter) {
      this.setState({selectedOption: filter})
      this.setState({isSelected: true})
      this.props.filteredProducts(filter)
    } else {
      this.props.filteredProducts()
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      const filter = this.props.location.pathname.split('/')[2]
      if (!filter) {
        this.props.filteredProducts()
      } else {
        this.props.filteredProducts(filter)
      }
    }
    if (this.state.isSelected) {
      this.props.filteredProducts(this.state.selectedOption)
      this.setState({
        isSelected: false
      })
    }
  }

  handleChange(event) {
    event.preventDefault()
    let selectedOption = event.target.value
    this.setState({selectedOption})
    this.setState({isSelected: true})
    if (selectedOption === 'sort by category') this.props.history.push('/')
    else this.props.history.push(`/categories/${selectedOption}`)
  }

  render() {
    const filter = this.props.location.pathname.split('/')[2]
    const categoriesTitle = this.props.categories.map(
      category => category.title
    )
    if (!categoriesTitle.includes(filter) && filter) {
      return <div>not found</div>
    } else {
      return (
        <div>
          <select onChange={this.handleChange}>
            <option>sort by category</option>
            {this.props.categories.map(category => (
              <option key={category.id}>{category.title}</option>
            ))}
          </select>
          <div className="product-container">
            {this.props.products.map(product => {
              return <ProductForHomePage key={product.id} product={product} />
            })}
          </div>
        </div>
      )
    }
  }
}
const mapState = state => {
  return {
    products: state.products.allProducts,
    categories: state.categories
  }
}

const mapDispatch = dispatch => {
  return {
    filteredProducts: filterr => dispatch(fetchProducts(filterr))
  }
}

export default connect(mapState, mapDispatch)(HomePage)
