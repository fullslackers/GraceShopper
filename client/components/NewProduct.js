import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createProduct} from './../store/products'
import {Form, List, Button, Header, Container} from 'semantic-ui-react'

const styles = {
  margin: {
    margin: '2em'
  }
}

class NewProduct extends Component {
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

  saveNewProduct = event => {
    event.preventDefault()
    if (this.state.title && this.state.price) {
      const newProduct = {}
      Object.keys(this.state).forEach(key => {
        if (this.state[key]) newProduct[key] = this.state[key]
      })
      this.props.createProduct(newProduct)
      this.props.history.push('/')
    }
  }

  changeFormFields = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    if (!this.props.isAdmin) {
      return (
        <Header as="h1" style={styles.margin}>
          You are not an admin
        </Header>
      )
    }
    return (
      <Container>
        <Header style={styles.margin} as="h1">
          Create New Product
        </Header>
        <Form onSubmit={this.saveNewProduct} onChange={this.changeFormFields}>
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

const mapState = state => {
  return {
    isAdmin: state.currentUser.isAdmin
  }
}

const mapDispatchToProps = dispatch => ({
  createProduct: product => dispatch(createProduct(product))
})

export default connect(mapState, mapDispatchToProps)(NewProduct)
