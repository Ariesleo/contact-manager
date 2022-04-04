const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('welcome to the home page')
})

app.listen(port, () => {
  console.log(`connected to the port ${port}`)
})
