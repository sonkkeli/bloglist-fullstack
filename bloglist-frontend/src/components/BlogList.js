import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, addLike, deleteBlog }) => {
  return blogs.sort((a,b) => b.likes - a.likes).map(b => (
    <Blog key={b.id} blog={b} addLike={addLike} deleteBlog={deleteBlog} />
  ))
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default BlogList