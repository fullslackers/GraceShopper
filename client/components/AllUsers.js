import React from 'react'
import {Table, Pagination, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {fetchUsers, removeUserFromDB, updateUserInDB} from '../store/allusers'
// import {removeUserFromDB} from '../store/SingleUser'
// import {updateUserInDB} from '../store/SingleUser'

export class AllUsers extends React.Component {
  constructor() {
    super()
    this.state = {
      activePage: 1,
      isSelected: false
    }
  }

  componentDidMount() {
    this.props.fetchAllUsers()
  }

  componentDidUpdate() {
    if (this.state.isSelected) {
      this.setState({isSelected: false})
      this.props.fetchAllUsers(this.state.activePage)
    }
  }

  deleteUser = (event, id) => {
    this.props.removeUser(id)
    this.setState({isSelected: false})
  }

  changeAdminStatus = (event, id, userStatus) => {
    const obj = {
      isAdmin: !userStatus
    }
    this.props.editUser(obj, id)
    this.setState({isSelected: false})
  }

  handlePaginationChange = (e, {activePage}) => {
    this.setState({activePage})
    this.props.fetchAllUsers(activePage)
  }

  render() {
    const {activePage} = this.state
    const {currentUser} = this.props
    const users = this.props.allUsers
    const type = isAdmin => {
      if (isAdmin) return 'Admin'
      return 'Customer'
    }

    return (
      <div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>id</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Change Admin Status</Table.HeaderCell>
              <Table.HeaderCell>Registered</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.map(user => {
              return (
                <Table.Row key={user.id}>
                  <Table.Cell>{user.id}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{type(user.isAdmin)}</Table.Cell>
                  <Table.Cell>
                    {currentUser.id === user.id ? (
                      ''
                    ) : (
                      <Button
                        id={user.id}
                        userStatus={user.isAdmin}
                        onClick={(event, name) =>
                          this.changeAdminStatus(
                            event,
                            name.id,
                            name.userStatus
                          )
                        }
                      >
                        change
                      </Button>
                    )}
                  </Table.Cell>
                  <Table.Cell>{user.createdAt.slice(0, 10)}</Table.Cell>
                  <Table.Cell>
                    {currentUser.id === user.id ? (
                      ''
                    ) : (
                      <Button
                        id={user.id}
                        onClick={(event, name) =>
                          this.deleteUser(event, name.id)
                        }
                      >
                        delete
                      </Button>
                    )}
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
        <Pagination
          totalPages={10}
          activePage={activePage}
          onPageChange={this.handlePaginationChange}
        />
      </div>
    )
  }
}

const mapState = state => {
  return {
    isAdmin: state.currentUser.isAdmin,
    allUsers: state.users,
    currentUser: state.currentUser
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllUsers: curPage => dispatch(fetchUsers(curPage)),
    removeUser: userId => dispatch(removeUserFromDB(userId)),
    editUser: (obj, id) => dispatch(updateUserInDB(obj, id))
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
