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

// const ProductsOnCurPage = (allProducts, curPage, itemsPerPage) => {
//   return allProducts.slice(
//     (curPage - 1) * itemsPerPage,
//     (curPage - 1) * itemsPerPage + itemsPerPage
//   )
// }

const styles = {
  cardGroup: {
    margin: '5em'
  },
  singleImage: {
    margin: '1em'
  },
  center: {
    justifyContent: 'center'
  }
}

export class HomePage extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedOption: null,
      isSelected: false,
      searchValue: '',
      activePage: 1
      // itemsCountPerPage: 10
    }
  }

  componentDidMount() {
    // if (this.props.location.state)
    //   this.props.location.state.resetCategory = false

    const filter = this.props.location.pathname.split('/')[2]
    if (filter) {
      this.setState({selectedOption: filter})
      this.setState({isSelected: true})
      this.props.filteredProducts(filter, this.state.activePage)
    } else {
      this.props.filteredProducts(undefined, this.state.activePage)
    }
  }

  componentDidUpdate(prevProps) {
    // if (this.props.location.state) {
    //   if (this.props.location.state.resetCategory) {
    //     this.props.location.state.resetCategory = false
    //     window.sessionStorage.setItem('selected', 'sort by category')
    //   }
    // }

    if (prevProps.location !== this.props.location) {
      const filter = this.props.location.pathname.split('/')[2]
      if (!filter) {
        this.props.filteredProducts(undefined, this.state.activePage)
      } else {
        this.props.filteredProducts(filter, this.state.activePage)
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
    if (
      this.state.selectedOption === null ||
      this.state.selectedOption === 'all products'
    ) {
      this.props.history.push(`/?page=${activePage}`)
    } else {
      this.props.history.push(
        `/categories/${this.state.selectedOption}?page=${activePage}`
      )
    }
  }

  selectCategory = text => {
    let selectedOption = text
    this.setState({selectedOption})
    this.setState({isSelected: true})
    this.setState({activePage: 1})
    if (selectedOption === 'all products') this.props.history.push('/')
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
    this.props.filteredProducts(
      this.state.selectedOption,
      this.state.activePage
    )
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

    // const ProductsCurPage = ProductsOnCurPage(
    //   this.props.products,
    //   this.state.activePage,
    //   this.state.itemsCountPerPage
    // )
    const filter = this.props.location.pathname.split('/')[2]
    const categoriesTitle = this.props.categories.map(
      category => category.title
    )

    // const total = Math.floor(
    //   this.props.products.length / this.state.itemsCountPerPage + 1
    // )

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
                    onClick={() => this.selectCategory('all products')}
                  />
                  {this.props.categories.map(category => (
                    <Dropdown.Item
                      key={category.id}
                      id={category.id}
                      text={category.title}
                      onClick={() => this.selectCategory(category.title)}
                    />
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              <form
                onChange={this.handleSearchChange}
                onSubmit={this.handleSearchSubmit}
              >
                {InputExampleFocus()}
                <Button type="submit" margin="5px">
                  Search it!
                </Button>
                <Button type="reset" onClick={this.handleSearchReset}>
                  Reset
                </Button>
              </form>

              <Card.Group stackable centered style={styles.cardGroup}>
                {this.props.products.map(product => (
                  <React.Fragment key={product.id}>
                    <ProductForHomePage
                      featured
                      product={product}
                      style={styles.singleImage}
                    />
                  </React.Fragment>
                ))}
              </Card.Group>

              <Pagination
                totalPages={71}
                activePage={this.state.activePage}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
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
    filteredProducts: (filterr, curPage) =>
      dispatch(fetchProducts(filterr, curPage)),
    searchProducts: searchValue => dispatch(setProducts(searchValue))
  }
}

export default connect(mapState, mapDispatch)(HomePage)
