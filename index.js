const express = require('express')
const app = express()
const cors = require('cors')
let port = process.env.PORT || 3001

app.use(express.json())
app.use(cors())

const db = require('./models')

// Routers 
const userRouter = require('./routes/User')
app.use('/auth', userRouter)

const ticketRouter = require('./routes/Ticket')
app.use('/ticket', ticketRouter)

const purchasesRouter = require('./routes/Purchases')
app.use('/purchase', purchasesRouter)

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log("Server running on port 3001")
  })
})