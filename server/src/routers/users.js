const express = require('express')
const auth = require('../middleware/auth')
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

router.post('/logout', auth, async (req, res) => {
  console.log(req.user)
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    console.log(req.user.tokens)
    await req.user.save()
    res.send('logOut')
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router
