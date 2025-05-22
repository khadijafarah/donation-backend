const express = require('express')
const app = express()
const cors = require("cors")
const connectionToDB = require('./db/connection')
const userRoutes = require ("./router/userRouter")
const donationRoutes = require ("./router/donationRouter")
const fundRaisingRoutes = require("./router/fundRaisingRouter")
const fundTransactionRoutes = require("./router/fundRaisingTransactionRouter")
const donationTransactionRoutes = require('./router/donationTransactionRouter')
const allTransactionsRoutes = require ("./router/allTransactionRouter")
const port = 5000

//middleware
app.use(cors({
  origin:"http://localhost:5174",
  credentials:true
}))
app.use(express.json())

connectionToDB()
app.use("/api", userRoutes)
app.use("/api" , donationRoutes)
app.use("/api" ,fundRaisingRoutes)
app.use("/api",fundTransactionRoutes )
app.use("/api",donationTransactionRoutes)
app.use("/api",allTransactionsRoutes)


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/api/donations', (req, res) => {
  console.log(req.body); // Is this undefined?
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

