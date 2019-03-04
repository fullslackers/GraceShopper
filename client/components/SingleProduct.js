import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSelectedProduct} from './../store/products'
import {Link} from 'react-router-dom'
import {addToCart} from './../store/cart'
import {
  Divider,
  Popup,
  Grid,
  Button,
  Item,
  Image,
  Container
} from 'semantic-ui-react'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.fetchSelectedProduct()
  }

  render() {
    const {isAdmin} = this.props

    return (
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
                            color="blue"
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

                      {/* // <button
                      //   type="button"
                      //   onClick={() =>
                      //     this.props.addToCart({
                      //       ...this.props.selectedProduct,
                      //       quantity: 1
                      //     })
                      //   }
                      // >
                      //   Add to Cart
                      // </button> */}
                    </Item.Content>
                  </Item>
                </Grid.Column>
              </Grid>
            </Grid>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSelectedProduct: () => {
      const productId = ownProps.match.params.productId
      dispatch(fetchSelectedProduct(productId))
    },
    addToCart: product => dispatch(addToCart(product))
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    selectedProduct: state.products.selectedProduct,
    isAdmin: state.currentUser.isAdmin
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
