const express = require('express')
// run mongoose
require('./db/mongoose')

var cors = require('cors')

const userRouter = require('./routers/users')
const contactsRouter = require('./routers/contacts')

const app = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(contactsRouter)

app.listen(port, () => {
  console.log(`connected to the port ${port}`)
})
