const express = require('express')
const router = new express.Router()
const User = require('../models/users')

router.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    res.status(201).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/users', (req, res) => {
  res.send('hello little rockstar')
})

module.exports = router
