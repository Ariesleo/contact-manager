const express = require('express')
const router = new express.Router()
const Contacts = require('../models/contacts')
const auth = require('../middleware/auth')

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
router.get('/contacts', auth, async (req, res) => {
  try {
    const contacts = await Contacts.find({})
    res.send(contacts)
  } catch (e) {
    res.status(500).send(e)
  }
})

// updating a contact
router.put('/contacts/:id', async (req, res) => {
  const id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'phoneNumber', 'address', 'email']
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperation) {
    res.send('Operation is not valid')
  }

  try {
    const contact = await Contacts.findById(id)
    updates.forEach((update) => {
      contact[update] = req.body[update]
    })
    await contact.save()
    if (!contact) {
      res.send(`user with the id ${id} does not exist`)
    }
    res.status(201).send(contact)
  } catch (e) {
    res.status(500).send(e)
  }
})

// deleting a contact
router.delete('/contacts/:id', async (req, res) => {
  const id = req.params.id
  const contact = await Contacts.findById(id)
  try {
    await contact.remove()
    res.send(contact)
  } catch (e) {
    res.send(e)
  }
})

module.exports = router
