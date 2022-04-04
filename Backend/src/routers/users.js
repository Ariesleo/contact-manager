const express = require('express')
const router = new express.Router()
const User = require('../models/users')

// creating POST /signup endpoint for the user
router.post('/signup', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    res.status(201).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

// creating POST /signin endpoint for the user
router.post('/signin', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    res.send({ user })
  } catch (e) {
    res.send(e)
  }
})

module.exports = router
