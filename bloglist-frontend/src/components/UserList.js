import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const UserList = ({ signedInUser, users }) => {
  if (signedInUser === null){
    return null
  }

  return users.map(u => (
    <div key={u.id}>
      <br/>
      <div 
        className="jumbotron shadow p-4 text-light bg-secondary rounded"        
      >
      <Link to={`/users/${u.id}`} style={{color: 'white'}}>{u.username}</Link> ~ has created {u.blogs.length} blogs
      </div>
    </div>    
  ))
}

UserList.propTypes = {
  users: PropTypes.array.isRequired
}

export default UserList