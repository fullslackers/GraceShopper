import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSelectedOrder} from './../store/orders'
import {Link} from 'react-router-dom'

class SingleOrder extends Component {
  componentDidMount() {
    const orderId = this.props.location.pathname.split('/')[2]
    this.props.fetchSelectedOrder(orderId)
  }
  render() {
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
    console.log(orderDate)
    return (
      <div>
        <h3>Order Detail</h3>
        <h5>order number: {selectedOrder.id}</h5>
        <h5>order date: {orderDate}</h5>
        <h5>order status: {selectedOrder.status}</h5>
        <table>
          <tbody>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Write a review</th>
            </tr>
            {products.map(product => {
              return (
                <tr key={product.id}>
                  <td>
                    <Link className="link" to={`/products/${product.id}`}>
                      <img src={product.imageUrl} />
                      <span>{product.title}</span>
                    </Link>
                  </td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <form
                      action={`/products/${product.id}/reviews/${
                        this.props.currentUser.id
                      }/new`}
                      method="get"
                    >
                      <input
                        type="submit"
                        value="write a review"
                        name="Submit"
                        id="frm1_submit"
                      />
                    </form>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
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
