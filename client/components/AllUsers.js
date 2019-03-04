import React from 'react'
import {Link} from 'react-router-dom'

export const AllUsers = props => {
  const users = props.users
  const type = isAdmin => {
    if (isAdmin) return 'Admin'
    return 'Customer'
  }
  return (
    <table>
      <tbody>
        <tr>
          <th>id</th>
          {/* <th>Name</th> */}
          <th>Email</th>
          <th>Type</th>
          <th>Registered</th>
        </tr>
        {users.map(user => {
          return (
            <tr key={user.id}>
              <td>{user.id}</td>
              {/* <td>{user.firstName} {user.lastName}</td> */}
              <td>{user.email}</td>
              <td>{type(user.isAdmin)}</td>
              <td>{user.createdAt.slice(0, 10)}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
