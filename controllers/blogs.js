const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

// GET ALL BLOGS
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
    .find({}).populate('comments', { content: 1 })

  res.json(blogs.map(b => b.toJSON()))
})

// ADD BLOG
blogsRouter.post('/', async (req, res, next) => {
  const body = req.body

  if (body.title === undefined || body.author === undefined || body.url === undefined ) {
    return res.status(400).json({
      error: 'content missing'
    })
  }
  var likes = (body.likes === undefined) ? 0 : body.likes
  try{
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.json(savedBlog.toJSON())
  } catch (e){
    next(e)
  }
})

// ADD COMMENT TO BLOG
blogsRouter.post('/:id/comments', async (req, res, next) => {
  const body = req.body

  if (body.content === undefined ) {
    return res.status(400).json({
      error: 'comment content missing'
    })
  }

  const blog = await Blog.findById(req.params.id)

  try{
    const comment = new Comment({
      content: body.content,
      blog: blog._id
    })

    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()
    res.json(savedComment.toJSON())
  } catch (e){
    next(e)
  }
})

// GET ONE BLOG
blogsRouter.get('/:id', (req, res, next) => {

  Blog.findById(req.params.id)
    .then(blog => {
      if (blog) {
        res.json(blog.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

// 4.13 blogilistan laajennus, step1, DELETE ONE BLOG
blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(req.params.id)

    if ( blog.user.toString() === user._id.toString() ){
      await Blog.findByIdAndDelete(req.params.id)
      res.status(204).end()
    } else {
      return res.status(401).json({ error: 'this is somebody else\'s blog' })
    }

  } catch (exception) {
    next(exception)
  }
})

// 4.14* blogilistan laajennus, step2, UPDATE BLOG
blogsRouter.put('/:id', async (req, res, next) => {
  const body = req.body

  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: body.user
    }

    await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    updatedBlog => res.json(updatedBlog.toJSON())
  } catch (exception){
    next(exception)
  }
})

module.exports = blogsRouter