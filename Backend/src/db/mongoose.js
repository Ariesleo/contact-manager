const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/contact-manager-api', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
})

console.log('mongoose connected')

// const User = mongoose.model('User', {
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     unique: true,
//     trim: true,
//     lowercase: true,
//     required: true,
//     // validate(value) {
//     //   if (!validator.isEmail(value)) {
//     //     throw new Error('email is not valid')
//     //   }
//     // },
//   },
//   password: {
//     type: String,
//     required: true,
//     trim: true,
//     // validate(value) {
//     //   if (!(value.length > 6)) {
//     //     throw new Error('password must be greater than length six')
//     //   } else if (value === 'password') {
//     //     throw new Error('password cannot be set password use something else')
//     //   }
//     // },
//   },
// })

// const userData = new User({
//   email: 'first@gmail.com',
//   password: 'first123',
// })

// userData.save()

// console.log(userData)
