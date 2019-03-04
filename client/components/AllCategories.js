import React from 'react'
import {Link} from 'react-router-dom'

export const AllCategories = props => {
  const categories = props.categories
  return (
    <table>
      <tbody>
        <tr>
          <th>id</th>
          <th>title</th>
        </tr>
        {categories.map(category => {
          return (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.title}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
