import React from 'react'
import {Table} from 'semantic-ui-react'

export const AllCategories = props => {
  const categories = props.categories

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>id</Table.HeaderCell>
          <Table.HeaderCell>title</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {categories.map(category => {
          return (
            <Table.Row key={category.id}>
              <Table.Cell>{category.id}</Table.Cell>
              <Table.Cell>{category.title}</Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}
