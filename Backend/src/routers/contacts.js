const express = require('express')
const router = new express.Router()
const Contacts = require('../models/contacts')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')

// creating the POST/contacts endpoint
router.post('/contacts', auth, async (req, res) => {
  const contact = new Contacts(req.body)
  try {
    await contact.save()
    res.status(201).send('contact saved sucessfully')
  } catch (e) {
    res.status(400).send(e)
  }
})

// creating GET/contacts endpoint to fetch all contacts
router.get('/contacts', auth, async (req, res) => {
  try {
    // .sort() method helps to sort the data either in ascending 1 or descending order -1
    const contacts = await Contacts.find({}).sort({ favourite: -1, name: 1 })
    res.send(contacts)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.patch('/contacts/:id', async (req, res) => {
  const { id } = req.params
  try {
    const singleContact = await Contacts.findById(id)
    singleContact.favourite = !singleContact.favourite
    singleContact.save()
    res.send(singleContact)
  } catch (e) {
    res.send(e)
  }
})

// updating a contact
router.put('/contacts/:id', auth, async (req, res) => {
  const id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'phone', 'address', 'email', 'favourite']
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperation) {
    res.send('You cannot update email and other unknown fields')
  }

  try {
    const contact = await Contacts.findById(id)
    if (!contact) {
      res.send(`user with the id ${id} does not exist`)
    }
    updates.forEach((update) => {
      contact[update] = req.body[update]
    })
    await contact.save()
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
    res.send('contact removed')
  } catch (e) {
    res.send(e)
  }
})

// setup endpoint for the image upload
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  // filter the extension we want to upload
  fileFilter(req, file, cb) {
    console.log({ file })
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('please upload an image'))
    }
    cb(undefined, true)
  },
})

router.post(
  '/contacts/:id/upload',
  auth,
  upload.single('upload'),
  async (req, res) => {
    console.log(req.file)
    const { id } = req.params
    // resizing and converting to the png format
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer()

    const contact = await Contacts.findById(id)
    contact.image = buffer
    await contact.save()
    res.send('file upload')
  }
)

// get image by setting the endpoint
router.get('/contacts/:id/image', async (req, res) => {
  try {
    const contact = await Contacts.findById(req.params.id)
    if (!contact || !contact.image) {
      throw new Error()
    }
    res.set('Content-Type', 'image/png')
    res.send(contact.image)
  } catch (e) {
    res.status(404).send()
  }
})

module.exports = router
