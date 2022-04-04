const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const User = mongoose.model('User', {
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
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!(value.length > 8)) {
        throw new Error('password must be greater than length six')
      } else if (value === 'password') {
        throw new Error('password cannot be set password use something else')
      }
    },
  },
})

module.exports = User
