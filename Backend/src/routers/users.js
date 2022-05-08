const express = require('express')
const router = new express.Router()
const User = require('../models/users')

// creating POST /signup endpoint for the user
router.post('/signup', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    res.status(201).send({ user })
  } catch (e) {
    res.status(400).send(e)
  }
})

// creating POST /signin endpoint for the user
router.post('/signin', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    // console.log('skdjf', user)
    if (!user) {
      res.status(401).send('user not found')
    }
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router
