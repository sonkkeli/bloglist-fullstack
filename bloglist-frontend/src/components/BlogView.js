import React from 'react'
import PropTypes from 'prop-types'

const BlogView = ({ signedInUser, blog, addLike, addComment, newComment, handleCommentChange }) => {
  if ( blog === undefined) { 
    return <p>Loading</p>
  }

  if (signedInUser === null){
    return null
  }

  return (
    <div key={blog.id} className="container">
      <br/>
      <h2>{blog.title} by <span style={{fontStyle: 'italic'}}>{blog.author}</span></h2>
      <br/>
      <a href={blog.url}>{blog.url}</a>
      <br/><br/>
      <p>
        {blog.likes} likes 
        <button className="ml-3 btn btn-dark" id="likebtn" data-testid="likebtn" onClick={addLike} value={JSON.stringify(blog)}>
          {'<3 like'}
        </button>
      </p>
      <p>added by {blog.user.name}</p>
      <h2>comments</h2>
      <form onSubmit={event => addComment(event, blog.id)}>
        <div className="input-group mb-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Drop a comment"
            value={newComment}
            onChange={handleCommentChange}
            id="commentinput"
          />
          <div className="input-group-append">
            <button id="addbutton" className="btn btn-outline-secondary" type="submit">Add</button>
          </div>
        </div>        
      </form>
      {blog.comments.map(b => (
        <p key={b.id}># {b.content}</p>
      ))}
    </div>
  )
}

BlogView.propTypes = {
  blog: PropTypes.object
}

export default BlogView