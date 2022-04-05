const express = require('express')
const router = new express.Router()
const Contacts = require('../models/contacts')
const auth = require('../middleware/auth')
const multer = require('multer')

// creating the POST/contacts endpoint
router.post('/contacts', auth, async (req, res) => {
  const contact = new Contacts(req.body)
  try {
    contact.email = req.user.email
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
router.put('/contacts/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'phoneNumber', 'address']
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperation) {
    res.send('You cannot update email and other unknown fields')
  }

  try {
    const contact = await Contacts.findOne({ email: req.user.email })
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
router.delete('/contacts/:id', auth, async (req, res) => {
  const id = req.params.id
  const contact = await Contacts.findById(id)
  try {
    await contact.remove()
    res.send(contact)
  } catch (e) {
    res.send(e)
  }
})

// setup endpoint for the image upload
const upload = multer({
  dest: 'images',
  // validating file size 1mb
  limits: {
    fileSize: 1000000,
  },
  // filter the extension we want to upload
  // fileFilter(req, file, cb) {
  //   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
  //     return cb(new Error('please upload an image'))
  //   }
  //   cb(undefined, true)
  // },
})

router.post('/contacts/upload', auth, upload.single('upload'), (req, res) => {
  console.log('user', req.user.email)
  res.send('file upload')
})

module.exports = router
