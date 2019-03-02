import React from 'react'
import {connect} from 'react-redux'
import {ProductForHomePage} from './productForHomePage'
import {setProducts, fetchProducts} from '../store/products'
import Pagination from 'react-js-pagination'

const showProducts = (allProducts, curPage, itemsPerPage) => {
  return allProducts.slice(
    (curPage - 1) * itemsPerPage,
    (curPage - 1) * itemsPerPage + itemsPerPage
  )
}

export class HomePage extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedOption: null,
      isSelected: false,
      searchValue: '',
      activePage: 1,
      itemsCountPerPage: 3
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.handleSearchReset = this.handleSearchReset.bind(this)
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

  handlePageChange = pageNumber => {
    this.setState({activePage: pageNumber})
  }

  handleChange(event) {
    event.preventDefault()
    let selectedOption = event.target.value
    this.setState({selectedOption})
    this.setState({isSelected: true})
    if (selectedOption === 'sort by category') this.props.history.push('/')
    else this.props.history.push(`/categories/${selectedOption}`)
  }

  handleSearchChange(e) {
    e.preventDefault()
    this.setState({searchValue: e.target.value})
  }

  handleSearchSubmit(e) {
    if (this.state.searchValue === '') e.preventDefault()
    e.preventDefault()
    const filteredBySearch = this.props.products.filter(product =>
      product.title
        .toLowerCase()
        .includes(`${this.state.searchValue.toLowerCase()}`)
    )
    this.props.searchProducts(filteredBySearch)
    this.setState({searchValue: ''})
  }

  handleSearchReset(e) {
    e.preventDefault()
    this.props.filteredProducts(this.state.selectedOption)
  }

  render() {
    const shown = showProducts(
      this.props.products,
      this.state.activePage,
      this.state.itemsCountPerPage
    )
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
          <form
            onChange={this.handleSearchChange}
            onSubmit={this.handleSearchSubmit}
          >
            <label htmlFor="search">Search: </label>
            <input name="search" type="text" value={this.state.searchValue} />
            <button type="submit">Search it!</button>
            <button type="reset" onClick={this.handleSearchReset}>
              Reset
            </button>
          </form>
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.itemsCountPerPage}
            totalItemsCount={this.props.products.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
          <div className="product-container">
            {shown.map(product => {
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
    filteredProducts: filterr => dispatch(fetchProducts(filterr)),
    searchProducts: searchValue => dispatch(setProducts(searchValue))
  }
}

export default connect(mapState, mapDispatch)(HomePage)
