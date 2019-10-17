const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

app.get('/api', (req, res) => {
  res.send('<p>continue to /api/blogs to see what you are looking for</p>')
})

app.use(middleware.tokenExtractor)

app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  console.log('test mode on')
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app