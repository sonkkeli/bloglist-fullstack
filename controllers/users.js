const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// GET ALL USERS
usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })

  res.json(users.map(u => u.toJSON()))
})

// ADD USER
usersRouter.post('/', async (req, res, next) => {  
  try {
    const body = req.body

    if ( body.username === undefined
      || body.name === undefined
      || body.password === undefined ) {
      return res.status(400).json({
        error: 'content missing'
      })
    }

    if(body.password.length < 3){
      return res.status(400).json({
        error: 'password too short, min length 3'
      })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    const savedUser = await user.save()
    res.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

// GET ONE USER
usersRouter.get('/:id', (req, res, next) => {

  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.json(user.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

// DELETE ONE USER
usersRouter.delete('/:id', async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter