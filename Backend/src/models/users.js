const mongoose = require('mongoose')

const User = mongoose.model('User', {
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
})

module.exports = User
