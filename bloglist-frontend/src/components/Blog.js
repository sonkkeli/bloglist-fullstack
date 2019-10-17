import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, deleteBlog }) => {

  const isBlogAddedByMe = () => {
    var username = JSON.parse(window.localStorage.getItem('loggedBlogsUser')).username
    if(blog.user.username === username){
      return true
    }
    return false
  }

  return (
    <div className="container jumbotron shadow p-4 text-light bg-secondary rounded" data-testid="blog-item" id="blog-item">
      <p className="d-flex justify-content-between">
        <Link to={`/blogs/${blog.id}`} style={{color: 'white'}}>{blog.title} by {blog.author}</Link>
        {isBlogAddedByMe ? <button className="btn btn-info" onClick={deleteBlog} value={blog.id}>delete</button> : null}
      </p>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog