import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSelectedProduct} from './../store/products'
import {Link} from 'react-router-dom'
import {addToCart} from './../store/cart'
import {fetchReviews} from './../store/reviews'
import {
  Divider,
  Popup,
  Grid,
  Button,
  Item,
  Image,
  Container,
  Comment,
  Header
} from 'semantic-ui-react'
const reviewsForProduct = (allReviews, productId) => {
  return allReviews.filter(review => review.productId === productId)
}
class SingleProduct extends Component {
  componentDidMount() {
    this.props.fetchReviews()
    this.props.fetchSelectedProduct()
  }
  render() {
    const {isAdmin} = this.props
    const allReviews = this.props.allReviews
    const productId = Number(this.props.location.pathname.split('/')[2])
    const curReviews = reviewsForProduct(allReviews, productId)
    return (
      <div>
        <Container>
          <Grid container>
            <Grid.Row>
              <Grid stackable centered>
                <Grid container columns={2}>
                  <Grid.Column>
                    <Item>
                      <Image
                        size="large"
                        src={this.props.selectedProduct.imageUrl}
                      />
                    </Item>
                  </Grid.Column>
                  <Grid.Column>
                    <Item>
                      <Item.Content>
                        <Item.Header
                          as="h1"
                          content={this.props.selectedProduct.title}
                        />
                        <h4>${this.props.selectedProduct.price}</h4>
                        {isAdmin ? (
                          <div>
                            <Item.Description>
                              Item #{this.props.selectedProduct.id}
                            </Item.Description>
                            <Item.Description>
                              Inventory: {this.props.selectedProduct.inventory}
                            </Item.Description>
                          </div>
                        ) : (
                          ''
                        )}
                        <Divider hidden />
                        <Item.Description>
                          {this.props.selectedProduct.description}
                          <Divider hidden />
                        </Item.Description>
                        <Popup
                          trigger={
                            <Button
                              color="black"
                              onClick={() =>
                                this.props.addToCart({
                                  ...this.props.selectedProduct,
                                  quantity: 1
                                })
                              }
                            >
                              Add to Cart
                            </Button>
                          }
                          content="Added to Cart!"
                          on="click"
                        />
                        <Divider hidden />
                        {isAdmin ? (
                          <div>
                            <Button>
                              <Link
                                to={`/products/${
                                  this.props.selectedProduct.id
                                }/edit`}
                              >
                                Edit Product
                              </Link>
                            </Button>
                          </div>
                        ) : (
                          ''
                        )}
                      </Item.Content>
                    </Item>
                  </Grid.Column>
                </Grid>
              </Grid>
            </Grid.Row>
          </Grid>
        </Container>
        <Divider hidden />
        <Container margin="1em">
          <Comment.Group>
            <Header as="h3" dividing>
              Reviews
            </Header>
            {curReviews.map(review => {
              return (
                <Comment key={review.id}>
                  <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
                  <Comment.Content>
                    {/* <Comment.Author as='a'>Matt</Comment.Author> */}
                    <Comment.Metadata>
                      <div>{review.createdAt.slice(0, 10)}</div>
                    </Comment.Metadata>
                    <Comment.Text>{review.description}</Comment.Text>
                  </Comment.Content>
                  <Divider hidden />
                </Comment>
              )
            })}
          </Comment.Group>
          <Divider hidden />
        </Container>
        <Divider hidden />
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSelectedProduct: () => {
      const productId = ownProps.match.params.productId
      dispatch(fetchSelectedProduct(productId))
    },
    fetchReviews: () => {
      dispatch(fetchReviews())
    },
    addToCart: product => dispatch(addToCart(product))
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    selectedProduct: state.products.selectedProduct,
    isAdmin: state.currentUser.isAdmin,
    allReviews: state.reviews.allReviews
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
