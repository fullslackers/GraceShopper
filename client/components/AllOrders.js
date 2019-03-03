import React from 'react'
import {Link} from 'react-router-dom'

export const AllOrders = props => {
  const orders = props.orders
  return (
    <table>
      <tbody>
        <tr>
          <th>Order Number</th>
          <th>Order Date</th>
          <th>Status</th>
        </tr>
        {orders.map(order => {
          return (
            <tr key={order.id}>
              <td>
                <Link className="link" to={`/orders/${order.id}`}>
                  {order.orderNumber}
                </Link>
              </td>
              <td>{order.orderDate.slice(0, 10)}</td>
              <td>{order.status}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
