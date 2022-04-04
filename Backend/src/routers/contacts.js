const express = require('express')
const router = new express.Router()
const Contacts = require('../models/contacts')

router.post('/contacts', async (req, res) => {
  const contact = new Contacts(req.body)
  try {
    await contact.save()
    res.status(201).send(contact)
  } catch (e) {
    res.status(400).send(e)
  }
})

module.exports = router
