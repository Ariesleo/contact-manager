const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/contact-manager-api', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
})

console.log('mongoose connected')
