import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div>
      <br/>
      <div className="container jumbotron shadow p-3 mb-5 text-light bg-secondary rounded">
        {message}
      </div>
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string
}

export default Notification