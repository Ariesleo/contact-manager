const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
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

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  try {
    if (!user) {
      throw new Error('unable to login')
    }
    // const isMatch = await bcrypt.compare(password, user.password)
    // if (!isMatch) {
    //   throw new Error('Unable to login')
    // }
  } catch (e) {
    console.log(e)
  }

  return user
}

// setting up the middleware to hash the password
userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
