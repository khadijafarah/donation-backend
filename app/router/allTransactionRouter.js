const express = require('express')
const router = express.Router()
const allTransactionController = require ("../controllers/allTransactionController")



router.get("/all-transaction" ,allTransactionController.allTransaction)
router.get("/all-transaction/:id" ,allTransactionController.getTransactionById  )
// router.put("/donations/:id" , donationController.updateSingleDonation)
// router.delete("/donations/:id" , donationController.deleteDonation)




module.exports = router