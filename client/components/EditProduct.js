import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSelectedProduct, updateProduct} from './../store/products'
import {Form, List, Button, Header, Container} from 'semantic-ui-react'

const styles = {
  margin: {
    margin: '2em'
  }
}

class EditProduct extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      description: '',
      imageUrl: '',
      price: 0,
      inventory: 0
    }
  }
  componentDidMount() {
    this.props.fetchSelectedProduct()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.selectedProduct !== this.props.selectedProduct) {
      this.setState(this.props.selectedProduct)
    }
  }

  saveEditedProduct = async event => {
    event.preventDefault()
    if (this.state.title && this.state.price) {
      const newProduct = {}
      Object.keys(this.state).forEach(key => {
        if (this.state[key]) newProduct[key] = this.state[key]
      })
      await this.props.updateProduct(this.props.selectedProduct.id, newProduct)
      this.props.history.push(`/products/${this.props.selectedProduct.id}`)
    }
  }

  changeFormFields = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    if (!this.props.isAdmin) {
      return <Header>You are not an admin</Header>
    }
    return (
      <Container>
        <Header style={styles.margin} as="h1">
          Edit: {this.state.title}
        </Header>
        <Form
          onSubmit={this.saveEditedProduct}
          onChange={this.changeFormFields}
        >
          <Form.Group>
            <Form.Field
              width="9"
              label="Title:"
              control="input"
              placeholder="title"
              name="title"
              value={this.state.title}
            />
          </Form.Group>
          <Form.Group>
            <Form.TextArea
              width="9"
              autoHeight
              label="Description:"
              placeholder="description..."
              name="description"
              value={this.state.description}
            />
          </Form.Group>

          <Form.Group>
            <Form.Field
              width="5"
              label="Image URL:"
              control="input"
              placeholder="http://www.pencils.com"
              name="imageUrl"
              value={this.state.imageUrl}
            />
            <Form.Field
              width="2"
              label="Price:"
              control="input"
              placeholder="5.00"
              name="price"
              value={this.state.price}
            />

            <Form.Field
              width="2"
              label="Inventory:"
              control="input"
              placeholder="100"
              name="inventory"
              value={this.state.inventory}
            />
          </Form.Group>

          <Button type="submit">Submit</Button>
        </Form>

        <List>
          {!this.state.title ? (
            <List.Item>Please enter a title.</List.Item>
          ) : (
            ''
          )}
          {!this.state.price ? (
            <List.Item>Please enter a price greater than zero.</List.Item>
          ) : (
            ''
          )}
        </List>
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchSelectedProduct: () => {
    const productId = ownProps.match.params.productId
    dispatch(fetchSelectedProduct(productId))
  },
  updateProduct: (id, updatedProduct) =>
    dispatch(updateProduct(id, updatedProduct))
})

const mapStateToProps = (state, ownProps) => {
  return {
    selectedProduct: state.products.selectedProduct,
    isAdmin: state.currentUser.isAdmin
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)
