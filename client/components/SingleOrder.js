import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSelectedOrder} from './../store/orders'
import {Link} from 'react-router-dom'
import {
  Header,
  Container,
  Accordion,
  Icon,
  Image,
  Card,
  Divider,
  Button
} from 'semantic-ui-react'

const styles = {
  cardGroup: {
    margin: '5em'
  },
  singleImage: {
    margin: '1em'
  }
}

class SingleOrder extends Component {
  state = {activeIndex: 0}

  handleClick = (e, titleProps) => {
    const {index} = titleProps
    const {activeIndex} = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({activeIndex: newIndex})
  }
  componentDidMount() {
    const orderId = this.props.location.pathname.split('/')[2]
    this.props.fetchSelectedOrder(orderId)
  }
  render() {
    const {activeIndex} = this.state
    const selectedOrder = this.props.selectedOrder
    const productsFromProductModel = selectedOrder.products
      ? selectedOrder.products
      : []
    const productsFromOrderModel = selectedOrder.copyProducts
    const products = productsFromOrderModel
      ? productsFromOrderModel
      : productsFromProductModel
    const orderDate = selectedOrder.orderDate
      ? selectedOrder.orderDate.slice(0, 10)
      : ''
    return (
      <Container>
        <Divider hidden />
        <Header as="h1">Order Detail</Header>
        <Divider hidden />
        <Accordion styled>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            Order Status
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <p>{selectedOrder.status}</p>
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            Order Number
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <p>{selectedOrder.orderNumber}</p>
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 2}
            index={2}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            Order Date
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <p>{orderDate}</p>
          </Accordion.Content>
        </Accordion>

        <Header as="h1">Items Ordered</Header>
        <h4>{selectedOrder.totalPrice}</h4>

        <Card.Group stackable centered style={styles.cardGroup}>
          {products.map(product => {
            return (
              <Card key={product.id} style={styles.singleImage}>
                <Link className="link" to={`/products/${product.id}`}>
                  <Image size="medium" src={product.imageUrl} />
                </Link>
                <Card.Content style={styles.text}>
                  <Link className="link" to={`/products/${product.id}`}>
                    <Card.Header style={styles.margin} as="h3">
                      {product.title}
                    </Card.Header>
                  </Link>
                  <Divider hidden />
                  <Card.Content extra>
                    <Card.Description style={styles.margin} as="h4">
                      ${product.price}
                    </Card.Description>
                    <Card.Description style={styles.margin} as="h4">
                      Quantity: {product.quantity ? product.quantity : 1}
                      Subtotal:{' '}
                      {product.quantity
                        ? (product.quantity * product.price).toFixed(2)
                        : product.price}
                    </Card.Description>
                  </Card.Content>

                  <Button type="button" style={styles.singleImage}>
                    <Link
                      to={{
                        pathname: '/products/reviews/new',
                        state: {
                          productId: `${product.id}`
                        }
                      }}
                    >
                      Write a review
                    </Link>
                  </Button>
                </Card.Content>
              </Card>
            )
          })}
        </Card.Group>
      </Container>
    )
  }
}

const mapState = state => {
  return {
    selectedOrder: state.orders.selectedOrder,
    currentUser: state.currentUser
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSelectedOrder: orderId => dispatch(fetchSelectedOrder(orderId))
  }
}

export default connect(mapState, mapDispatch)(SingleOrder)
