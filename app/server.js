const express = require('express')
const app = express()
const cors = require("cors")
const connectionToDB = require('./db/connection')
const userRoutes = require ("./router/userRouter")
const donationRoutes = require ("./router/donationRouter")
const fundRaisingRoutes = require("./router/fundRaisingRouter")
const fundTransactionRoutes = require("./router/fundRaisingTransactionRouter")
const donationTransactionRoutes = require('./router/donationTransactionRouter')
const port = 5000

//middleware
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(express.json())

connectionToDB()
app.use("/api", userRoutes)
app.use("/api" , donationRoutes)
app.use("/api" ,fundRaisingRoutes)
app.use("/api",fundTransactionRoutes )
app.use("/api",donationTransactionRoutes)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

