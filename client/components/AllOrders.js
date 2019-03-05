import React from 'react'
import {Table, Button, Divider} from 'semantic-ui-react'
import {withRouter} from 'react-router'

const AllOrders = props => {
  const orders = props.orders
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>id</Table.HeaderCell>
          <Table.HeaderCell>Order Number</Table.HeaderCell>
          <Table.HeaderCell>Order Date</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>View Order</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {orders.map(order => {
          return (
            <Table.Row key={order.id}>
              <Table.Cell>{order.id}</Table.Cell>
              <Table.Cell>{order.orderNumber}</Table.Cell>
              <Table.Cell>{order.orderDate.slice(0, 10)}</Table.Cell>
              <Table.Cell>{order.status}</Table.Cell>
              <Table.Cell>
                <Button
                  id={order.id}
                  onClick={(event, name) =>
                    props.history.push(`/orders/${name.id}`)
                  }
                >
                  view order
                </Button>
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}

export default withRouter(AllOrders)
