const mongoose = require('mongoose')
const validator = require('validator')

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate(value) {
      if (value.length < 10) {
        throw new Error('Phone number must be of length 10')
      }
    },
  },
  address: {
    type: String,
  },
  image: {
    type: Buffer,
    default: '',
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('email is not valid')
      }
    },
  },
})
contactSchema.methods.toJSON = function () {
  const contact = this
  const contactObject = contact.toObject()

  delete contactObject.image
  return contactObject
}

const Contacts = mongoose.model('contacts', contactSchema)

module.exports = Contacts
