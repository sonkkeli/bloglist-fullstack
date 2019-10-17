const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test-helper')
const blogs = require('./test-data').blogs
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')


describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of blogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

  // 4.8: blogilistan testit, step 1
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(blogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
      'TDD harms architecture'
    )
  })

  // 4.9*: blogilistan testit, step2
  test('blog identifier is id, not _id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  describe('addition of a new blog', () => {
    // 4.10: blogilistan testit, step3
    test('succeeds with valid data and without giving value to likes', async () => {
      const newBlog = {
        title: 'saraparikka',
        author: 'Sara Parikka',
        url: 'https://anna.fi/sara-parikka/'
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(blogs.length + 1)

      const titles = blogsAtEnd.map(n => n.title)
      expect(titles).toContain(
        'saraparikka'
      )
    })

    // 4.12*: blogilistan testit, step5
    test('fails with status code 400 if title and url missing', async () => {
      const newBlog = {
        author: 'Sara Parikka',
        likes: 5
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(blogs.length)
    })
  })
})

describe('when database is empty', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
  })

  // 4.11*: blogilistan testit, step4
  test('likes is given a value', async () => {
    const newBlog = {
      title: 'pieruperse',
      author: 'Pieru Perse',
      url: 'https://www.instagram.com/pieruperse/',
      likes: 9
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(9)
  })

  // 4.11*: blogilistan testit, step4
  test('likes is not given a value', async () => {
    const newBlog = {
      title: 'pieruperse',
      author: 'Pieru Perse',
      url: 'https://www.instagram.com/pieruperse/'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(0)
  })
})

afterAll(() => {
  mongoose.connection.close()
})