import React from 'react'
import {connect} from 'react-redux'
import {ProductForHomePage} from './productForHomePage'
import {setProducts, fetchProducts} from '../store/products'
import Pagination from 'react-js-pagination'

const ProductsOnCurPage = (allProducts, curPage, itemsPerPage) => {
  return allProducts.slice(
    (curPage - 1) * itemsPerPage,
    (curPage - 1) * itemsPerPage + itemsPerPage
  )
}

export class HomePage extends React.Component {
  constructor() {
    super()
    this.state = {
      selected: 'sort by category',
      selectedOption: null,
      isSelected: false,
      searchValue: '',
      activePage: 1,
      itemsCountPerPage: 1
    }
  }

  componentDidMount() {
    if (this.props.location.state)
      this.props.location.state.resetCategory = false
    let selected = window.sessionStorage.getItem('selected')
    this.setState({selected})
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
    if (this.props.location.state) {
      if (this.props.location.state.resetCategory) {
        this.setState({selected: 'sort by category'})
        this.props.location.state.resetCategory = false
        window.sessionStorage.setItem('selected', 'sort by category')
      }
    }

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

  selectCategory = event => {
    event.preventDefault()
    this.setState({selected: event.target.value})
    window.sessionStorage.setItem('selected', event.target.value)
    let selectedOption = event.target.value
    this.setState({selectedOption})
    this.setState({isSelected: true})
    if (selectedOption === 'sort by category') this.props.history.push('/')
    else this.props.history.push(`/categories/${selectedOption}`)
  }

  handleSearchChange = e => {
    e.preventDefault()
    this.setState({searchValue: e.target.value})
  }

  handleSearchSubmit = e => {
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

  handleSearchReset = e => {
    e.preventDefault()
    this.props.filteredProducts(this.state.selectedOption)
  }

  render() {
    const ProductsCurPage = ProductsOnCurPage(
      this.props.products,
      this.state.activePage,
      this.state.itemsCountPerPage
    )
    const filter = this.props.location.pathname.split('/')[2]
    const categoriesTitle = this.props.categories.map(
      category => category.title
    )
    if (!categoriesTitle.includes(filter) && filter) {
      return <div />
    } else {
      return (
        <div>
          <select onChange={this.selectCategory} value={this.state.selected}>
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
          <div className="product-container">
            {ProductsCurPage.map(product => {
              return <ProductForHomePage key={product.id} product={product} />
            })}
          </div>
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.itemsCountPerPage}
            totalItemsCount={this.props.products.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
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
