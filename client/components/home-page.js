import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {ProductForHomePage} from './productForHomePage'
import {setProducts, fetchProducts} from '../store/products'
// import Pagination from 'react-js-pagination'
import {
  Card,
  Button,
  Container,
  Divider,
  Input,
  Dropdown,
  Pagination
} from 'semantic-ui-react'

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

  handlePageChange = (e, {activePage}) => {
    this.setState({activePage})
  }

  handleChange(text) {
    let selectedOption = text
    this.setState({selectedOption})
    this.setState({isSelected: true})
    if (selectedOption == 'all products') this.props.history.push('/')
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
    const InputExampleFocus = () => (
      <Input
        focus
        placeholder="Search..."
        name="search"
        type="text"
        value={this.state.searchValue}
      />
    )

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
      return (
        <Fragment>
          <div>Not found...</div>
        </Fragment>
      )
    } else {
      return (
        <Container>
          <Fragment>
            <Divider hidden />
            <div>
              <Dropdown text="Find by Category">
                <Dropdown.Menu>
                  <Dropdown.Item
                    text="all products"
                    onClick={() => this.handleChange('all products')}
                  />
                  {this.props.categories.map(category => (
                    <Dropdown.Item
                      key={category.id}
                      id={category.id}
                      text={category.title}
                      onClick={() => this.handleChange(category.title)}
                    />
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              <form
                onChange={this.handleSearchChange}
                onSubmit={this.handleSearchSubmit}
              >
                {InputExampleFocus()}
                <Button type="submit">Search it!</Button>
                <Button type="reset" onClick={this.handleSearchReset}>
                  Reset
                </Button>
              </form>

              <Card.Group stackable centered>
                {ProductsCurPage.map(product => (
                  <React.Fragment key={product.id}>
                    <ProductForHomePage featured product={product} />
                  </React.Fragment>
                ))}
              </Card.Group>

              <Pagination
                defaultActivePage={1}
                totalPages={5}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                // itemsCountPerPage={this.state.itemsCountPerPage}
                // totalItemsCount={this.props.products.length}
                // pageRangeDisplayed={5}
                onPageChange={this.handlePageChange}
              />
            </div>
          </Fragment>
        </Container>
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
