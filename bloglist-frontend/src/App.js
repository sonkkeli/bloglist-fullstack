import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import './App.css'
import loginService from './services/login'
import blogService from './services/blogs'
import userService from './services/users'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import UserView from './components/UserView'
import BlogView from './components/BlogView'
import Footer from './components/Footer'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')
  const [newComment, setNewComment] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [loadedUsers, setLoadedUsers] = useState(false)
  const [createNewVisibility, setCreateNewVisibility] = useState(false)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
      .then(setLoaded(true))
  }, [])

  useEffect(() => {
    userService
      .getAll()
      .then(u => setUsers(u))
      .then(setLoadedUsers(true))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    var username = event.target.Username.value
    var password = event.target.Password.value
    
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogsUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      createNotification(`Welcome ${user.name}`)
    } catch (exception) {
      createNotification('Incorrect username or password')
    }
  }

  const handleTitleChange = (event) => setNewTitle(event.target.value)

  const handleAuthorChange = (event) => setNewAuthor(event.target.value)

  const handleURLChange = (event) => setNewURL(event.target.value)

  const handleCommentChange = (event) => setNewComment(event.target.value)

  const createNotification = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const updateBlogs = () => {
    blogService
      .getAll()
      .then(updatedBlogs => setBlogs(updatedBlogs))
      .then(window.location.href = window.location.href)
      .catch(error => {
        createNotification('Updating blogs failed, try again')
        console.log(error)
      })
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newURL
    }

    blogService
      .create(blogObject)
      .then(() => {
        updateBlogs()
        setNewTitle('')
        setNewAuthor('')
        setNewURL('')
        createNotification('Blog creation was successful')
      })
      .catch(error => {
        createNotification('Blog creation failed, try again')
        console.log(error)
      })
  }

  const addLike = (event) => {
    event.preventDefault()
    var save = JSON.parse(event.target.value)
    var blogObject = {
      title:save.title,
      author: save.author,
      url: save.url,
      likes: save.likes + 1,
      user: save.user.id
    }

    blogService
      .update(save.id, blogObject)
      .then(updateBlogs())
      .catch(error => {
        createNotification('Like addition failed, try again')
        console.log(error)
      })
  }

  const addComment = (event, blogId) => {
    event.preventDefault()
    var commentObject = {
      content: newComment
    }

    blogService
      .createComment(blogId, commentObject)
      .then(updateBlogs())
      .catch(error => {
        createNotification('Comment addition failed, try again')
        console.log(error)
      })
  }

  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem('loggedBlogsUser')
    window.location.reload()
  }

  const deleteBlog = (e) => {
    e.preventDefault()

    if (window.confirm('Are you sure you want to delete this blog?')){
      var id = e.target.value
      try {
        blogService.remove(id)
        createNotification('Removal successful')
        setBlogs(blogs.filter(b => b.id !== id))
      } catch (error){
        createNotification('Removal failed')
      }
    }
  }

  const userById = (id) => users.find(a => a.id === id)
  const blogById = (id) => blogs.find(a => a.id === id)

  const Navbar = () => {
    return (
      <nav className="navbar navbar-dark bg-dark d-flex">
        <Link className="text-light lead mr-4" to="/">Blogs</Link>
        <Link className="text-light lead mr-4" to="/users">Users</Link>
        {user === null 
          ? null
          : <span className="text-light lead mr-4">{user.name} logged in</span>}
        {user === null
          ? <button onClick={() => window.location.href = '/'} className="btn btn-light ml-auto p-2">signin</button>
          : <button onClick={logout} className="btn btn-light ml-auto p-2">logout</button>}
      </nav> 
    )
  }

  if(loaded && loadedUsers){
    return (
        <Router>      
          <Navbar/>
          <Notification message={errorMessage} />
          <Route exact 
            path="/" render={() => (
            <div className="container">
              <br/>
              {user === null
                ? <LoginForm
                  handleLogin={handleLogin}          
                />
                : <div>
                  <h2>Blogs</h2>
                  <BlogList
                    blogs={blogs}
                    addLike={addLike}
                    deleteBlog={deleteBlog}
                  />
                  <br/>
                  <BlogForm addBlog={addBlog}
                    newTitle={newTitle}
                    handleTitleChange={handleTitleChange}
                    newAuthor={newAuthor}
                    handleAuthorChange={handleAuthorChange}
                    newURL={newURL}
                    handleURLChange={handleURLChange}
                    createNewVisibility={createNewVisibility}
                    setCreateNewVisibility={setCreateNewVisibility}
                  />
                </div>
              }
            </div>
            )} 
          />
          <Route exact 
            path="/users" 
            render={() => <div className="container"><br/><h2 >Users</h2><UserList signedInUser={user} users={users}/></div>} 
          />
          <Route exact 
            path="/users/:id" 
            render={({ match }) => 
              <UserView 
                signedInUser={user} 
                user={userById(match.params.id)}
              />
            } 
          />
          <Route exact 
            path="/blogs/:id" 
            render={({ match }) => 
              <BlogView 
                signedInUser={user} 
                blog={blogById(match.params.id)} 
                addLike={addLike} 
                addComment={addComment} 
                newComment={newComment} 
                handleCommentChange={handleCommentChange}
              />
            } 
          />
          <Footer />
        </Router>
      )
  } else {
    return <p>loading</p>
  }
}

export default App
