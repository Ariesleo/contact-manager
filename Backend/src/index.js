const express = require('express')

// run mongoose
require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

app.get('/users', (req, res) => {
  res.send('welcome to the home page')
})

app.listen(port, () => {
  console.log(`connected to the port ${port}`)
})
