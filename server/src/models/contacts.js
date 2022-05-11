const mongoose = require('mongoose')
const validator = require('validator')

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    work: {
      type: String,
      default: '',
      trim: true,
    },
    home: {
      type: String,
      default: '',
      trim: true,
    },
    mobile: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate(value) {
        if (value.length < 10) {
          throw new Error('Mobile Number must be fo lenght 10')
        }
      },
    },
  },
  address: {
    type: String,
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
  favourite: {
    type: Boolean,
    default: false,
  },
  image: {
    type: Buffer,
    default: '',
  },
})
contactSchema.methods.toJSON = function () {
  const contact = this
  const contactObject = contact.toObject()

  return contactObject
}

const Contacts = mongoose.model('contacts', contactSchema)

module.exports = Contacts
