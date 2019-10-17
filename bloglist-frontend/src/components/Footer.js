import React from 'react'

const Footer = () => {
  const footerStyle = {
    color: 'gray',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle} className="container">
      <br />
      <em>Blog app, Sonja Laurila, University of Helsinki 2019</em>
    </div>
  )
}

export default Footer