const express = require('express')
const router = new express.Router()
const Contacts = require('../models/contacts')

// creating the POST/contacts endpoint
router.post('/contacts', async (req, res) => {
  const contact = new Contacts(req.body)
  try {
    await contact.save()
    res.status(201).send(contact)
  } catch (e) {
    res.status(400).send(e)
  }
})

// creating GET/contacts endpoint to fetch all contacts
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contacts.find({})
    res.send(contacts)
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router
