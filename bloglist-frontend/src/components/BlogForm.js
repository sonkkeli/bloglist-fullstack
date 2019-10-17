import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  addBlog,
  newTitle,
  handleTitleChange,
  newAuthor,
  handleAuthorChange,
  newURL,
  handleURLChange,
  createNewVisibility,
  setCreateNewVisibility
}) => {

  const hideWhenVisible = { display: createNewVisibility ? 'none' : '' }
  const showWhenVisible = { display: createNewVisibility ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button className="btn btn-dark" onClick={() => setCreateNewVisibility(true)}>create new</button>
      </div>
      <div style={showWhenVisible}>
        <h2>Create new</h2>
        <form  onSubmit={addBlog}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">Title</span>
            </div>
            <input className="form-control"
              value={newTitle}
              onChange={handleTitleChange}
              id="title"
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">Author</span>
            </div>
            <input className="form-control"
              value={newAuthor}
              onChange={handleAuthorChange}
              id="author"
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">URL</span>
            </div>
            <input className="form-control"
              value={newURL}
              onChange={handleURLChange}
              id="url"
            />
          </div>
          <button type="submit" className="btn btn-dark" id="createsubmit">create</button>
          <button className="ml-2 btn btn-dark" onClick={(e) => {
            e.preventDefault()
            setCreateNewVisibility(false)
          }}>
          cancel
          </button>
        </form>
      </div>
    </div>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  newTitle: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  newAuthor: PropTypes.string.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  newURL: PropTypes.string.isRequired,
  handleURLChange: PropTypes.func.isRequired,
  createNewVisibility: PropTypes.bool.isRequired,
  setCreateNewVisibility: PropTypes.func.isRequired,
}

export default BlogForm