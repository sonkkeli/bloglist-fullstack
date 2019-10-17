import React from 'react'
import PropTypes from 'prop-types'

const User = ({ signedInUser, user }) => {
  if ( user === undefined) { 
    return <p>Loading</p>
  }

  if (signedInUser === null){
    return null
  }

  return (
    <div key={user.id} className="container">
      <br/>
      <h2>{user.username} aka {user.name}</h2>
      <br/>
      <h3>Added blogs:</h3>
      {user.blogs.map(b => (
        <p key={b.id}>- {b.title}</p>
      ))}
    </div>
  )
}

User.propTypes = {
  user: PropTypes.object
}

export default User